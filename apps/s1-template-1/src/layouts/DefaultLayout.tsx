import BottomAppBar from "@/layouts/components/BottomAppBar";
import Header from "@/layouts/components/Header";
import { media } from "@/theme/breakpoints";
import { BOTTOM_APP_BAR_HEIGHT, DESKTOP_HEADER_HEIGHT, MAIN_CONTENT_MAX_WIDTH, MOBILE_HEADER_HEIGHT } from "@/theme/constants";
import { useAccountStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import React from "react";
import styled from "styled-components";

import Footer from "./components/Footer";

const DefaultLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};

  ${media.lg} {
    background: ${({ theme }) => theme.desktopMainBackground};
  }
`;

const DashboardContainer = styled.div`
  display: flex;
  margin-top: ${MOBILE_HEADER_HEIGHT};
  min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT} - ${BOTTOM_APP_BAR_HEIGHT});

  ${media.lg} {
    min-height: calc(100vh - ${DESKTOP_HEADER_HEIGHT});
    margin: ${DESKTOP_HEADER_HEIGHT} auto 0;
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  margin: 0 auto;
  transition: all ease-in-out 0.2s;
`;

const ChildrenWrapper = styled.div`
  padding-bottom: ${BOTTOM_APP_BAR_HEIGHT};

  ${media.sm} {
    padding-bottom: 0;
  }
`;

type Props = {
  children: React.ReactNode;
};
const DefaultLayout = ({ children }: Props) => {
  const { account } = useAccountStore();
  const { isMobileSize } = useRwd();

  const loginAccount = account.token === account.info.token;

  return (
    <DefaultLayoutContainer>
      <Header />

      <DashboardContainer>
        <ContentWrapper>
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </ContentWrapper>
      </DashboardContainer>
      <Footer />
      {isMobileSize && loginAccount && <BottomAppBar />}
    </DefaultLayoutContainer>
  );
};

export default DefaultLayout;
