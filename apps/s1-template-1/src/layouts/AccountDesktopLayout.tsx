import React from "react";
import styled from "styled-components";
import { useHeader } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import MenuDrawer from "./components/MenuDrawer";
import Footer from "@/layouts/components/Footer";
import Header from "@/layouts/components/Header";
import { media } from "@/theme/breakpoints";
import {
  BOTTOM_APP_BAR_HEIGHT,
  DESKTOP_DRAWER_WIDTH,
  DESKTOP_HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
  TABLET_DRAWER_WIDTH,
} from "@/theme/constants";
// import bg from "@/assets/t29/images/bg.png";

const DefaultLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};

  ${media.sm} {
    background: ${({ theme }) => theme.mainBackground};
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
  max-width: 1170px;
  margin: auto;
  padding-bottom: ${BOTTOM_APP_BAR_HEIGHT};
  display: flex;
  justify-content: center;
  ${media.sm} {
    padding-bottom: 15px;
    margin-top: 15px;
  }
`;

type Props = {
  children: React.ReactNode;
};
const AccountDesktopLayout = ({ children }: Props) => {
  const { isDesktopSize } = useRwd();
  const { isMenuOpen } = useHeader();

  return (
    <DefaultLayoutContainer>
      <Header />
      <DashboardContainer>
        {isDesktopSize && <MenuDrawer />}
        <ContentWrapper $isOpen={isDesktopSize && isMenuOpen} $isDesktop={isDesktopSize}>
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </ContentWrapper>
      </DashboardContainer>
      <Footer />
    </DefaultLayoutContainer>
  );
};

export default AccountDesktopLayout;
