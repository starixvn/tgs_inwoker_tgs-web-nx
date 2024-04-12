import { useCallback, useEffect, useMemo, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { BrandAllAgent } from "@tgs-web-nx/types";
import { useAccountStore, useGeneralStore } from "@tgs-web-nx/core";

export interface SelectItem {
  label: string;
  value: any;
}

enum RebateTypeEnum {
  ALL = 0,
  SPORT = 1,
  VIRTUAL_SPORTS = 2,
  LIVE_DEALER = 5,
  CHESS = 7,
  LOTTERY = 13,
  EGAME = 15,
}

interface RebateItem {
  label: string;
  value: RebateTypeEnum;
}

const rebateItemList: RebateItem[] = [
  { value: RebateTypeEnum.SPORT, label: "sport" },
  { value: RebateTypeEnum.VIRTUAL_SPORTS, label: "virtualsports" },
  { value: RebateTypeEnum.LIVE_DEALER, label: "livedealer" },
  { value: RebateTypeEnum.CHESS, label: "chess" },
  { value: RebateTypeEnum.LOTTERY, label: "lottery" },
  { value: RebateTypeEnum.EGAME, label: "egame" },
];

export function useRebateTable() {
  const { account } = useAccountStore();
  const { getBrandAllAgent } = useGeneralStore();

  // Rebate select
  const [selectedRebateItem, setSelectedRebateItem] = useState<RebateItem>(rebateItemList[0]);

  const handleChangeSelectItem = (event: SelectChangeEvent<any>, child?: any) => {
    const selectedRebateTypeEnum = event.target.value;
    const newSelectedRebateItem = rebateItemList.find((rebateItem) => {
      return `${rebateItem.value}` === `${selectedRebateTypeEnum}`;
    });

    if (!newSelectedRebateItem) return;
    setSelectedRebateItem(newSelectedRebateItem);
  };

  // Rebate table rows
  const [rebateTableRows, setRebateTableRows] = useState<BrandAllAgent[]>([]);

  const fetchRebateTable = useCallback(async () => {
    const res = await getBrandAllAgent();
    if (!res?.IsSuccess) return;

    setRebateTableRows(res.data);
  }, [getBrandAllAgent]);

  useEffect(() => {
    fetchRebateTable().then();
  }, []);

  const rebateTableRow = useMemo(() => {
    return rebateTableRows.filter((brandAllAgent) => {
      const currentRebateType = selectedRebateItem.value;
      if (currentRebateType === RebateTypeEnum.ALL) return true;

      return brandAllAgent.allagentgametype.toString() === currentRebateType.toString();
    });
  }, [selectedRebateItem, rebateTableRows]);

  /*
   *  Note by Liyi:
   *  1. If you want to test affiliate link in local, you need to use "http" instead of "https"
   *  2. the "do=register" query param is deprecated (which is modified by SABA)
   */
  const affiliateLink = `https://${window.location.host}/p/${account.info.playercode}`;
  // const affiliateLink = `https://${window.location.host}/p/${account.info.playercode}?do=register`;

  return {
    rebateItemList,
    selectedRebateItem,
    handleChangeSelectItem,
    rebateTableRow,
    affiliateLink,
  };
}
