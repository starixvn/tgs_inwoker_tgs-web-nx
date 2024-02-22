import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import iconPromotion from "@/assets/t23/images/account/navItem/icon-promotions.svg";
import downloadIcon from "@/assets/t23/images/account/navItem/icon-download.svg";
import iconVip from "@/assets/t23/images/account/navItem/icon-vip.svg";
import MenuButton from "@/layouts/components/Header/components/MenuButton";
import MenuGameTypeList from "@/layouts/components/MenuDrawer/components/DesktopMenuDrawer/components/MenuGameTypeList";
import Icon from "@/components/project/Icon";
import { HEADER_HEIGHT } from "@/theme/constants";
import MenuLanguageSwitch from "@/components/project/LanguageSwitch/MenuLanguageSwitch";
import { theme } from "@/theme";
import BrandLogo from "@/components/project/BrandLogo";

const DesktopMenuDrawerContainer = styled.div`
  background: ${({ theme }) => theme.mainDarkBackground};
  width: 100%;
  height: 100vh;
  padding-bottom: 20px;
`;

const MenuHeaderContainer = styled.div`
  position: relative;
  height: ${HEADER_HEIGHT};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 19px 0;
`;

const HeaderContentContainer = styled.div`
  width: 100%;
  height: calc(100vh - ${HEADER_HEIGHT});
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding-bottom: 20px;

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
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
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

  const handleClickDownload = () => {
    history.push("/appDownload");
    handleDrawerClose();
  };

  return (
    <DesktopMenuDrawerContainer>
      <MenuHeaderContainer>
        <Link to={""}>
          <BrandLogo
            style={{ height: "27px" }}
            onClick={() => handleChangeGameType(GameTypeEnum.NONE)}
          />
        </Link>

        <MenuButtonContainer>
          <MenuButton width={"18px"} height={"18px"} />
        </MenuButtonContainer>
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
