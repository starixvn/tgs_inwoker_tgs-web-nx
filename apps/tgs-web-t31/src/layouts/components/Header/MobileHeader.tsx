import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useAccountStore } from "@tgs-web-nx/core";
import { useAuth, useHomeGameContext } from "@tgs-web-nx/core/features";

import MenuButton from "./components/MenuButton";
import { HEADER_HEIGHT } from "@/theme/constants";
import userAvatar from "@/assets/t31/images/header/contextMenu/Member.png";
import logOutIcon from "@/assets/t31/images/header/contextMenu/Log out.png";
import MenuLanguageSwitch from "@/components/project/LanguageSwitch/index";
import BrandLogo from "@/components/project/BrandLogo";

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
  justify-content: space-between;
  z-index: 2;
`;

const HeaderContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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
  const history = useHistory();
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;
  const { handleChangeGameType } = useHomeGameContext();
  const { handleLogout } = useAuth();

  const toggleLogin = useCallback(() => {
    history.push("/login");
  }, []);

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <MenuButton width="40px" height="40px" />
        <Link to={""}>
          <BrandLogo
            style={{ height: "27px" }}
            onClick={() => handleChangeGameType(GameTypeEnum.NONE)}
          />
        </Link>
        <HeaderContentContainer>
          <UserAvatar src={userAvatar} onClick={toggleLogin} />
          <MenuLanguageSwitch />
          {!noLoginAccount && (
            <LogOut src={logOutIcon} alt={"log out"} onClick={() => handleLogout()} />
          )}
        </HeaderContentContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default React.memo(Header);
