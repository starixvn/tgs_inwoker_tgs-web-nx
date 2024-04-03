import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import promotionIcon from "@/assets/t36/images/account/navItem/icon-promotion.svg";
import MenuButton from "@/layouts/components/Header/components/MenuButton";
import MenuList from "@/layouts/components/MenuDrawer/components/DesktopMenuDrawer/components/MenuList";
import Icon from "@/components/project/Icon";
import { DESKTOP_HEADER_HEIGHT } from "@/theme/constants";
import MenuLanguageSwitch from "@/components/project/LanguageSwitch/MenuLanguageSwitch";
import { theme } from "@/theme";
import BrandLogo from "@/components/project/BrandLogo";

const DesktopMenuDrawerContainer = styled.div`
  background: ${({ theme }) => theme.g4};
  width: 100%;
  height: 100vh;
`;

const MenuHeaderContainer = styled.div<{
  $isShrink: boolean;
}>`
  position: relative;
  height: ${DESKTOP_HEADER_HEIGHT};
  width: ${($isShrink) => ($isShrink ? "260px" : "100%")};
  display: flex;
  align-items: center;
  padding: 0px 20px;
  gap: 20px;
  flex-shrink: 0;
`;

const HeaderContentContainer = styled.div`
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

const MenuButtonContainer = styled.div`
  padding: 10px;
  background: ${({ theme }) => theme.mainBackground};
`;

type PromotionCardProps = {
  $isShrink: boolean;
};

const PromotionCard = styled.div<PromotionCardProps>`
  cursor: pointer;
  width: 100%;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s ease-in-out;
`;

const LogoImgContainer = styled.div`
  width: 100%;
  height: 27px;
  justify-self: start;
  padding: 0 10px;

  & > img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

const IconText = styled.div`
  font-size: 15.6px;
  font-weight: 700;
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
  const { handleChangeGameType } = useHomeGameContext();

  const handleDrawerClose = () => {
    if (isDesktopSize) return;
    handleToggleMenu(false);
  };

  const handleClickVip = () => {
    history.push("/vip");
    handleDrawerClose();
  };

  const handleClickPromotion = () => {
    history.push("/promotion-list");
    handleDrawerClose();
  };
  ;

  return (
    <DesktopMenuDrawerContainer>
      <MenuHeaderContainer $isShrink={isShrink}>
        <MenuButtonContainer>
          <MenuButton width={"20px"} height={"20px"} />
        </MenuButtonContainer>
        <Link to={"/"}>
          <BrandLogo
            style={{ height: "27px" }}
            onClick={() => handleChangeGameType(GameTypeEnum.NONE)}
          />
        </Link>
      </MenuHeaderContainer>

      <HeaderContentContainer>
        <PromotionCard $isShrink={isShrink} onClick={handleClickPromotion}>
          <Icon className={"promotion"} iconUrl={promotionIcon} width={"50px"} height={"50px"} />
          <IconText>{!isShrink && i18n.t("common.promotion")}</IconText>
        </PromotionCard>

        <MenuList />

        {/* <PromotionCard $isShrink={isShrink} onClick={handleClickVip}>
          <Icon className={"vip"} iconUrl={iconVip} width={"31px"} height={"31px"} />
          <IconText>{!isShrink && "VIP"}</IconText>
        </PromotionCard> */}



        {/* <DownLoadCard $isShrink={isShrink} onClick={handleClickDownload}>
          <Icon className={"icon"} iconUrl={downloadIcon} width={"31px"} height={"31px"} />
          {!isShrink && i18n.t("common.download")}
        </DownLoadCard> */}

        {/* <MenuLanguageSwitch style={{ width: "250px", margin: "0 auto 20px" }} /> */}
      </HeaderContentContainer>
    </DesktopMenuDrawerContainer>
  );
};

export default DesktopMenuDrawer;
