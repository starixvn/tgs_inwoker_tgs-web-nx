import SystemTime from "@/layouts/components/Header/components/SystemTime";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";
import { DESKTOP_HEADER_HEIGHT, MOBILE_HEADER_HEIGHT } from "@/theme/constants";
import { useAccountStore, useGeneralStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import AccountHeaderContent from "./AccountHeaderContent";
import AnonymousHeaderContent from "./AnonymousHeaderContent";
import MenuButton from "./MenuButton";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.NavBGC};
  height: ${MOBILE_HEADER_HEIGHT};
  width: 100%;
  z-index: 10;

  ${media.sm} {
    height: ${DESKTOP_HEADER_HEIGHT};
    padding: 4px 12px;
  }
`;

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
`;

const MenuButonnWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
`;

const LogoWrapper = styled.div`
  & > img {
    display: block;
    height: 2.9rem;
    cursor: pointer;
  }
`;

const HeaderContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const DesktopHeader = () => {
  const { account } = useAccountStore();
  const {
    general: { brand },
  } = useGeneralStore();
  const history = useHistory();
  const noLoginAccount = account.token !== account.info.token;
  const { isLargeDesktopSize, isDesktopSize } = useRwd();
  // Todo
  // using asset site
  // const logoUrl = brand.loadingUrl;
  const logoUrl = "/assets/images/common/logo.svg";
  if (!logoUrl) return null;
  return (
    <HeaderContainer>
      <HeaderWrapper>
        {isDesktopSize ? (
          <MenuButonnWrapper>
            <MenuButton />
            <LogoWrapper>
              <img
                src={logoUrl}
                alt={"logo"}
                width={45}
                height={29}
                onClick={() => {
                  history.push("/");
                }}
              />
              <SystemTime />
            </LogoWrapper>
          </MenuButonnWrapper>
        ) : (
          <LogoWrapper>
            <img
              src={logoUrl}
              alt={"logo"}
              width={45}
              height={29}
              onClick={() => {
                history.push("/");
              }}
            />
          </LogoWrapper>
        )}
        <HeaderContentContainer>
          {noLoginAccount ? <AnonymousHeaderContent /> : <AccountHeaderContent />}
        </HeaderContentContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default React.memo(DesktopHeader);
