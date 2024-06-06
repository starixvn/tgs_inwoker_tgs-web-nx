import { useQuery } from "@tanstack/react-query";
import { ProfitShare } from "@tgs-web-nx/core";
import { useEffect, useState } from "react";
import { groupBy } from "@tgs-web-nx/utils";
import { ProfitShareStatus, TProfitShare } from "@tgs-web-nx/types";
import { SelectChangeEvent } from "@mui/material";
import moment from "moment";

type Config = {
  keys: string[],
  data: Record<string | number, TProfitShare[]>,
  onChange: (e: SelectChangeEvent) => void,
  currentKey: string,
}

type ListKey = 'previous' | 'current'

type SentOnStatus = 'review' |  'distributed' | 'reject';
type Period = 'daily' | 'monthly' | 'biWeekly' | 'weekly';

/**
 * 轉換日期
 */
export const formatDate = (date?: Date) => moment(date).format("YYYY/MM/DD");

export const getDateRange = (from: Date, to: Date) => {
  if(!from || !to) {
    return '-'
  }

  return `${formatDate(from)} - ${formatDate(to)}`
}


/**
 * 依派發時間區分狀態處理派發狀態
 * @param date 時間
 */
export const formatSentOn = (date?: string | null): SentOnStatus => {
  // null === 審核中(review)
  if(date === null) {
    return 'review';
  }

  // 有時間 === 已派發
  if(date) {
    return 'distributed';
  }

  return 'reject';
}

/**
 * 將資料以分紅 % 數分類
 */
const getData = (list: TProfitShare[]) => groupBy(list, row => row.dividendPercentage);

/**
 * 處理週期
 */
const getPeriod = (code?: ProfitShareStatus): Period => {
  switch(code) {
    case ProfitShareStatus.Daily:
      return 'daily';
    case ProfitShareStatus.Monthly:
      return 'monthly';
    case ProfitShareStatus.DoubleWeekly:
      return 'biWeekly';
    case ProfitShareStatus.Weekly:
      return 'weekly';
    default:
      return 'daily';
  }
}

/**
 * 處理 NaN
 */
export const formatNaN = (number: number) => isNaN(number) ? '-' : number;

/**
 * 處理分紅報表
 */
export const useProfitShareReport = () => {
  const [previousKey, setPreviousKey] = useState('');
  const [currentKey, setCurrentKey] = useState('');
  const {data, refetch, isFetched} = useQuery({
    queryKey: ['profitShare'],
    queryFn: ProfitShare.getProfitShare,
    enabled: false,
  })

  const [previous, current] = [data?.data?.previous ?? [], data?.data?.current ?? []];
  const [previousData, currentData] = [getData(previous), getData(current)];
  const lists: Record<ListKey, Config> = {
    previous: {
      keys: Object.keys(previousData),
      data: previousData,
      onChange: (e: SelectChangeEvent) => {setPreviousKey(e.target.value)},
      currentKey: previousKey,
    },
    current: {
      keys: Object.keys(currentData),
      data: currentData,
      onChange: (e: SelectChangeEvent) => {setCurrentKey(e.target.value)},
      currentKey: currentKey,
    }
  }
  
  useEffect(() => {
    refetch();
  }, [])

  // 上期、本期預設選第一個分紅 % 數
  useEffect(() => {
    if(lists.current.keys.length > 0) {
      setCurrentKey(lists.current.keys[0])
    };

    if(lists.previous.keys.length > 0) {
      setPreviousKey(lists.previous.keys[0])
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lists.current.keys.length, lists.previous.keys.length])


  return {
    lists,
    data,
    isFetched,
    period: getPeriod(data?.data.settlementIntervalType)
  }
}