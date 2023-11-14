import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAccountStore } from "@tgs-web-nx/core";
import { useBettingBonus } from "@tgs-web-nx/core/hooks";
import LevelTable from "./components/LevelTable";
import { media } from "@/theme/breakpoints";
import { levelItemStyleList, vipBonusList } from "@/constants/vip";
import BonusTable from "@/pages/vip/components/BonusTable";
import Loading from "@/components/UI/Loading";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";

const VipWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
 
  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    padding: 20px 0px;
    gap: 20px;
  }
`;

const VIP = () => {
  const { isLoading, currentLevel, productRebateByLevel, vipData } = useBettingBonus();
  const accountStore = useAccountStore();
  const [vipSortingData, setVipSortingData] = useState<VipCardItem[]>([]);
  const accountLevel = accountStore.account.info.member_level_id;

  useEffect(() => {
    if (!isLoading && levelItemStyleList) {
      const vipList =
        vipData &&
        vipData.sort((a, b) => {
          return a.level < b.level ? -1 : a.level > b.level ? 1 : 0;
        });

      setVipSortingData(vipList);
    }
  }, [isLoading, vipData]);

  if (isLoading) return <Loading show={true} />;

  return (
    <VipWrapper>
      <LevelTable currentLevel={currentLevel} productRebateByLevel={productRebateByLevel} />
    </VipWrapper>
  );
};

export default VIP;
