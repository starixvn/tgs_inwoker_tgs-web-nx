import React from "react";
import styled from "styled-components";
import { useHeader } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Footer from "@/layouts/components/Footer";
import Header from "@/layouts/components/Header";
import { media } from "@/theme/breakpoints";
import {
  BOTTOM_APP_BAR_HEIGHT,
  MOBILE_HEADER_HEIGHT,
  SUB_CONTENT_MAX_WIDTH,
} from "@/theme/constants";
import DarkMemberMenu from "@/layouts/components/Header/components/DarkMemberMenu";

const DefaultLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};

  ${media.sm} {
    background: linear-gradient(180deg, #5174b8 0%, #16326a 100%);
  }
`;

const DashboardContainer = styled.div`
  display: flex;
  margin-top: ${MOBILE_HEADER_HEIGHT};
  min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT} - ${BOTTOM_APP_BAR_HEIGHT});

  ${media.sm} {
    margin-top: 0;
    min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT});
    margin-bottom: unset;
    margin-top: 20px;
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
`;

const ChildrenWrapper = styled.div`
  max-width: ${SUB_CONTENT_MAX_WIDTH};
  margin: auto;
  display: flex;
  justify-content: center;
  padding-bottom: ${BOTTOM_APP_BAR_HEIGHT};

  ${media.sm} {
    width: 100%;
    gap: 20px;
  }
`;

const AccountDesktopLayout = ({ children }: Props) => {
  const { isDesktopSize, isMobileSize } = useRwd();
  const { isMenuOpen } = useHeader();

  return (
    <DefaultLayoutContainer>
      <Header />

      <DashboardContainer>
        <ContentWrapper $isOpen={isDesktopSize && isMenuOpen} $isDesktop={isDesktopSize}>
          <>
            <ChildrenWrapper>
              <DarkMemberMenu
                handleCloseContextMenu={() => {}}
                style={{
                  width: "258px",
                  flexShrink: 0,
                  height: "100%",
                }}
              />
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
