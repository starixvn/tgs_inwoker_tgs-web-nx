import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useBettingBonus, useRwd } from "@tgs-web-nx/core/hooks";
import { VipData } from "@tgs-web-nx/types";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import LevelTable from "./components/LevelTable";
import { media } from "@/theme/breakpoints";
import BonusTable from "@/pages/vip/components/BonusTable";
import Loading from "@/components/UI/Loading";
import { PageContainer } from "@/components/styled-component/PageContainer";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";

const VipBanner = styled.div<{ $imageUrl: string }>`
  width: 100%;
  padding-top: 34.5%;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 6px;

  ${media.sm} {
    padding-top: 27%;
  }
`;

const VipBannerWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.mainBackground};
  margin-bottom: 8px;
`;

const VipContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* background-color: ${({ theme }) => theme.mainBackground}; */
  gap: 16px;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    gap: 40px;
  }
`;

const VIP = () => {
  const { isDesktopSize, isMobileSize } = useRwd();
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
    <PageContainer>
      <VipBannerWrapper><VipBanner $imageUrl={`${import.meta.env.BASE_URL}assets/images/vip/vip-banner.jpg`} /></VipBannerWrapper>
      <VipContentContainer>
        <BonusTable vipSortingData={vipSortingData} />
        <LevelTable currentLevel={currentLevel} productRebateByLevel={productRebateByLevel} />
      </VipContentContainer>
    </PageContainer>
  );
};

export default VIP;
