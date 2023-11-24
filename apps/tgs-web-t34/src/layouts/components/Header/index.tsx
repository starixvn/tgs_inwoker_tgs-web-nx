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
import { DESKTOP_HEADER_HEIGHT, HEADER_HEIGHT } from "@/theme/constants";
import { media } from "@/theme/breakpoints";
import HeaderGreyRegion from "@/layouts/components/Header/components/HeaderGreyRegion";
import HeaderRedRegion from "@/layouts/components/Header/components/HeaderRedRegion";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.black};
  height: ${HEADER_HEIGHT};
  width: 100%;
  z-index: 10;

  ${media.sm} {
    height: ${DESKTOP_HEADER_HEIGHT};
  }
`;

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  height: 100%;
  padding: 10px 17px;
  display: flex;
  align-items: center;
  justify-content: start;
  z-index: 2;

  ${media.sm} {
    height: 84px;
    padding: 0 10px;
  }
`;

const LogoImgContainer = styled.div`
  height: 27px;
  justify-self: start;
  padding: 0 10px;

  & > img {
    height: 100%;
  }

  ${media.tiny} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  ${media.sm} {
    position: relative;
    top: initial;
    left: initial;
    transform: none;
  }
`;

const HeaderContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const Header = () => {
  const { general } = useGeneralStore();
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;
  const { isDesktopSize } = useRwd();
  const { handleChangeGameType } = useHomeGameContext();

  return (
    <HeaderContainer>
      {isDesktopSize && <HeaderGreyRegion />}

      <HeaderWrapper>
        {!isDesktopSize && <MenuButton />}

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
      </HeaderWrapper>

      {isDesktopSize && <HeaderRedRegion />}
    </HeaderContainer>
  );
};

export default React.memo(Header);
