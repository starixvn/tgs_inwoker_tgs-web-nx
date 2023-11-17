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
import userAvatar from "@/assets/t31/images/header/contextMenu/Member.png";
import logOutIcon from "@/assets/t31/images/header/contextMenu/Log out.png";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.accountLableText};
  height: ${HEADER_HEIGHT};
  width: 100%;
  z-index: 10;
`;

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0px 12px 0px 12px;
  display: flex;
  align-items: center;
  justify-content: start;
  z-index: 2;
`;

const LogoImgContainer = styled.div`
  height: 27px;
  /* justify-self: start; */
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
  gap:8px;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
`;

const LogOut = styled.img`
  width: 40px;
  height: 40px;
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
        {!isLargeDesktopSize && <MenuButton width="40px" height="40px" />}
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
          {isDesktopSize ? null : <UserAvatar src={userAvatar} />}

          {/* {noLoginAccount ? <AnonymousHeaderContent /> : <AccountHeaderContent />} */}
          {!noLoginAccount && <LogOut src={logOutIcon} alt={"log out"} />}
          {!isDesktopSize && <ContactButton />}
        </HeaderContentContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default React.memo(Header);
