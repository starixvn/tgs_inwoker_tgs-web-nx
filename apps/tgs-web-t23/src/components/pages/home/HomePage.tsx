import vendorsIcon from "@/assets/t18/images/home/mobile/vendors.png";
import CardPrompt from "@/components/pages/home/components/CardPrompt";
import GameTypeTab from "@/components/pages/home/components/GameTypeTab";
import Slider from "@/components/pages/home/components/Slider";
import TabPanel from "@/components/pages/home/components/TabPanel";
import SocialMedia from "@/components/project/SocialMedia";
import { useGeneralStore } from "@/core/stores/useGeneralStore";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { media } from "@/theme/breakpoints";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useHomeGameContext } from "@/core/feature/game/useHomeGameContext";
import CategoryRenderer from "@/components/pages/home/components/CategoryRenderer";

type Props = {
  imageUrl: string;
};

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};

  ${media.sm} {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 0px;
    gap: 20px;
  }
`;

const SliderWrapper = styled.div`
  width: 100%;
  height: 160px;

  ${media.sm} {
    height: 375px;
    border-radius: 10px;
  }
`;

const MainContentWrapper = styled.div`
  width: 100%;
  padding: 22px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.primaryDark};
  color: ${({ theme }) => theme.white};
  gap: 10px;
  flex-shrink: 0;

  ${media.sm} {
    gap: 20px;
    padding: unset;
  }
`;

const VendorIconContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VendorIcon = styled.div`
  width: 392px;
  height: 296px;
  background-image: url(${vendorsIcon});
  background-size: cover;
`;

const HomePage = (props: Props) => {
  const { general } = useGeneralStore();
  const { isMobileSize } = useRwd();
  const { activeGameType } = useHomeGameContext();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [activeGameType]);

  return (
    <MainWrapper>
      <SliderWrapper>{!!general.banner.length && <Slider />}</SliderWrapper>

      <MainContentWrapper>
        <CardPrompt />

        {isMobileSize && <GameTypeTab />}

        <CategoryRenderer />

        <TabPanel />
        {isMobileSize && <SocialMedia />}
        {isMobileSize && (
          <VendorIconContainer>
            <VendorIcon />
          </VendorIconContainer>
        )}
      </MainContentWrapper>
    </MainWrapper>
  );
};

export default React.memo(HomePage);
