import React from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
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
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.white};
  height: 100vh;

  ${media.sm} {
    background: ${({ theme }) => theme.black};
    height: auto;
  }
`;

const DashboardContainer = styled.div`
  display: flex;
  margin-top: ${MOBILE_HEADER_HEIGHT};
  flex: 1;

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
  height: 100%;

  ${media.sm} {
    padding-bottom: 0;
    height: unset;
  }
`;

type Props = {
  children: React.ReactNode;
};
const HomeLayout = ({ children }: Props) => {
  const { isMobileSize, isDesktopSize } = useRwd();

  return (
    <HomeLayoutContainer>
      {isDesktopSize && <Header/>}

      <DashboardContainer>
        <ContentWrapper>
            <ChildrenWrapper>{children}</ChildrenWrapper>
            {isDesktopSize && <Footer />}
        </ContentWrapper>
      </DashboardContainer>

      {isMobileSize && <BottomAppBar />}
    </HomeLayoutContainer>
  );
};

export default HomeLayout;
