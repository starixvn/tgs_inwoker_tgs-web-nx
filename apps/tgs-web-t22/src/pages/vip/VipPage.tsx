import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useBettingBonus } from "@tgs-web-nx/core/hooks";
import { VipData } from "@tgs-web-nx/types";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { MobileHeader } from "../promotion/components/MobileHeader";
import LevelTable from "./components/LevelTable";
import { media } from "@/theme/breakpoints";
import BonusTable from "@/pages/vip/components/BonusTable";
import Loading from "@/components/UI/Loading";
import bg from "@/assets/t22/images/promotion/bg.png";
import banner from "@/assets/t22/images/vip/banner.png";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
;

const TabletContainer = styled.div`
  margin: 0 auto;
  padding: 20px 0 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: ${SUB_CONTENT_MAX_WIDTH};
  width: 100%;
  
  ${media.sm} {
    padding: 50px 20px;
    gap: 50px;
  }
`;

const MainContentWrapper = styled.div`
  padding: 0 20px;
  width: 100%;
  height: 100%;
  background: #fff;
  overflow-y: auto;

  ${media.sm} {
    padding: 0;
    background: url(${bg}) center no-repeat;
    background-size: cover;
  }
`;

const Banner = styled.div`
  margin-top: 20px;
  display: block;
  width: 100%;
  aspect-ratio: 400 / 140;
  background: url(${banner}) center no-repeat;
  background-size: cover;
  border-radius: 10px;

  ${media.sm} {
    border-radius: 0;
    margin: 0;
    aspect-ratio: 1920 / 400;
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
    <>
      <MobileHeader title="VIP"/>
      <MainContentWrapper>
        <Banner />
        <TabletContainer>
          <BonusTable vipSortingData={vipSortingData} />
          <LevelTable currentLevel={currentLevel} productRebateByLevel={productRebateByLevel} />
        </TabletContainer>
      </MainContentWrapper>
    </> 
  );
};

export default VIP;
