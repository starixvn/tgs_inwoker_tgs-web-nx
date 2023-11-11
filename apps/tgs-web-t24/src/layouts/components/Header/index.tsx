import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAccountStore, useGeneralStore } from "@tgs-web-nx/core";
import AccountHeaderContent from "./components/AccountHeaderContent";
import AnonymousHeaderContent from "./components/AnonymousHeaderContent";
import { HEADER_HEIGHT } from "@/theme/constants";
import MenuButton from "@/layouts/components/Header/components/MenuButton";
import { useRwd } from "@/core/hooks/tools/useRwd";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.mainBackground};
  height: ${HEADER_HEIGHT};
  width: 100%;
  z-index: 10;
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
`;

const Header = () => {
  const {
    general: { brand },
  } = useGeneralStore();
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;
  const { isDesktopSize } = useRwd();

  return (
    <HeaderContainer>
      <HeaderWrapper>
        {isDesktopSize && <MenuButton />}

        <Link to={"/"}>
          <LogoImgContainer>
            <img src={brand && brand.loadingUrl} alt={"logo"} />
          </LogoImgContainer>
        </Link>

        <HeaderContentContainer>
          {noLoginAccount ? <AnonymousHeaderContent /> : <AccountHeaderContent />}
        </HeaderContentContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default React.memo(Header);
