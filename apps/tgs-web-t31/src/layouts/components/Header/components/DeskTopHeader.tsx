import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useAccountStore, useGeneralStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";

// import AccountHeaderContent from "./components/AccountHeaderContent";
// import AnonymousHeaderContent from "./components/AnonymousHeaderContent";
// import ContactButton from "./components/ContactButton";
// import MenuButton from "./components/MenuButton";
import List from "./DesktopMenuDrawer/components/MenuGameTypeList";

import { HEADER_HEIGHT } from "@/theme/constants";
import announce from "@/assets/t31/images/header/Announce.png";
import { theme } from "@/theme";
import { HeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import MenuLanguageSwitch from "@/components/project/LanguageSwitch/MenuLanguageSwitch";
import CurrentTime from "@/components/project/CurrentTime";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.accountLableText};
  height: ${HEADER_HEIGHT};
  width: 100%;
  height: 120px;
  z-index: 10;
`;

const HeadContentContainer = styled.div`
  height: 48px;
  display: flex;
  justify-content: center;
`;

const HeadMenuContainer = styled(HeadContentContainer)`
  height: 69px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  padding: 0px 12px 0px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
`;

const LogoImgContainer = styled.div`
  gap: 10px;
  height: 69px;
  justify-self: start;
  padding: 0 10px;

  & > img {
    height: 100%;
  }
`;

const HeaderContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AnnounceIcon = styled.img`
  width: 18px;
  height: 18px;
`;

const SystemInfo = styled.div`
  display: flex;
  gap: 24px;
`;
const DeskTopHeader = () => {
  const { general } = useGeneralStore();
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;
  const { isDesktopSize, isLargeDesktopSize } = useRwd();
  const { handleChangeGameType } = useHomeGameContext();

  return (
    <HeaderContainer>
      <HeadContentContainer>
        <HeaderWrapper>
          <SystemInfo>
            <AnnounceIcon src={announce} />
            <CurrentTime />
          </SystemInfo>
          <HeaderContentContainer>
            <MenuLanguageSwitch />
            <HeaderButton
              // onClick={toggleLoginDialog}
              style={{
                background: theme.tertiaryGradient,
              }}
            >
              {i18n.t("common.login")}
            </HeaderButton>

            <HeaderButton
              color={"primary"}
              // onClick={toggleRegisterDialog}
              style={{
                background: theme.secondaryGradient,
              }}
            >
              {i18n.t("common.register")}
            </HeaderButton>
          </HeaderContentContainer>
        </HeaderWrapper>
      </HeadContentContainer>
      <HeadMenuContainer>
        <LogoImgContainer>
          <img
            src={general.brand && general.brand.loadingUrl}
            alt={"logo"}
            // onClick={() => handleChangeGameType(GameTypeEnum.NONE)}
          />
        </LogoImgContainer>
        <List />
      </HeadMenuContainer>
    </HeaderContainer>
  );
};

export default React.memo(DeskTopHeader);
