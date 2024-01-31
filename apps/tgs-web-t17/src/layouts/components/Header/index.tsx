import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useAccountStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import AccountHeaderContent from "./components/AccountHeaderContent";
import AnonymousHeaderContent from "./components/AnonymousHeaderContent";
import ContactButton from "./components/ContactButton";
import MenuButton from "./components/MenuButton";
import {
  DESKTOP_DRAWER_WIDTH,
  DRAWER_SHRINK_WIDTH,
  DESKTOP_HEADER_HEIGHT,
  TABLET_DRAWER_WIDTH,
  MOBILE_HEADER_HEIGHT
} from "@/theme/constants";
import CurrentTime from "@/components/project/CurrentTime";
import { media } from "@/theme/breakpoints";
import BrandLogo from "@/components/project/BrandLogo";
import { theme } from "@/theme";
import OnlineUser from "@/pages/home/components/CardPrompt/components/OnlineUser";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.mainBackground};
  height: ${MOBILE_HEADER_HEIGHT};
  width: 100%;
  z-index: 10;

  ${media.sm} {
    height: ${DESKTOP_HEADER_HEIGHT};
  }
`;

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  z-index: 2;

  ${media.md} {
    flex-direction: column;
    padding: 0px 50px;
  }
`;

const HeaderTimeContainer = styled.div`
  background: ${({ theme }) => theme.darkGray};
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  height: 30px;
`;

const HeaderContentContainer = styled.div<{
  $isMenuOpen: boolean;
}>`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: ${({ $isMenuOpen }) => ($isMenuOpen ? "flex-end" : "space-between")};
  width: 100%;

  ${media.sm} {
    height: calc(100% - 30px);
  }
`;

type ContentWrapperProps = {
  $isOpen: boolean;
};

const SystemInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;
  const { isDesktopSize, isLargeDesktopSize, isExtraLargeDesktopSize } = useRwd();
  const { isMenuOpen } = useHeader();
  const { handleChangeGameType } = useHomeGameContext();

  return (
    <HeaderContainer>
      <HeaderWrapper>
        {isLargeDesktopSize &&
          <HeaderTimeContainer>
            <>
              <SystemInfoContainer>
                <CurrentTime />
              </SystemInfoContainer>
              <OnlineUser color={theme.white} />
            </>
          </HeaderTimeContainer>
        }

        <HeaderContentContainer $isMenuOpen={isMenuOpen}>
          {!isMenuOpen &&
            <Link to={""}>
              <BrandLogo
                style={{ height: isDesktopSize ? "48px" : "24px", marginLeft: isDesktopSize ? "126px" : "unset" }}
                onClick={() => handleChangeGameType(GameTypeEnum.NONE)}
              />
            </Link>
          }

          {noLoginAccount ? <AnonymousHeaderContent /> : <AccountHeaderContent />}

          {/* {!isDesktopSize && <ContactButton />} */}
        </HeaderContentContainer>
        {/* header最右側那顆選單按鈕 */}
        {!isLargeDesktopSize && <MenuButton />}
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default React.memo(Header);
