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

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.mainBackground};
  height: ${MOBILE_HEADER_HEIGHT};
  width: 100%;
  z-index: 10;
`;

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px 17px;
  display: flex;
  align-items: center;
  justify-content: start;
  z-index: 2;
`;

const HeaderContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: end;
  margin-right: 20px;
`;

type ContentWrapperProps = {
  $isOpen: boolean;
};

const SystemInfoContainer = styled.div`
  display: flex;
  align-items: center;
  ${media.md} {
    margin-left: ${({ $isOpen }: ContentWrapperProps) =>
    $isOpen ? TABLET_DRAWER_WIDTH : DRAWER_SHRINK_WIDTH};
  }

  ${media.lg} {
    margin-left: ${({ $isOpen }: ContentWrapperProps) =>
    $isOpen ? DESKTOP_DRAWER_WIDTH : DRAWER_SHRINK_WIDTH};
  }
  position: absolute;
  left: 0;
`;

const Header = () => {
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;
  const { isDesktopSize, isLargeDesktopSize, isExtraLargeDesktopSize } = useRwd();
  const { isMenuOpen } = useHeader();

  const { handleChangeGameType } = useHomeGameContext();

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Link to={""}>
          <BrandLogo
            style={{ height: "28px" }}
            onClick={() => handleChangeGameType(GameTypeEnum.NONE)}
          />
        </Link>
        {isExtraLargeDesktopSize && (
          <SystemInfoContainer $isOpen={isDesktopSize && isMenuOpen}>
            <CurrentTime />
          </SystemInfoContainer>
        )}
        <HeaderContentContainer>
          {noLoginAccount ? <AnonymousHeaderContent /> : <AccountHeaderContent />}

          {!isDesktopSize && <ContactButton />}
        </HeaderContentContainer>
        <MenuButton />
        {!isLargeDesktopSize && <MenuButton />}
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default React.memo(Header);
