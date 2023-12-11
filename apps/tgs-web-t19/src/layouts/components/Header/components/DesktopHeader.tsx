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
  background: ${({ theme }) => theme.subBackground};
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
  padding: 0 10px;
`;

const ContentGroup = styled.div`
  display: flex;
  align-items: center;
`;

const BlueHeaderRowContainer = styled.div`
  background: ${({ theme }) => theme.subBackground};
  background-size: cover;
  height: 84px;
`;

const WhiteHeaderRowContainer = styled.div`
  margin: auto;
  height: 72px;
`;

const DesktopHeader = () => {
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;
  const { isLargeDesktopSize, isDesktopSize } = useRwd();
  const { handleChangeGameType } = useHomeGameContext();

  return (
    <HeaderContainer>
      <BlueHeaderRowContainer>
        <ContentWrapper>
          <ContentGroup>
            {isLargeDesktopSize && <SystemTime />}
            {isLargeDesktopSize && <OnlineUser color={theme.white} />}
          </ContentGroup>

          <ContentGroup>
            {noLoginAccount ? <AnonymousHeaderContent /> : <AccountHeaderContent />}
          </ContentGroup>
        </ContentWrapper>
      </BlueHeaderRowContainer>

      <WhiteHeaderRowContainer>
        <ContentWrapper>
          <Link to={""}>
            <BrandLogo
              style={{ height: "27px" }}
              onClick={() => handleChangeGameType(GameTypeEnum.NONE)}
            />
          </Link>

          {isDesktopSize && <HeaderGameTypes />}
        </ContentWrapper>
      </WhiteHeaderRowContainer>
    </HeaderContainer>
  );
};

export default React.memo(DesktopHeader);
