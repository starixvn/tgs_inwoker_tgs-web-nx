import React from "react";
import styled from "styled-components";
import { useAccountStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHeader } from "@tgs-web-nx/core/features";
import AccountHeaderContent from "./AccountHeaderContent";
import AnonymousHeaderContent from "./AnonymousHeaderContent";
import {
  DESKTOP_DRAWER_WIDTH,
  DESKTOP_HEADER_HEIGHT,
  DRAWER_SHRINK_WIDTH,
  MOBILE_HEADER_HEIGHT,
  SUB_CONTENT_MAX_WIDTH,
  TABLET_DRAWER_WIDTH,
} from "@/theme/constants";
import { media } from "@/theme/breakpoints";
import OnlineUser from "@/pages/home/components/CardPrompt/components/OnlineUser";
import SystemTime from "@/layouts/components/Header/components/SystemTime";
import { theme } from "@/theme";

type HeaderContainerProps = {
  $isOpen: boolean;
};

const HeaderContainer = styled.div<HeaderContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.black03};
  height: ${MOBILE_HEADER_HEIGHT};
  width: 100%;
  z-index: 10;
  transition: all ease-in-out 0.2s;

  ${media.sm} {
    height: ${DESKTOP_HEADER_HEIGHT};
    padding-left: ${({ $isOpen }: HeaderContainerProps) =>
      $isOpen ? TABLET_DRAWER_WIDTH : DRAWER_SHRINK_WIDTH};
  }

  ${media.lg} {
    padding-left: ${({ $isOpen }: HeaderContainerProps) =>
      $isOpen ? DESKTOP_DRAWER_WIDTH : DRAWER_SHRINK_WIDTH};

`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  max-width: ${SUB_CONTENT_MAX_WIDTH};
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  transition: all ease-in-out 0.2s;

}
`;

const ContentGroup = styled.div`
  display: flex;
  align-items: center;
`;

const DesktopHeader = () => {
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;
  const { isExtraLargeDesktopSize } = useRwd();
  const { isMenuOpen } = useHeader();

  return (
    <HeaderContainer $isOpen={isMenuOpen}>
      <ContentWrapper>
        <ContentGroup>
          {isExtraLargeDesktopSize && <SystemTime />}
          {isExtraLargeDesktopSize && <OnlineUser color={theme.white} />}
        </ContentGroup>

        <ContentGroup>
          {noLoginAccount ? <AnonymousHeaderContent /> : <AccountHeaderContent />}
        </ContentGroup>
      </ContentWrapper>
    </HeaderContainer>
  );
};

export default React.memo(DesktopHeader);
