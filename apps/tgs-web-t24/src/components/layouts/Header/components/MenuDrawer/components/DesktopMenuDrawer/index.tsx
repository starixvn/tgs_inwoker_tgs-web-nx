import iconPromotion from "@/assets/t23/images/account/navItem/icon-promotions.svg";
import MenuButton from "@/components/layouts/Header/components/MenuButton";
import MenuGameTypeList from "@/components/layouts/Header/components/MenuDrawer/components/DesktopMenuDrawer/components/MenuGameTypeList";
import Icon from "@/components/project/Icon";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import { useHeader } from "@/core/feature/useHeader";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { useGeneralStore } from "@/core/stores/useGeneralStore";
import { HEADER_HEIGHT } from "@/theme/constants";
import i18n from "@/utils/i18n";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const DesktopMenuDrawerContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  padding-bottom: 20px;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    background: ${(props) => props.theme.gray90};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #53535375;
  }

  &::-webkit-scrollbar-track-piece {
    background: transparent;
  }
`;

const MenuHeaderContainer = styled.div`
  position: relative;
  height: ${HEADER_HEIGHT};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 19px 0;
`;

const MenuButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

const HeaderContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PromotionCard = styled.div`
  cursor: pointer;
  width: 250px;
  margin: 0 auto 8px;
  border-radius: 12px;
  padding: 12px 30px;
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 1.375rem;
  line-height: 1.611rem;
  font-weight: 700;

  & > .icon {
    margin-right: 10px;
  }
`;

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

type Props = {};
const DesktopMenuDrawer = (props: Props) => {
  const {
    general: { brand },
  } = useGeneralStore();
  const { handleToggleMenu } = useHeader();
  const history = useHistory();
  const { isDesktopSize } = useRwd();

  const handleDrawerClose = () => {
    if (isDesktopSize) return;
    handleToggleMenu(false);
  };

  const handleClickPromotion = () => {
    history.push("/promotion-list");
    handleDrawerClose();
  };

  return (
    <DesktopMenuDrawerContainer>
      <MenuHeaderContainer>
        <Link to={"/"}>
          <LogoImgContainer>
            <img src={brand && brand.loadingUrl} alt={"logo"} />
          </LogoImgContainer>
        </Link>

        <MenuButtonContainer>
          <MenuButton width={"18px"} height={"18px"} />
        </MenuButtonContainer>
      </MenuHeaderContainer>

      <HeaderContentContainer>
        <MenuGameTypeList />

        <PromotionCard onClick={handleClickPromotion}>
          <Icon className={"icon"} iconUrl={iconPromotion} width={"31px"} height={"31px"} />
          {i18n.t("common.promotion")}
        </PromotionCard>

        <LanguageSwitch style={{ width: "250px", margin: "0 auto 20px" }} />
      </HeaderContentContainer>
    </DesktopMenuDrawerContainer>
  );
};

export default DesktopMenuDrawer;
