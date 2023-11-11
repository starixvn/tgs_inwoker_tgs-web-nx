import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useAccountStore, useGeneralStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import AccountHeaderContent from "./components/AccountHeaderContent";
import AnonymousHeaderContent from "./components/AnonymousHeaderContent";
import ContactButton from "./components/ContactButton";
import MenuButton from "./components/MenuButton";
import { HEADER_HEIGHT } from "@/theme/constants";

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

const Header = () => {
  const { general } = useGeneralStore();
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;
  const { isDesktopSize, isLargeDesktopSize } = useRwd();
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
