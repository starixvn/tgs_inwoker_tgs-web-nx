import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth, useAuthContext, useHeader } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import SideMenuHeader from "@/layouts/components/Header/components/SideMenuHeader";
import MenuList from "@/layouts/components/MenuDrawer/components/DesktopMenuDrawer/components/MenuList";
import Icon from "@/components/project/Icon";
import { DESKTOP_HEADER_HEIGHT } from "@/theme/constants";
import { theme } from "@/theme";
import promotionIcon from "@/assets/t27/images/account/navItem/icon-promotion.svg";

const MobileMenuDrawerContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  width: 100%;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: calc(100vh - ${DESKTOP_HEADER_HEIGHT});
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding: 20px 10px;
  align-items: flex-start;
  flex-shrink: 0;
  background: ${({ theme }) => theme.g4};

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

type PromotionCardProps = {
  $isShrink: boolean;
};

const PromotionCard = styled.div<PromotionCardProps>`
  cursor: pointer;
  width: 100%;
  background: ${({ $isShrink }: PromotionCardProps) =>
    $isShrink ? theme.g5 : "transparent"};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s ease-in-out;
`;

const IconText = styled.div`
  font-size: 15.6px;
  font-weight: 700;
`;

const MobileMenuDrawer = () => {
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const { isLogin } = useAuth();
  const history = useHistory();
  const { handleLogout } = useAuthContext();
  const { isDesktopSize } = useRwd();
  const isShrink = isDesktopSize && !isMenuOpen;

  const handleDrawerClose = () => {
    if (isDesktopSize) return;
    handleToggleMenu(false);
  };

  const handleClickPromotion = () => {
    history.push("/promotion-list");
    handleDrawerClose();
  };

  return (
    <MobileMenuDrawerContainer>
      <SideMenuHeader />

      <ContentWrapper>
        <PromotionCard $isShrink={isShrink} onClick={handleClickPromotion}>
          <Icon className={"promotion"} iconUrl={promotionIcon} width={"50px"} height={"50px"} />
          <IconText>{!isShrink && i18n.t("common.promotion")}</IconText>
        </PromotionCard>

        <MenuList />
      </ContentWrapper>
    </MobileMenuDrawerContainer>
  );
};

export default MobileMenuDrawer;
