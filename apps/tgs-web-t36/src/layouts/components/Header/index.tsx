import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useAccountStore, useGeneralStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import AccountHeaderContent from "./components/AccountHeaderContent";
import AnonymousHeaderContent from "./components/AnonymousHeaderContent";
import MenuButton from "./components/MenuButton";
import {
  DESKTOP_HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
  SUB_CONTENT_MAX_WIDTH,
} from "@/theme/constants";
import { media } from "@/theme/breakpoints";
import BrandLogo from "@/components/project/BrandLogo";
import SystemTime from "@/layouts/components/Header/components/SystemTime";
import HeaderGameTypes from "@/layouts/components/Header/components/HeaderGameTypeNavs";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.primaryGradient};
  height: ${MOBILE_HEADER_HEIGHT};
  width: 100%;
  z-index: 10;
  box-shadow: 0px 4px 6px 0px rgba(17, 20, 21, 0.5);
  ${media.sm} {
    position: relative;
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    height: ${DESKTOP_HEADER_HEIGHT};
    margin: 0 auto;
  }
`;

const UseInfoHeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  z-index: 10;
  ${media.sm} {
    height: 48px;
    padding: 0 60px;
    background: linear-gradient(180deg, #5174b8 0%, #16326a 100%);
  }
`;

const NavHeaderWrapper = styled(UseInfoHeaderWrapper)`
  position: relative;
  width: 100%;
  height: 72px;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  z-index: 2;
  background: linear-gradient(180deg, #5174b8 0%, #16326a 100%);

  ${media.sm} {
    padding: 0 60px;
  }
`;

const HeaderContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: end;
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

const Logo = styled.div`
  object-fit: contain;
  display: block;
  margin: auto;

  & img {
    max-height: 60px;
  }
`;

const Header = () => {
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;
  const { isMobileSize, isDesktopSize } = useRwd();
  const { handleChangeGameType } = useHomeGameContext();
  const {
    general: { brand },
  } = useGeneralStore();
  if (!brand.loadingUrl) return null;

  return (
    <HeaderContainer>
      <UseInfoHeaderWrapper>
        {isMobileSize && <MenuButton />}
        {isDesktopSize && <SystemTime />}
        {isMobileSize && (
          <Link to={""}>
            <BrandLogo
              style={{ height: "28px", marginLeft: isDesktopSize ? "70px" : "unset" }}
              onClick={() => handleChangeGameType(GameTypeEnum.NONE)}
            />
          </Link> 
        )}

        <HeaderContentContainer>
          {noLoginAccount ? <AnonymousHeaderContent /> : <AccountHeaderContent />}
        </HeaderContentContainer>
      </UseInfoHeaderWrapper>
      {isDesktopSize && (
        <NavHeaderWrapper>
          <ContentWrapper>
            <Link to={""}>
              {brand.loadingUrl && (
                <Logo onClick={() => handleChangeGameType(GameTypeEnum.NONE)}>
                  <img src={brand.loadingUrl} alt="logo" />
                </Logo>
              )}
            </Link>

            <HeaderGameTypes />
          </ContentWrapper>
        </NavHeaderWrapper>
      )}
    </HeaderContainer>
  );
};

export default React.memo(Header);
