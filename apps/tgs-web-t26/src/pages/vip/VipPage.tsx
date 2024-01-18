import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useBettingBonus } from "@tgs-web-nx/core/hooks";
import { VipData } from "@tgs-web-nx/types";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import LevelTable from "./components/LevelTable";
import { media } from "@/theme/breakpoints";
import BonusTable from "@/pages/vip/components/BonusTable";
import Loading from "@/components/UI/Loading";

const VipWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  padding: 12px;
  gap: 16px;

  ${media.sm} {
    max-width: 1200px;
    margin: 0 auto;
    gap: 20px;
    padding: 10px;
  }
`;

const VIP = () => {
  const { isLoading, currentLevel, productRebateByLevel, vipData } = useBettingBonus();
  const [vipSortingData, setVipSortingData] = useState<VipData[]>([]);
  useUpdatePageName("VIP");

  useEffect(() => {
    if (!isLoading) {
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
      <BonusTable vipSortingData={vipSortingData} />
      <LevelTable currentLevel={currentLevel} productRebateByLevel={productRebateByLevel} />
    </VipWrapper>
  );
};

export default VIP;
