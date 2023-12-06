import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useAccountStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import AccountHeaderContent from "./components/AccountHeaderContent";
import AnonymousHeaderContent from "./components/AnonymousHeaderContent";
import MenuButton from "./components/MenuButton";
import { HEADER_HEIGHT } from "@/theme/constants";
import HeaderGameTypes from "@/layouts/components/Header/components/HeaderGameTypeNavs";
import BrandLogo from "@/components/project/BrandLogo";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(180deg, #ffffff 0%, #dbe5ed 100%);
  height: ${HEADER_HEIGHT};
  width: 100%;
  z-index: 10;
`;

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 11px 10px 12.5px 15px;
  display: flex;
  align-items: center;
  justify-content: start;
  z-index: 2;
`;

const HeaderContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const Header = () => {
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;
  const { isLargeDesktopSize } = useRwd();
  const { handleChangeGameType } = useHomeGameContext();

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Link to={""}>
          <BrandLogo
            style={{ height: "27px" }}
            onClick={() => handleChangeGameType(GameTypeEnum.NONE)}
          />
        </Link>

        <HeaderContentContainer>
          {isLargeDesktopSize && <HeaderGameTypes />}

          {noLoginAccount ? <AnonymousHeaderContent /> : <AccountHeaderContent />}

          {!isLargeDesktopSize && <MenuButton />}
        </HeaderContentContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default React.memo(Header);
