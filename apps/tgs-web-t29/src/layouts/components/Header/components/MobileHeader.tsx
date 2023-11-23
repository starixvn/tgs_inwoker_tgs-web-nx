import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useAccountStore, useGeneralStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import AccountHeaderContent from "./AccountHeaderContent";
import AnonymousHeaderContent from "./AnonymousHeaderContent";
import { DESKTOP_HEADER_HEIGHT, MOBILE_HEADER_HEIGHT } from "@/theme/constants";
import HeaderGameTypes from "@/layouts/components/Header/components/HeaderGameTypeNavs";
import { media } from "@/theme/breakpoints";

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
`;

const LogoImgContainer = styled.div`
  height: 27px;
  justify-self: start;
  padding: 0 10px;

  & > img {
    height: 100%;
  }
`;

const HeaderContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const MobileHeader = () => {
  const { general } = useGeneralStore();
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;
  const { isLargeDesktopSize } = useRwd();
  const { handleChangeGameType } = useHomeGameContext();

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Link to={""}>
          <LogoImgContainer>
            <img
              src={general.brand && general.brand.loadingUrl}
              alt={"logo"}
              onClick={() => handleChangeGameType(GameTypeEnum.NONE)}
            />
          </LogoImgContainer>
        </Link>

        <HeaderContentContainer>
          {isLargeDesktopSize && <HeaderGameTypes />}

          {noLoginAccount ? <AnonymousHeaderContent /> : <AccountHeaderContent />}
        </HeaderContentContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default React.memo(MobileHeader);
