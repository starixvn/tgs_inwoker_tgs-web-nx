import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAccountStore } from "@tgs-web-nx/core";
import { useBettingBonus } from "@tgs-web-nx/core/hooks";
import { media } from "@/theme/breakpoints";
import { levelItemStyleList } from "@/constants/vip";
import LevelTable from "@/components/project/BettingBonus/LevelTable";
import Loading from "@/components/UI/Loading";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";

const VipScrollableContainer = styled.div`
  width: 100%; 
  padding: 20px 0px;
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  
  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    scroll-snap-type: unset;

    &::-webkit-scrollbar {
      width: 10px;
      background-color: #1d1d1d40;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
      border-radius: 8px;
      background: ${(props) => props.theme.primaryLight};
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
      background-color: ${(props) => props.theme.tertiary};
    }
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
    <VipScrollableContainer>
      <LevelTable currentLevel={currentLevel} productRebateByLevel={productRebateByLevel} />
    </VipScrollableContainer>
  );
};

export default VIP;
