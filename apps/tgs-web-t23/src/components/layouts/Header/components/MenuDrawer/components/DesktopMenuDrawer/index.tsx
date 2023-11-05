import iconPromotion from "@/assets/t23/images/account/navItem/icon-promotions.svg";
import MenuButton from "@/components/layouts/Header/components/MenuButton";
import Icon from "@/components/project/Icon";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import { useHeader } from "@/core/feature/useHeader";
import { useGeneralStore } from "@/core/stores/useGeneralStore";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { HEADER_HEIGHT } from "@/theme/constants";
import i18n from "@/utils/i18n";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import MenuGameTypeList from "@/components/layouts/Header/components/MenuDrawer/components/DesktopMenuDrawer/components/MenuGameTypeList";

const MobileMenuDrawerContainer = styled.div`
  background: ${({ theme }) => theme.mainDarkBackground};
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  padding-bottom: 20px;
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
  //padding: 20px 30px;
`;

const DrawerCard = styled.div`
  cursor: pointer;
  width: 250px;
  margin: 0 auto 8px;
  background: ${({ theme }) => theme.mainLightBackground};
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
    <MobileMenuDrawerContainer>
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

        <DrawerCard onClick={handleClickPromotion}>
          <Icon className={"icon"} iconUrl={iconPromotion} width={"31px"} height={"31px"} />
          {i18n.t("common.promotion")}
        </DrawerCard>

        <LanguageSwitch style={{ width: "250px", margin: "0 auto 20px" }} />
      </HeaderContentContainer>
    </MobileMenuDrawerContainer>
  );
};

export default DesktopMenuDrawer;
