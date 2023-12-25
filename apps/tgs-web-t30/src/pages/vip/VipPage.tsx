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

const VipBanner = styled.div<{ $imageUrl: string }>`
  width: 100%;
  border-radius: 4px;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 12px;
  aspect-ratio: 1072 / 335;
`;

const VIP = () => {
  const { isDesktopSize } = useRwd();
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

  // if (isLoading) return <Loading show={true} />;

  return (
    <PageContainer>
      <VipBanner
        $imageUrl={
          isDesktopSize
            ? `${import.meta.env.BASE_URL}assets/images/vip/vip-banner.png`
            : `${import.meta.env.BASE_URL}assets/images/vip/vip-banner-mobile.png`
        }
      />
      <BonusTable vipSortingData={vipSortingData} />
      <LevelTable currentLevel={currentLevel} productRebateByLevel={productRebateByLevel} />
    </PageContainer>
  );
};

export default VIP;
