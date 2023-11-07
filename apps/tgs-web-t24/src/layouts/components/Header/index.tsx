import { useAccountStore } from "@/core/stores/useAccountStore";
import { useGeneralStore } from "@/core/stores/useGeneralStore";
import { HEADER_HEIGHT } from "@/theme/constants";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AccountHeaderContent from "./components/AccountHeaderContent";
import AnonymousHeaderContent from "./components/AnonymousHeaderContent";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.mainBackground};
  height: ${HEADER_HEIGHT};
  width: 100%;
  z-index: 10;
`;

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 13.49px 16px;
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
`;

type Props = {};
const Header = (props: Props) => {
  const { general } = useGeneralStore();
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Link to={"/"}>
          <LogoImgContainer>
            <img src={general.brand && general.brand.loadingUrl} alt={"logo"} />
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
