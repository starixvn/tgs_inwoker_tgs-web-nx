import CategoryRenderer from "@/pages/home/components/CategoryRenderer";
import { media } from "@/theme/breakpoints";
import React, { useEffect } from "react";
import styled from "styled-components";

import AnnouncementMarquee from "./components/AnnouncementMarquee";
import Banner from "./components/Banner";
import { Block } from "./components/CategoryRenderer/components/HomeCategory/style";
import GameTypes from "./components/GameTypes";

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${({ theme }) => theme.white};
  flex-shrink: 0;
  flex: 1;
`;

const MainContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${({ theme }) => theme.white};
  flex-shrink: 0;
  flex: 1;

  ${media.sm} {
    margin: 0 auto;
    gap: unset;
  }
`;

const BannerAnnouncementBlock = styled(Block)`
  border-radius: 0;
  padding-top: 1.6rem;
  padding-bottom: 0;
  gap: 0;

  &:has(.marquee-container) {
    padding-top: 0;
  }
`;

const HomePage = () => {
  return (
    <MainWrapper>
      <BannerAnnouncementBlock>
        <AnnouncementMarquee />
        <Banner />
      </BannerAnnouncementBlock>
      <GameTypes />
      <MainContentWrapper>
        <CategoryRenderer />
      </MainContentWrapper>
    </MainWrapper>
  );
};

export default React.memo(HomePage);
