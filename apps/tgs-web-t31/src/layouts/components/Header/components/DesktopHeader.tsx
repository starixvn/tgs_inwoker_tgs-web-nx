import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useAccountStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import AccountHeaderContent from "./AccountHeaderContent";
import AnonymousHeaderContent from "./AnonymousHeaderContent";
import UserInfo from "./UserInfo";
import { DESKTOP_HEADER_HEIGHT, MOBILE_HEADER_HEIGHT } from "@/theme/constants";
import HeaderGameTypes from "@/layouts/components/Header/components/HeaderGameTypeNavs";
import { media } from "@/theme/breakpoints";
import SystemTime from "@/layouts/components/Header/components/SystemTime";
import BrandLogo from "@/components/project/BrandLogo";
import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.header};
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
  max-width: 1200px;
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

const UserActionHeaderRowContainer = styled.div`
  background-size: cover;
  height: 40px;
`;

const GameTypeHeaderRowContainer = styled.div`
  margin: auto;
  height: 65px;
`;

const DesktopHeader = () => {
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;
  const { isLargeDesktopSize } = useRwd();
  const { handleChangeGameType } = useHomeGameContext();

  return (
    <HeaderContainer>
      <UserActionHeaderRowContainer>
        <ContentWrapper>
          <ContentGroup>{isLargeDesktopSize && <SystemTime />}</ContentGroup>

          <ContentGroup>
            {!noLoginAccount && <UserInfo />}
            <HeaderLanguageSwitch />

            {noLoginAccount ? <AnonymousHeaderContent /> : <AccountHeaderContent />}
          </ContentGroup>
        </ContentWrapper>
      </UserActionHeaderRowContainer>

      <GameTypeHeaderRowContainer>
        <ContentWrapper>
          <Link to={""}>
            <BrandLogo
              style={{ height: "27px" }}
              onClick={() => handleChangeGameType(GameTypeEnum.NONE)}
            />
          </Link>
          <HeaderGameTypes />
        </ContentWrapper>
      </GameTypeHeaderRowContainer>
    </HeaderContainer>
  );
};

export default React.memo(DesktopHeader);
