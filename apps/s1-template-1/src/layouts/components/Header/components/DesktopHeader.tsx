import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH, MOBILE_HEADER_HEIGHT } from "@/theme/constants";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useAccountStore, useGeneralStore } from "@tgs-web-nx/core";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import AccountHeaderContent from "./AccountHeaderContent";
import AnonymousHeaderContent from "./AnonymousHeaderContent";

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.headerBackground};
  width: 100%;
  height: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.headerBorderColor};
  z-index: 10;
`;

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${MOBILE_HEADER_HEIGHT};
  padding: 0 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;

  ${media.lg} {
    margin: 0 auto;
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
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
  const history = useHistory();
  const noLoginAccount = account.token !== account.info.token;
  const { handleChangeGameType } = useHomeGameContext();
  // Todo
  // using asset site
  // const logoUrl = brand.loadingUrl;
  const logoUrl = "/assets/images/common/logo.svg";

  if (!logoUrl) return null;
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <LogoWrapper>
          <img
            src={logoUrl}
            alt={"logo"}
            width={82}
            height={22}
            onClick={() => {
              history.push("/");
              handleChangeGameType(GameTypeEnum.NONE);
            }}
          />
        </LogoWrapper>
        <HeaderContentContainer>
          {noLoginAccount ? <AnonymousHeaderContent /> : <AccountHeaderContent />}
        </HeaderContentContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default React.memo(DesktopHeader);
