import React from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import MenuDrawer from "./components/MenuDrawer";
import BottomAppBar from "@/layouts/components/BottomAppBar";
import Footer from "@/layouts/components/Footer";
import Header from "@/layouts/components/Header";
import { media } from "@/theme/breakpoints";
import {
  BOTTOM_APP_BAR_HEIGHT,
  DESKTOP_HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
} from "@/theme/constants";

const HomeLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.white};
  /* height: 100vh; */
`;

const DashboardContainer = styled.div`
  display: flex;
  margin-top: ${MOBILE_HEADER_HEIGHT};
  height: calc(100vh - ${MOBILE_HEADER_HEIGHT} - ${BOTTOM_APP_BAR_HEIGHT});

  ${media.sm} {
    margin-top: ${DESKTOP_HEADER_HEIGHT};
    min-height: calc(100vh - ${DESKTOP_HEADER_HEIGHT});
    margin-bottom: unset;
    height: unset;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  transition: all ease-in-out 0.2s;
`;

const ChildrenWrapper = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  height: 100%;
  overflow: auto;
  ${media.sm} {
    padding-bottom: 0;
    height: unset;
  }
`;

type Props = {
  children: React.ReactNode;
};
const HomeLayout = ({ children }: Props) => {
  const { isMobileSize } = useRwd();

  return (
    <HomeLayoutContainer>
      <Header />

      <DashboardContainer>
        <ContentWrapper>
          <MenuDrawer />
          <>
            <ChildrenWrapper>{children}</ChildrenWrapper>
            <Footer />
          </>
        </ContentWrapper>
      </DashboardContainer>

      {isMobileSize && <BottomAppBar />}
    </HomeLayoutContainer>
  );
};

export default HomeLayout;
