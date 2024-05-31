import { useQuery } from "@tanstack/react-query";
import { ProfitShare } from "@tgs-web-nx/core";
import { useEffect, useState } from "react";
import { groupBy } from "@tgs-web-nx/utils";
import { TProfitShare } from "@tgs-web-nx/types";
import { SelectChangeEvent } from "@mui/material";
import moment from "moment";

type Config = {
  keys: string[],
  data: Record<string | number, TProfitShare[]>,
  onChange: (e: SelectChangeEvent) => void,
  currentKey: string,
}

type ListKey = 'previous' | 'current'

const formatDate = (date?: Date) => moment(date).format("YYYY/MM/DD");
const formatSentOn = (date: string | null) => date ? '已派發' : '未派發';

export const useProfitShareReport = () => {
  const [previousKey, setPreviousKey] = useState('');
  const [currentKey, setCurrentKey] = useState('');

  const {data, refetch, isFetched} = useQuery({
    queryKey: ['profitShare'],
    queryFn: ProfitShare.getProfitShare,
    enabled: false,
  })


  const [previous, current] = [data?.data?.previous ?? [], data?.data?.current ?? []];

  const getData = (list: TProfitShare[]) => groupBy(list, row => row.dividendPercentage);

  const previousData = getData(previous);
  const currentData = getData(current);

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
    if(!isFetched) {
      refetch();
    }
  }, [])

  useEffect(() => {
    if(lists.current.keys.length > 0) {
      setCurrentKey(lists.current.keys[0])
    };

    if(lists.previous.keys.length > 0) {
      setPreviousKey(lists.previous.keys[0])
    };
  }, [lists.current.keys.length, lists.previous.keys.length])



  return {
    lists,
    formatDate,
    formatSentOn
  }
}