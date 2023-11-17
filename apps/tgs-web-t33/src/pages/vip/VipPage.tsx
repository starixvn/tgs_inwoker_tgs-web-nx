import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useBettingBonus } from "@tgs-web-nx/core/hooks";
import { VipData } from "@tgs-web-nx/types";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import LevelTable from "./components/LevelTable";
import { media } from "@/theme/breakpoints";
import BonusTable from "@/pages/vip/components/BonusTable";
import Loading from "@/components/UI/Loading";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import { PageContainer } from "@/components/styled-component/PageContainer";

const VipWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.subBackground};
  padding: 10px;
  gap: 16px;

  ${media.sm} {
    max-width: 958px;
    margin: 0 auto;
    padding: 20px 0px;
    gap: 20px;
  }
`;

const VipBanner = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 137px;
  border-radius: 4px;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    height: 299px;
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
    <PageContainer>
      <VipWrapper>
        <VipBanner $imageUrl={`${import.meta.env.BASE_URL}assets/images/vip/vip-banner.png`} />
        <BonusTable vipSortingData={vipSortingData} />
        <LevelTable currentLevel={currentLevel} productRebateByLevel={productRebateByLevel} />
      </VipWrapper>
    </PageContainer>
  );
};

export default VIP;
