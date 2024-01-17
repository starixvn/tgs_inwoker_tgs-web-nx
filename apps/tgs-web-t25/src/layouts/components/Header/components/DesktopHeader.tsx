import React, { HTMLProps } from "react";
import styled from "styled-components";
import { useAccountStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import { Link } from "react-router-dom";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import AccountHeaderContent from "./AccountHeaderContent";
import AnonymousHeaderContent from "./AnonymousHeaderContent";
import { DESKTOP_HEADER_HEIGHT, MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import OnlineUser from "@/pages/home/components/CardPrompt/components/OnlineUser";
import SystemTime from "@/layouts/components/Header/components/SystemTime";
import { theme } from "@/theme";
import BrandLogo from "@/components/project/BrandLogo";

type HeaderContainerProps = {
  $isOpen: boolean;
};

const HeaderContainer = styled.div<HeaderContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.black03};
  height: ${DESKTOP_HEADER_HEIGHT};
  width: 100%;
  z-index: 10;
  transition: all ease-in-out 0.2s;
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  max-width: ${MAIN_CONTENT_MAX_WIDTH};
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  transition: all ease-in-out 0.2s;

}
`;

const ContentGroup = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImgContainer = styled.div`
  max-width: 100px;
  height: 27px;
  justify-self: start;
  padding: 0 10px;
  margin: auto;
  margin-right: 20px;
  cursor: pointer;

  & > img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

const DesktopHeader = ({
  hideBrandLogo,
  ...props
}: HTMLProps<HTMLDivElement> & {
  hideBrandLogo?: boolean;
}) => {
  const { account } = useAccountStore();
  const { handleChangeGameType } = useHomeGameContext();

  const noLoginAccount = account.token !== account.info.token;
  const { isExtraLargeDesktopSize } = useRwd();
  const { isMenuOpen } = useHeader();

  return (
    // @ts-ignore
    <HeaderContainer {...props} $isOpen={isMenuOpen}>
      <ContentWrapper>
        <ContentGroup>
          {!hideBrandLogo && (
            <Link to={""}>
              <BrandLogo
                style={{ height: "27px" }}
                onClick={() => handleChangeGameType(GameTypeEnum.NONE)}
              />
            </Link>
          )}

          {isExtraLargeDesktopSize && <SystemTime style={{ marginLeft: "20px" }} />}
          {isExtraLargeDesktopSize && <OnlineUser color={theme.white} />}
        </ContentGroup>

        <ContentGroup>
          {noLoginAccount ? <AnonymousHeaderContent /> : <AccountHeaderContent />}
        </ContentGroup>
      </ContentWrapper>
    </HeaderContainer>
  );
};

export default React.memo(DesktopHeader);
