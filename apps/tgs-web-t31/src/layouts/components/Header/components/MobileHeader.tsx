import React, { useCallback } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useAuth, useAuthContext, useHomeGameContext } from "@tgs-web-nx/core/features";
import MenuButton from "./MenuButton";
import { MOBILE_HEADER_HEIGHT } from "@/theme/constants";
import BrandLogo from "@/components/project/BrandLogo";
import userAvatar from "@/assets/t31/images/header/contextMenu/Member.png";
import MenuLanguageSwitch from "@/components/project/LanguageSwitch/MenuLanguageSwitch";
import logOutIcon from "@/assets/t31/images/header/contextMenu/Log out.png";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.accountLableText};
  height: ${MOBILE_HEADER_HEIGHT};
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
const MobileHeader = () => {
  const history = useHistory();
  const { isLogin } = useAuth();
  const { handleChangeGameType } = useHomeGameContext();

  const handleClickAvatar = useCallback(() => {
    if (isLogin) {
      console.log("fiasd")
      //todo: profile page
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { handleLogout } = useAuthContext();

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
          <UserAvatar src={userAvatar} onClick={handleClickAvatar} />
          <MenuLanguageSwitch />
          {isLogin && <LogOut src={logOutIcon} alt={"logout"} onClick={() => handleLogout()} />}
        </HeaderContentContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default React.memo(MobileHeader);
