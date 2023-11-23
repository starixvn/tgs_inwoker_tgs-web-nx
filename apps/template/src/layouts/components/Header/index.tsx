import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useAccountStore, useGeneralStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHeader } from "@tgs-web-nx/core/features";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import AccountHeaderContent from "./components/AccountHeaderContent";
import AnonymousHeaderContent from "./components/AnonymousHeaderContent";
import ContactButton from "./components/ContactButton";
import MenuButton from "./components/MenuButton";
import {
  DESKTOP_DRAWER_WIDTH,
  DRAWER_SHRINK_WIDTH,
  HEADER_HEIGHT,
  TABLET_DRAWER_WIDTH,
} from "@/theme/constants";
import OnlineUser from "@/pages/home/components/CardPrompt/components/OnlineUser";
import CurrentTime from "@/components/project/CurrentTime";
import { media } from "@/theme/breakpoints";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.mainDarkBackground};
  height: ${HEADER_HEIGHT};
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

const OnlineUserContainer = styled.div`
  margin-left: 50px;
  display: flex;
  align-items: center;
`;

const Header = () => {
  const { general } = useGeneralStore();
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;
  const { isDesktopSize, isLargeDesktopSize, isMobileSize } = useRwd();
  const { isMenuOpen } = useHeader();

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
        {!isMobileSize && (
          <SystemInfoContainer $isOpen={isDesktopSize && isMenuOpen}>
            <OnlineUserContainer>
              <OnlineUser />
            </OnlineUserContainer>
            <CurrentTime />
          </SystemInfoContainer>
        )}
        <HeaderContentContainer>
          {noLoginAccount ? <AnonymousHeaderContent /> : <AccountHeaderContent />}

          {!isDesktopSize && <ContactButton />}
        </HeaderContentContainer>

        {!isLargeDesktopSize && <MenuButton />}
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default React.memo(Header);
