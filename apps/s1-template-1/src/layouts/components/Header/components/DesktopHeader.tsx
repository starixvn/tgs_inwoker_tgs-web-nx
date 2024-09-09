import Marquee from "@/pages/home/components/Marquee";
import { media } from "@/theme/breakpoints";
import { DESKTOP_HEADER_HEIGHT, MOBILE_HEADER_ANNOUNCEMENT_HEIGHT, MOBILE_HEADER_HEIGHT } from "@/theme/constants";
import { useAccountStore, useGeneralStore, useUiStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import AccountHeaderContent from "./AccountHeaderContent";
import AnonymousHeaderContent from "./AnonymousHeaderContent";

const HeaderContainer = styled.div<{ hasAnnouncement: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.headerBackground};
  height: ${({ hasAnnouncement }) =>
    hasAnnouncement ? MOBILE_HEADER_ANNOUNCEMENT_HEIGHT : MOBILE_HEADER_HEIGHT};
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.headerBorderColor};
  z-index: 10;

  ${media.sm} {
    height: ${DESKTOP_HEADER_HEIGHT};
  }
`;

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;

  ${media.lg} {
    margin: 0 auto;
    max-width: 120rem;
  }
`;

const LogoWrapper = styled.div`
  & > img {
    display: block;
    height: 2.9rem;
    cursor: pointer;
  }
`;

const HeaderContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: end;
  height: 100%;
`;

const DesktopHeader = () => {
  const { account } = useAccountStore();
  const {
    general: { brand },
  } = useGeneralStore();
  const { isMobileSize, isDesktopSize } = useRwd();
  const history = useHistory();
  const noLoginAccount = account.token !== account.info.token;
  const {
    ui: { marquees },
  } = useUiStore();
  const hasAnnouncement = (marquees && marquees.length > 0) ?? false;

  // Todo
  // using asset site
  // const logoUrl = brand.loadingUrl;
  const logoUrl = "/assets/images/common/logo.svg";

  if (!logoUrl) return null;
  return (
    <>
      <HeaderContainer hasAnnouncement={hasAnnouncement}>
        {isMobileSize && <Marquee />}
        <HeaderWrapper>
          <LogoWrapper>
            <img
              src={logoUrl}
              alt={"logo"}
              width={82}
              height={22}
              onClick={() => {
                history.push("/");
              }}
            />
          </LogoWrapper>
          <HeaderContentContainer>
            {noLoginAccount ? <AnonymousHeaderContent /> : <AccountHeaderContent />}
          </HeaderContentContainer>
        </HeaderWrapper>
      </HeaderContainer>
      {isDesktopSize && <Marquee />}
    </>
  );
};

export default React.memo(DesktopHeader);
