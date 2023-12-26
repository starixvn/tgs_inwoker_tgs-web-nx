import React from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHeader } from "@tgs-web-nx/core/features";
import MenuDrawer from "./components/MenuDrawer";
import BottomAppBar from "@/layouts/components/BottomAppBar";
import Footer from "@/layouts/components/Footer";
import Header from "@/layouts/components/Header";
import { media } from "@/theme/breakpoints";
import {
  BOTTOM_APP_BAR_HEIGHT,
  DESKTOP_DRAWER_WIDTH,
  DESKTOP_HEADER_HEIGHT,
  DRAWER_SHRINK_WIDTH,
  MOBILE_HEADER_HEIGHT,
  TABLET_DRAWER_WIDTH,
} from "@/theme/constants";
import bg from "@/assets/t29/images/bg.png";

const DefaultLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.white};

  ${media.sm} {
    background: url(${bg});
  }
`;

const DashboardContainer = styled.div`
  display: flex;
  margin-top: ${MOBILE_HEADER_HEIGHT};
  min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT} - ${BOTTOM_APP_BAR_HEIGHT});

  ${media.sm} {
    margin-top: ${DESKTOP_HEADER_HEIGHT};
    min-height: calc(100vh - ${DESKTOP_HEADER_HEIGHT});
    margin-bottom: unset;
  }
`;

type ContentWrapperProps = {
  $isOpen: boolean;
  $isDesktop: boolean;
};

const ContentWrapper = styled.div<ContentWrapperProps>`
  position: relative;
  flex-grow: 1;
  margin-left: ${({ $isOpen }: ContentWrapperProps) => ($isOpen ? 0 : 0)};
  transition: all ease-in-out 0.2s;

  ${media.md} {
    margin-left: ${({ $isOpen }: ContentWrapperProps) => ($isOpen ? TABLET_DRAWER_WIDTH : 0)};
  }

  ${media.lg} {
    margin-left: ${({ $isOpen }: ContentWrapperProps) => ($isOpen ? DESKTOP_DRAWER_WIDTH : 0)};
  }
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
  const { isMobileSize, isDesktopSize } = useRwd();
  const { isMenuOpen } = useHeader();
  return (
    <DefaultLayoutContainer>
      <Header />

      <DashboardContainer>
        {isDesktopSize && <MenuDrawer />}
        <ContentWrapper $isOpen={isDesktopSize && isMenuOpen} $isDesktop={isDesktopSize}>
          <>
            <ChildrenWrapper>{children}</ChildrenWrapper>
            <Footer />
          </>
        </ContentWrapper>
      </DashboardContainer>

      {isMobileSize && <BottomAppBar />}
    </DefaultLayoutContainer>
  );
};

export default DefaultLayout;
