import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAccountStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import AccountHeaderContent from "./components/AccountHeaderContent";
import AnonymousHeaderContent from "./components/AnonymousHeaderContent";
import { HEADER_HEIGHT } from "@/theme/constants";
import MenuButton from "@/layouts/components/Header/components/MenuButton";
import BrandLogo from "@/components/project/BrandLogo";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.mainBackground};
  height: ${HEADER_HEIGHT};
  width: 100%;
  z-index: 1301;
  border-bottom: 1px solid ${({ theme }) => theme.gray80};
`;

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 16px 12px;
  display: flex;
  gap: 20px;
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
  const { isDesktopSize } = useRwd();
  const { handleChangeGameType } = useHomeGameContext();

  return (
    <HeaderContainer>
      <HeaderWrapper>
        {isDesktopSize && <MenuButton />}

        <Link to={"/"}>
          <BrandLogo
            style={{ height: "27px" }}
            onClick={() => handleChangeGameType(GameTypeEnum.NONE)}
          />
        </Link>

        <HeaderContentContainer>
          {noLoginAccount ? <AnonymousHeaderContent /> : <AccountHeaderContent />}
        </HeaderContentContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default React.memo(Header);
