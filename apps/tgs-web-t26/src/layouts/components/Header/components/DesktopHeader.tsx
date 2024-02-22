import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useAccountStore } from "@tgs-web-nx/core";
import { useGoToHomePage, useRwd } from "@tgs-web-nx/core/hooks";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import AccountHeaderContent from "./AccountHeaderContent";
import AnonymousHeaderContent from "./AnonymousHeaderContent";
import {
  DESKTOP_HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
  SUB_CONTENT_MAX_WIDTH,
} from "@/theme/constants";
import HeaderGameTypes from "@/layouts/components/Header/components/HeaderGameTypeNavs";
import { media } from "@/theme/breakpoints";
import OnlineUser from "@/pages/home/components/CardPrompt/components/OnlineUser";
import SystemTime from "@/layouts/components/Header/components/SystemTime";
import BrandLogo from "@/components/project/BrandLogo";
import { theme } from "@/theme";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: ${MOBILE_HEADER_HEIGHT};
  width: 100%;
  z-index: 10;

  ${media.sm} {
    height: ${DESKTOP_HEADER_HEIGHT};
  }
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
`;

const ContentGroup = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 5px;
`;

const BlackHeaderRowContainer = styled.div`
  background: #1c1e22;
  height: 60px;
  padding: 10px 12px;
  ${media.sm} {
    height: 108px;
    padding: 0 50px;
  }
`;

const OrangeHeaderRowContainer = styled.div`
  margin: auto;
  height: 45px;
  background: ${({ theme }) => theme.primary};
`;

const SystemInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
`;

const DesktopHeader = () => {
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;
  const { isDesktopSize } = useRwd();
  const goToHomePage = useGoToHomePage();

  return (
    <HeaderContainer>
      <BlackHeaderRowContainer>
        <ContentWrapper>
          <ContentGroup>
            <Link to={""}>
              <BrandLogo onClick={() => goToHomePage()} />
            </Link>
          </ContentGroup>
          <ContentGroup>
            {isDesktopSize && (
              <SystemInfo>
                <SystemTime />
                <OnlineUser color={theme.white} />
              </SystemInfo>
            )}
            {noLoginAccount ? <AnonymousHeaderContent /> : <AccountHeaderContent />}
          </ContentGroup>
        </ContentWrapper>
      </BlackHeaderRowContainer>
      {isDesktopSize && (
        <OrangeHeaderRowContainer>
          <ContentWrapper>
            <HeaderGameTypes />
          </ContentWrapper>
        </OrangeHeaderRowContainer>
      )}
    </HeaderContainer>
  );
};

export default React.memo(DesktopHeader);
