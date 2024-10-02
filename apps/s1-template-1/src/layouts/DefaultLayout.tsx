import Header from "@/layouts/components/Header";
import CustomMarquee from "@/pages/home/components/Marquee";
import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH, MOBILE_HEADER_HEIGHT } from "@/theme/constants";
import { useAccountStore, useUiStore } from "@tgs-web-nx/core";
import React from "react";
import styled from "styled-components";

import Footer from "./components/Footer";

const DefaultLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};
`;

const DashboardContainer = styled.div<{ hasAnnouncement: boolean }>`
  display: flex;
  margin: 0 auto;

  ${media.lg} {
    margin: 0 auto;
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  margin: 0 auto;
  width: 100%;
  min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT});

  ${media.lg} {
    --footer: 270px;
    min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT} - var(--footer));
  }
`;

type Props = {
  children: React.ReactNode;
};
const DefaultLayout = ({ children }: Props) => {
  const { account } = useAccountStore();
  const {
    ui: { marquees },
  } = useUiStore();
  const hasAnnouncement = (marquees && marquees.length > 0) ?? false;

  return (
    <DefaultLayoutContainer>
      <Header />
      <CustomMarquee />
      <DashboardContainer className="main-container" hasAnnouncement={hasAnnouncement}>
        <ContentWrapper>
          <div>{children}</div>
        </ContentWrapper>
      </DashboardContainer>
      <Footer />
    </DefaultLayoutContainer>
  );
};

export default DefaultLayout;
