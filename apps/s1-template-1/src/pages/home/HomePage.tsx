import useBanner from "@/hooks/home/useBanner";
import CategoryRenderer from "@/pages/home/components/CategoryRenderer";
import { media } from "@/theme/breakpoints";
import { useRwd } from "@tgs-web-nx/core/hooks";
import React, { useEffect } from "react";
import styled from "styled-components";

import Banner from "./components/Banner";
import GameTypes from "./components/GameTypes";

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${({ theme }) => theme.white};
  padding: 0 0.8rem;
  gap: 1.2rem;
  flex-shrink: 0;
  flex: 1;

  ${media.md} {
    gap: 0.8rem;
    padding: 0.8rem;
  }
`;

const MainContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${({ theme }) => theme.white};
  gap: 0.6rem;
  flex-shrink: 0;
  flex: 1;

  ${media.sm} {
    margin: 0 auto;
    gap: unset;
  }
`;

const HomePage = () => {
  const { isMobileSize, isDesktopSize } = useRwd();
  const { hasActiveDesktopBanner, hasActiveMobileBanner } = useBanner();
  return (
    <MainWrapper>
      {isMobileSize && hasActiveMobileBanner() && <Banner />}
      {isDesktopSize && hasActiveDesktopBanner() && <Banner />}
      <GameTypes />
      <MainContentWrapper>
        <CategoryRenderer />
      </MainContentWrapper>
    </MainWrapper>
  );
};

export default React.memo(HomePage);
