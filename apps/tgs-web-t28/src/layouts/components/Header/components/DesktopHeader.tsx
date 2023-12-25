import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useAccountStore, useGeneralStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import AccountHeaderContent from "./AccountHeaderContent";
import AnonymousHeaderContent from "./AnonymousHeaderContent";
import MenuButton from "./MenuButton";
import {
  DESKTOP_DRAWER_WIDTH,
  DESKTOP_HEADER_HEIGHT,
  DRAWER_SHRINK_WIDTH,
  MOBILE_HEADER_HEIGHT,
  SUB_CONTENT_MAX_WIDTH,
  TABLET_DRAWER_WIDTH,
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
  background: ${({ theme }) => theme.NavBGC};
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
  padding: 10px 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
`;

type ContentWrapperProps = {
  $isOpen: boolean;
};

const MenuButonnWrapper = styled.div`
  display: flex;
  align-items: center;
  ${media.md} {
    margin-left: ${({ $isOpen }: ContentWrapperProps) => ($isOpen ? TABLET_DRAWER_WIDTH : `10px`)};
  }

  ${media.lg} {
    margin-left: ${({ $isOpen }: ContentWrapperProps) => ($isOpen ? DESKTOP_DRAWER_WIDTH : `10px`)};
  }
  position: absolute;
  left: 0;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > img {
    height: 48px;
    /* width: 100%; */
    object-fit: contain;
    display: block;
    margin: auto;
    cursor: pointer;
  }
`;

const HeaderContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const DesktopHeader = () => {
  const { account } = useAccountStore();
  const {
    general: { brand },
  } = useGeneralStore();
  const history = useHistory();
  const noLoginAccount = account.token !== account.info.token;
  const { isLargeDesktopSize, isDesktopSize } = useRwd();
  const { handleChangeGameType } = useHomeGameContext();
  const { isMenuOpen } = useHeader();
  const logoUrl = brand.loadingUrl;
  if (!logoUrl) return null;
  return (
    <HeaderContainer>
      <HeaderWrapper>
        {isDesktopSize ? (
          <MenuButonnWrapper $isOpen={isDesktopSize && isMenuOpen}>
            <MenuButton />
            <LogoWrapper>
              <img
                src={logoUrl}
                alt={"logo"}
                height={48}
                onClick={() => {
                  history.push("/");
                }}
              />
              <SystemTime />
            </LogoWrapper>
          </MenuButonnWrapper>
        ) : (
          <LogoWrapper>
            <img
              src={logoUrl}
              alt={"logo"}
              width={94}
              height={44}
              onClick={() => {
                history.push("/");
              }}
            />
          </LogoWrapper>
        )}
        <HeaderContentContainer>
          {noLoginAccount ? <AnonymousHeaderContent /> : <AccountHeaderContent />}
        </HeaderContentContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default React.memo(DesktopHeader);
