import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useHeader } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import iconPromotion from "@/assets/t27/images/account/navItem/icon-promotions.svg";
import downloadIcon from "@/assets/t27/images/account/navItem/icon-download.svg";
import iconVip from "@/assets/t27/images/account/navItem/icon-vip.svg";
import MenuButton from "@/layouts/components/Header/components/MenuButton";
import MenuGameTypeList from "@/layouts/components/MenuDrawer/components/DesktopMenuDrawer/components/MenuGameTypeList";
import Icon from "@/components/project/Icon";
import { DESKTOP_HEADER_HEIGHT } from "@/theme/constants";
import MenuLanguageSwitch from "@/components/project/LanguageSwitch/MenuLanguageSwitch";
import { theme } from "@/theme";

const DesktopMenuDrawerContainer = styled.div`
  background: ${({ theme }) => theme.g4};
  width: 100%;
  height: 100vh;
`;

const MenuHeaderContainer = styled.div`
  position: relative;
  height: ${DESKTOP_HEADER_HEIGHT};
  width: 100%;
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
  width: ${({ $isShrink }: PromotionCardProps) => ($isShrink ? "auto" : "250px")};
  margin: 0 auto 8px;
  background: ${({ $isShrink }: PromotionCardProps) =>
    $isShrink ? theme.mainDarkBackground : theme.mainLightBackground};
  border-radius: 12px;
  padding: 12px 30px;
  display: flex;
  align-items: center;
  justify-content: ${({ $isShrink }: PromotionCardProps) => ($isShrink ? "center" : "flex-start")};
  font-size: 1.375rem;
  line-height: 1.611rem;
  font-weight: 700;
  transition: all 0.2s ease-in-out;
`;

const DownLoadCard = styled(PromotionCard)``;

const LogoImgContainer = styled.div`
  max-width: 100px;
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
  margin-left: 10px;
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

  const handleClickDownload = () => {
    history.push("/appDownload");
    handleDrawerClose();
  };

  return (
    <DesktopMenuDrawerContainer>
      <MenuHeaderContainer>
        <MenuButtonContainer>
          <MenuButton width={"20px"} height={"20px"} />
        </MenuButtonContainer>
        <Link to={"/"}>
          <LogoImgContainer>
            <img src={brand && brand.loadingUrl} alt={"logo"} />
          </LogoImgContainer>
        </Link>
      </MenuHeaderContainer>

      <HeaderContentContainer>
        <MenuGameTypeList />
        <PromotionCard $isShrink={isShrink} onClick={handleClickVip}>
          <Icon className={"vip"} iconUrl={iconVip} width={"31px"} height={"31px"} />
          <IconText>{!isShrink && "VIP"}</IconText>
        </PromotionCard>

        <PromotionCard $isShrink={isShrink} onClick={handleClickPromotion}>
          <Icon className={"promotion"} iconUrl={iconPromotion} width={"31px"} height={"31px"} />
          <IconText>{!isShrink && i18n.t("common.promotion")}</IconText>
        </PromotionCard>

        <DownLoadCard $isShrink={isShrink} onClick={handleClickDownload}>
          <Icon className={"icon"} iconUrl={downloadIcon} width={"31px"} height={"31px"} />
          {!isShrink && i18n.t("common.download")}
        </DownLoadCard>

        <MenuLanguageSwitch style={{ width: "250px", margin: "0 auto 20px" }} />
      </HeaderContentContainer>
    </DesktopMenuDrawerContainer>
  );
};

export default DesktopMenuDrawer;
