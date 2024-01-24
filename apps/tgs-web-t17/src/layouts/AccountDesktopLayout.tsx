import React from "react";
import styled from "styled-components";
import Footer from "@/layouts/components/Footer";
import Header from "@/layouts/components/Header";
import { media } from "@/theme/breakpoints";
import {
  BOTTOM_APP_BAR_HEIGHT,
  DESKTOP_DRAWER_WIDTH,
  DRAWER_SHRINK_WIDTH,
  MOBILE_HEADER_HEIGHT,
  SUB_CONTENT_MAX_WIDTH,
  TABLET_DRAWER_WIDTH,
} from "@/theme/constants";
import DarkMemberMenu from "@/layouts/components/Header/components/ContextMenuButton/components/DarkMemberMenu";
import MenuDrawer from "@/layouts/components/MenuDrawer";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHeader } from "@tgs-web-nx/core/features";

const DefaultLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};
`;

const DashboardContainer = styled.div`
  display: flex;
  margin-top: ${MOBILE_HEADER_HEIGHT};
  min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT} - ${BOTTOM_APP_BAR_HEIGHT});

  ${media.sm} {
    margin-top: ${MOBILE_HEADER_HEIGHT};
    min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT});
    margin-bottom: unset;
  }
`;

type Props = {
  children: React.ReactNode;
};
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
    margin-left: ${({ $isOpen }: ContentWrapperProps) =>
    $isOpen ? TABLET_DRAWER_WIDTH : DRAWER_SHRINK_WIDTH};
  }

  ${media.lg} {
    margin-left: ${({ $isOpen }: ContentWrapperProps) =>
    $isOpen ? DESKTOP_DRAWER_WIDTH : DRAWER_SHRINK_WIDTH};
  }
`;

const ChildrenWrapper = styled.div`
  max-width: ${SUB_CONTENT_MAX_WIDTH};
  margin: auto;
  display: flex;
  justify-content: center;
  padding-bottom: ${BOTTOM_APP_BAR_HEIGHT};

  ${media.sm} {
    width: 100%;
    /* padding: 30px 0px; */
  }
`;

const AccountDesktopLayout = ({ children }: Props) => {
  const { isDesktopSize, isMobileSize } = useRwd();
  const { isMenuOpen } = useHeader();

  return (
    <DefaultLayoutContainer>
      <Header />

      <DashboardContainer>
        <MenuDrawer />
        <ContentWrapper $isOpen={isDesktopSize && isMenuOpen} $isDesktop={isDesktopSize}>
          <>
            <ChildrenWrapper>
              {/* <DarkMemberMenu
                handleCloseContextMenu={() => {}}
                style={{
                  width: "180px",
                  flexShrink: 0,
                  minHeight: "800px",
                }}
              /> */}
              {children}
            </ChildrenWrapper>
            <Footer />
          </>
        </ContentWrapper>
      </DashboardContainer>
    </DefaultLayoutContainer>
  );
};

export default AccountDesktopLayout;
