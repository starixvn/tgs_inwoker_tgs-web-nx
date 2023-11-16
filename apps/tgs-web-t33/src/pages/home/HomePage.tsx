import React, { useEffect } from "react";
import styled from "styled-components";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import AppFlag from "@/pages/home/components/AppFlag";
import CardPrompt from "@/pages/home/components/CardPrompt";
import CategoryRenderer from "@/pages/home/components/CategoryRenderer";
import Slider from "@/pages/home/components/Slider";
import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH, SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import Introduction from "@/pages/home/components/Introduction";

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};

  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    margin: 0 auto;
  }
`;

const SliderWrapper = styled.div`
  width: 100%;
  padding-bottom: 42.52%

  ${media.sm} {
    padding-bottom: 41.35%
  }
`;

const MainContentWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};
  gap: 6px;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    padding: 10px 10px 50px 10px;
  }
`;

const AppFlagWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 30px;
`;

const HomePage = () => {
  const { general } = useGeneralStore();
  const { isMobileSize, isDesktopSize } = useRwd();
  const { activeGameType, activeGameTypeKey } = useHomeGameContext();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [activeGameType]);

  return (
    <MainWrapper>
      {!!general.banner.length && (
        <SliderWrapper>
          <Slider />
        </SliderWrapper>
      )}

      <MainContentWrapper>
        <CardPrompt />

        {/* {isMobileSize && !activeGameType && <GameTypeTab />} */}

        <CategoryRenderer />

        <AppFlagWrapper><AppFlag /></AppFlagWrapper>

        <Introduction />

      </MainContentWrapper>
    </MainWrapper>
  );
};

export default React.memo(HomePage);
