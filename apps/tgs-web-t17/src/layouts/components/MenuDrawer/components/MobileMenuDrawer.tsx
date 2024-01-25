import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth, useAuthContext, useHeader } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import SideMenuHeader from "@/layouts/components/Header/components/SideMenuHeader";
import MenuList from "@/layouts/components/MenuDrawer/components/DesktopMenuDrawer/components/MenuList";
import Icon from "@/components/project/Icon";
import { theme } from "@/theme";
import casinoIcon from "@/assets/t17/images/account/navItem/icon-casino.svg";
import toggleIcon from "@/assets/t17/images/account/navItem/icon-toggle.svg";
import { useState } from "react";
import { media } from "@/theme/breakpoints";
import AccountMenu from "../../Header/components/ContextMenuButton/components/AccountMenu";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import { Button } from "@/components/UI/Button";

const MobileMenuDrawerContainer = styled.div`
  background: ${({ theme }) => theme.darkGray};
  width: 100%;
  height: 100vh;
  padding: 20px;
  gap: 15px;
  
  ${media.sm} {
    padding: 20px 40px;
    gap: 30px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding: 20px;
  align-items: flex-start;
  flex-shrink: 0;
  background: ${({ theme }) => theme.darkGray};


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

type CasinoCardProps = {
  $isShrink: boolean;
};

const CasinoCard = styled.div<CasinoCardProps>`
  cursor: pointer;
  width: 100%;
  background: ${({ $isShrink }: CasinoCardProps) =>
    $isShrink ? theme.mainBackground : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  padding: 10px 20px;
`;

const GameTypeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: calc(100% - 14px);
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

const MobileMenuDrawer = () => {
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const { isLogin } = useAuth();
  const history = useHistory();
  const { handleLogout } = useAuthContext();
  const { isDesktopSize } = useRwd();
  const isShrink = isDesktopSize && !isMenuOpen;
  const [isOpenGameTypeMenu, setIsOpenGameTypeMenu] = useState(false);

  return (
    <MobileMenuDrawerContainer>
      <SideMenuHeader />

      <ContentWrapper>
        <CasinoCard $isShrink={isShrink} onClick={() => setIsOpenGameTypeMenu(!isOpenGameTypeMenu)}>
          <GameTypeWrapper>
            <Icon iconUrl={casinoIcon} width={"30px"} height={"21px"} />
            <IconText>Casino</IconText>
          </GameTypeWrapper >
          <ToggleWrapper $isOpenGameTypeMenu={isOpenGameTypeMenu}><Icon iconUrl={toggleIcon} width={"14px"} height={"8px"} /></ToggleWrapper>
        </CasinoCard>
        {isOpenGameTypeMenu && <MenuList />}
        {/* Data Ref: sideNavItemList */}
        <AccountMenu />
        {/* Data Ref: accountNavItemList */}
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

      </ContentWrapper>
    </MobileMenuDrawerContainer>
  );
};

export default MobileMenuDrawer;
