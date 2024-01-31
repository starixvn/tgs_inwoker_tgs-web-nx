import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useAuth, useAuthContext, useHeader } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import promotionIcon from "@/assets/t27/images/account/navItem/icon-promotion.svg";
import downloadIcon from "@/assets/t27/images/account/navItem/icon-download.svg";
import iconVip from "@/assets/t27/images/account/navItem/icon-vip.svg";
import MenuButton from "@/layouts/components/Header/components/MenuButton";
import MenuList from "@/layouts/components/MenuDrawer/components/DesktopMenuDrawer/components/MenuList";
import Icon from "@/components/project/Icon";
import { DESKTOP_HEADER_HEIGHT } from "@/theme/constants";
import MenuLanguageSwitch from "@/components/project/LanguageSwitch/MenuLanguageSwitch";
import { theme } from "@/theme";
import { useState } from "react";
import casinoIcon from "@/assets/t17/images/account/navItem/icon-casino.svg";
import toggleIcon from "@/assets/t17/images/account/navItem/icon-toggle.svg";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import { Button } from "@/components/UI/Button";
import AccountMenu from "@/layouts/components/Header/components/ContextMenuButton/components/AccountMenu";
import { media } from "@/theme/breakpoints";

const DesktopMenuDrawerContainer = styled.div`
  background: ${({ theme }) => theme.darkGray};
  width: 100%;
  height: 100vh;
`;

const MenuHeaderContainer = styled.div<{
  $isShrink: boolean;
}>`
  position: relative;
  height: ${DESKTOP_HEADER_HEIGHT};
  width: ${($isShrink) => ($isShrink ? "310px" : "100%")};
  display: flex;
  align-items: center;
  gap: 30px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.mainBackground};
  padding: 0 30px;
`;

const HeaderContentContainer = styled.div`
  width: 100%;
  height: calc(100vh - ${DESKTOP_HEADER_HEIGHT});
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding: 20px 40px;
  align-items: flex-start;
  flex-shrink: 0;
  background: ${({ theme }) => theme.darkGray};

  ${media.sm} {
    padding: 22px 5px;
    gap: 8px;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #53535375;
  }

  &::-webkit-scrollbar-track-piece {
    background: transparent;
  }

  & > * {
    flex-shrink: 0;
  }
`;

const MenuButtonContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
`;

const LogoImgContainer = styled.div`
  width: 155px;
  height: 77px;
  justify-self: start;
  padding: 0 10px;

  & > img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

const CasinoCard = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  padding: 10px 20px 10px;
  border-radius: 10px 10px 0 0;
`;

const GameTypeWrapper = styled.div<{
  $isShrink: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: ${({ $isShrink }) => $isShrink ? "center" : ""};
  gap: 15px;
  width: ${({ $isShrink }) => $isShrink ? "100%" : "calc(100% - 14px)"};
`;

const IconText = styled.div`
  font-size: 15.6px;
  font-weight: 700;
`;

const LanguageSwitchWrapper = styled.div`
  width: 100%;
`;

const ToggleWrapper = styled.div<{
  $isOpenGameTypeMenu: boolean;
}>`
  transform: ${({ $isOpenGameTypeMenu }) => $isOpenGameTypeMenu ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: all 0.2s ease-in-out;
`;

const DesktopMenuDrawer = () => {
  const {
    general: { brand },
  } = useGeneralStore();
  const { handleToggleMenu } = useHeader();
  const history = useHistory();
  const { isDesktopSize } = useRwd();
  const { isMenuOpen } = useHeader();
  const isShrink = isDesktopSize && !isMenuOpen;
  const [isOpenGameTypeMenu, setIsOpenGameTypeMenu] = useState(false);
  const { isLogin } = useAuth();
  const { handleLogout } = useAuthContext();

  const handleDrawerClose = () => {
    if (isDesktopSize) return;
    handleToggleMenu(false);
  };

  return (
    <DesktopMenuDrawerContainer>
      <MenuHeaderContainer $isShrink={isShrink}>
        <MenuButtonContainer>
          <MenuButton width={"30px"} height={"20px"} />
        </MenuButtonContainer>
        {!isShrink &&
          <Link to={"/"}>
            <LogoImgContainer>
              <img src={brand && brand.loadingUrl} alt={"logo"} />
            </LogoImgContainer>
          </Link>
        }
      </MenuHeaderContainer>

      <HeaderContentContainer>
        <CasinoCard onClick={() => setIsOpenGameTypeMenu(!isOpenGameTypeMenu)}>
          <GameTypeWrapper $isShrink={isShrink}>
            <Icon iconUrl={casinoIcon} width={"30px"} height={"21px"} />
            {!isShrink && <IconText>Casino</IconText>}
          </GameTypeWrapper >
          {!isShrink && <ToggleWrapper $isOpenGameTypeMenu={isOpenGameTypeMenu}><Icon iconUrl={toggleIcon} width={"14px"} height={"8px"} /></ToggleWrapper>}
        </CasinoCard>
        {isOpenGameTypeMenu && <MenuList />}
        <AccountMenu />
        <LanguageSwitchWrapper>
          <LanguageSwitch />
        </LanguageSwitchWrapper>

        {isLogin && (
          <Button
            sx={{
              height: "40px",
              width: "100%",
            }}
            onClick={handleLogout}
          >
            {i18n.t("web.header.logout")}
          </Button>
        )}
      </HeaderContentContainer>
    </DesktopMenuDrawerContainer>
  );
};

export default DesktopMenuDrawer;
