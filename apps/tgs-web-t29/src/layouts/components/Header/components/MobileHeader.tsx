import React from "react";
import styled from "styled-components";
import { useAccountStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useGoToHomePage } from "@tgs-web-nx/core/hooks";
import AccountHeaderContent from "./AccountHeaderContent";
import AnonymousHeaderContent from "./AnonymousHeaderContent";
import { DESKTOP_HEADER_HEIGHT, MOBILE_HEADER_HEIGHT } from "@/theme/constants";
import HeaderGameTypes from "@/layouts/components/Header/components/HeaderGameTypeNavs";
import { media } from "@/theme/breakpoints";
import BrandLogo from "@/components/project/BrandLogo";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.white};
  height: ${MOBILE_HEADER_HEIGHT};
  width: 100%;
  z-index: 10;

  ${media.sm} {
    height: ${DESKTOP_HEADER_HEIGHT};
  }
`;

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1.49px 24px;
  display: flex;
  align-items: center;
  justify-content: start;
  z-index: 2;
  flex-shrink: 1;
`;

const HeaderContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const MobileHeader = () => {
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;
  const { isLargeDesktopSize } = useRwd();
  const goToHomePage = useGoToHomePage();

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <BrandLogo style={{ height: "27px", cursor: "pointer" }} onClick={() => goToHomePage()} />

        <HeaderContentContainer>
          {isLargeDesktopSize && <HeaderGameTypes />}

          {noLoginAccount ? <AnonymousHeaderContent /> : <AccountHeaderContent />}
        </HeaderContentContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default React.memo(MobileHeader);
