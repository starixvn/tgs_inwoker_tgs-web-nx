import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useAccountStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import AnonymousHeaderContent from "./AnonymousHeaderContent";
import {
  DESKTOP_HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
  SUB_CONTENT_MAX_WIDTH,
} from "@/theme/constants";
import HeaderGameTypes from "@/layouts/components/Header/components/HeaderGameTypeNavs";
import { media } from "@/theme/breakpoints";
import SystemTime from "@/layouts/components/Header/components/SystemTime";
import BrandLogo from "@/components/project/BrandLogo";
import DesktopAccountHeaderContent from "@/layouts/components/Header/components/DesktopAccountHeaderContent";
import GameTypeNavPopup from "@/layouts/components/Header/components/GameTypeNavPopup";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.white};
  height: ${MOBILE_HEADER_HEIGHT};
  width: 100%;
  z-index: 10;

  ${media.sm} {
    height: ${DESKTOP_HEADER_HEIGHT};
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  max-width: ${SUB_CONTENT_MAX_WIDTH};
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

const ContentGroup = styled.div`
  display: flex;
  align-items: center;
`;

const TopHeaderRowContainer = styled.div`
  background: ${({ theme }) => theme.footerBGC};
  background-size: cover;
  height: 48px;
`;

const BottomHeaderRowContainer = styled.div`
  margin: auto;
  height: 69px;
  background: ${({ theme }) => theme.primary};
`;

const DesktopHeader = () => {
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;
  const { isLargeDesktopSize, isDesktopSize } = useRwd();
  const { handleChangeGameType, activeNavPopupGameType } = useHomeGameContext();
  const { navPopupCategoryList } = useGetLobbyCategoryList();
  const hasNavData = !!navPopupCategoryList.length;
  return (
    <HeaderContainer>
      <TopHeaderRowContainer>
        <ContentWrapper>
          <ContentGroup>
            {isLargeDesktopSize && <SystemTime />}
            {/*{isLargeDesktopSize && <OnlineUser color={theme.white} />}*/}
          </ContentGroup>

          <ContentGroup>
            {noLoginAccount ? <AnonymousHeaderContent /> : <DesktopAccountHeaderContent />}
          </ContentGroup>
        </ContentWrapper>
      </TopHeaderRowContainer>

      <BottomHeaderRowContainer>
        <ContentWrapper>
          <Link to={""}>
            <BrandLogo
              style={{ height: "27px" }}
              onClick={() => handleChangeGameType(GameTypeEnum.NONE)}
            />
          </Link>

          {isDesktopSize && <HeaderGameTypes />}
        </ContentWrapper>
      </BottomHeaderRowContainer>

      {!!activeNavPopupGameType && hasNavData && <GameTypeNavPopup />}
    </HeaderContainer>
  );
};

export default React.memo(DesktopHeader);
