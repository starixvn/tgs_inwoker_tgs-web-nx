import React, { useEffect } from "react";
import styled from "styled-components";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { isDesktop } from "react-device-detect";
import GameTypeTab from "@/pages/home/components/GameTypeTab";
import AppFlag from "@/pages/home/components/AppFlag";
import CardPrompt from "@/pages/home/components/CardPrompt";
import CategoryRenderer from "@/pages/home/components/CategoryRenderer";
import Slider from "@/pages/home/components/Slider";
import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH, SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import Banner from "@/pages/home/components/Banner";

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};
  padding: 0px 8px 12px 8px;
  gap: 6px;
  flex-shrink: 0;

  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    margin: 0 auto;
  }
`;

const SliderWrapper = styled.div`
  width: 100%;
  /* to-do: 最大高度限制問題 */
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

const VendorIconContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;



const GameTypeTabWrapper = styled.div`
  ${media.sm} {
    width: 100%;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.gray40};
    display: flex;
    align-items: center;
    justify-content: center
  }
`;

const HomePage = () => {
  const { general } = useGeneralStore();
  const { isMobileSize, isDesktopSize } = useRwd();
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
      {!!general.banner.length && (
        <SliderWrapper>
          {isMobileSize && <Slider settings={{}} />}
          {isDesktopSize && <Banner />}
        </SliderWrapper>
      )}
      {!activeGameType && isMobileSize && <CardPrompt />}

      {/* 
      {!!activeGameType && isDesktopSize &&
        <GameTypeTabWrapper>
          <GameTypeTab />
        </GameTypeTabWrapper>
      }
      {!!activeGameType && isMobileSize && <GameTypeTab />} */}

      {/* <MainContentWrapper>
        <CategoryRenderer />
      </MainContentWrapper> */}
    </MainWrapper>
  );
};

export default React.memo(HomePage);
