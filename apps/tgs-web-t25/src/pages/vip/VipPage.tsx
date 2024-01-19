import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useBettingBonus } from "@tgs-web-nx/core/hooks";
import { VipData } from "@tgs-web-nx/types";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import LevelTable from "./components/LevelTable";
import { media } from "@/theme/breakpoints";
import BonusTable from "@/pages/vip/components/BonusTable";
import Loading from "@/components/UI/Loading";
import { PageContainer } from "@/components/styled-component/PageContainer";
import banner from "@/assets/t25/images/vip/banner.png";

const VipWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  padding: 12px;
  gap: 16px;

  ${media.sm} {
    max-width: 800px;
    margin: 0 auto;
    gap: 10px;
    padding: 10px;
  }
`;

const VipBanner = styled.div`
  width: 100%;
  border-radius: 4px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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

  if (isLoading)
    return (
      <VipWrapper>
        <Loading show={true} />;
      </VipWrapper>
    );

  return (
    <VipWrapper>
      <VipBanner>
        <img src={banner} alt={"vip"} />
      </VipBanner>
      <BonusTable vipSortingData={vipSortingData} />
      <LevelTable currentLevel={currentLevel} productRebateByLevel={productRebateByLevel} />
    </VipWrapper>
  );
};

export default VIP;
