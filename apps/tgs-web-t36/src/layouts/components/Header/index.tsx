import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useAccountStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import AccountHeaderContent from "./components/AccountHeaderContent";
import AnonymousHeaderContent from "./components/AnonymousHeaderContent";
import ContactButton from "./components/ContactButton";
import MenuButton from "./components/MenuButton";
import {
  DESKTOP_DRAWER_WIDTH,
  DRAWER_SHRINK_WIDTH,
  MOBILE_HEADER_HEIGHT,
  TABLET_DRAWER_WIDTH,
} from "@/theme/constants";
import CurrentTime from "@/components/project/CurrentTime";
import { media } from "@/theme/breakpoints";
import BrandLogo from "@/components/project/BrandLogo";
import SystemTime from "@/layouts/components/Header/components/SystemTime";

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
    background: linear-gradient(180deg, #5174b8 0%, #16326a 100%);
  }
`;

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  z-index: 2;
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

type ContentWrapperProps = {
  $isOpen: boolean;
};

const SystemInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;

  ${media.md} {
    margin-left: ${({ $isOpen }: ContentWrapperProps) =>
      $isOpen ? TABLET_DRAWER_WIDTH : DRAWER_SHRINK_WIDTH};
  }

  ${media.lg} {
    margin-left: ${({ $isOpen }: ContentWrapperProps) =>
      $isOpen ? DESKTOP_DRAWER_WIDTH : DRAWER_SHRINK_WIDTH};
  }
`;

const Header = () => {
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;
  const { isMobileSize, isDesktopSize } = useRwd();
  const { isMenuOpen } = useHeader();
  const { handleChangeGameType } = useHomeGameContext();

  return (
    <HeaderContainer>
      <HeaderWrapper>
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
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default React.memo(Header);
