import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useAccountStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import AccountHeaderContent from "./AccountHeaderContent";
import AnonymousHeaderContent from "./AnonymousHeaderContent";
import {
  DESKTOP_HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
  SUB_CONTENT_MAX_WIDTH,
  DESKTOP_GRADIENT_HEADER_HEIGHT,
  DESKTOP_GAMETYPE_HEADER_HEIGHT,
} from "@/theme/constants";
import HeaderGameTypes from "@/layouts/components/Header/components/HeaderGameTypeNavs";
import { media } from "@/theme/breakpoints";
import OnlineUser from "@/pages/home/components/CardPrompt/components/OnlineUser";
import SystemTime from "@/layouts/components/Header/components/SystemTime";
import BrandLogo from "@/components/project/BrandLogo";
import { theme } from "@/theme";

const HeaderContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.black};
  height: ${MOBILE_HEADER_HEIGHT};
  width: 100vw;
  z-index: 10;

  ${media.sm} {
    height: ${DESKTOP_HEADER_HEIGHT};
  }
`;

const ContentWrapper = styled.div`
  padding: 0 8px;
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
`;

const GradientHeaderRowContainer = styled.div`
  padding: 0 8px;
  height: ${DESKTOP_GRADIENT_HEADER_HEIGHT}px;
  background: ${({ theme }) => theme.primaryGradient};
`;

const WhiteHeaderRowContainer = styled.div`
  height: ${DESKTOP_GAMETYPE_HEADER_HEIGHT}px;
`;

const DesktopHeader = () => {
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;
  const { isLargeDesktopSize } = useRwd();
  const { handleChangeGameType } = useHomeGameContext();

  return (
    <HeaderContainer>
      <GradientHeaderRowContainer>
        <ContentWrapper>
          <ContentGroup>
            <OnlineUser color={theme.white} />
            {isLargeDesktopSize && <SystemTime />}
          </ContentGroup>

          <ContentGroup>
            {noLoginAccount ? <AnonymousHeaderContent /> : <AccountHeaderContent />}
          </ContentGroup>
        </ContentWrapper>
      </GradientHeaderRowContainer>

      <WhiteHeaderRowContainer>
        <ContentWrapper style={{justifyContent: "center"}}>
          <Link to={""}>
            <BrandLogo
              style={{ maxWidth: "155px" }}
              onClick={() => handleChangeGameType(GameTypeEnum.NONE)}
            />
          </Link>

          <HeaderGameTypes />
        </ContentWrapper>
      </WhiteHeaderRowContainer>
    </HeaderContainer>  
  );
};

export default React.memo(DesktopHeader);
