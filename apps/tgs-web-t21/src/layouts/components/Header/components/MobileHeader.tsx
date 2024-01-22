import React, { useCallback } from "react";
import styled from "styled-components";
import { useAccountStore } from "@tgs-web-nx/core";
import { useGoToHomePage } from "@tgs-web-nx/core/hooks";
import { useHistory } from "react-router";
import { DESKTOP_HEADER_HEIGHT, MOBILE_HEADER_HEIGHT } from "@/theme/constants";
import { media } from "@/theme/breakpoints";
import BrandLogo from "@/components/project/BrandLogo";
import MenuButton from "@/layouts/components/Header/components/MenuButton";
import Icon from "@/components/project/Icon";
import downloadImg from "@/assets/t21/images/header/icon-download.svg";
import messageImg from "@/assets/t21/images/header/icon-message.svg";

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

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: start;
  z-index: 2;
  flex-shrink: 1;
`;

const HeaderContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
`;

const MobileHeader = () => {
  const { account } = useAccountStore();
  const noLoginAccount = account.token !== account.info.token;
  const goToHomePage = useGoToHomePage();
  const history = useHistory();

  const goToInbox = useCallback(() => {
    history.push("/inbox");
  }, []);

  const goToDownload = useCallback(() => {
    history.push("/appDownload");
  }, []);

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <MenuButton />

        <BrandLogo
          style={{
            height: "27px",
            cursor: "pointer",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          onClick={() => goToHomePage()}
        />

        <HeaderContentContainer>
          <Icon
            iconUrl={downloadImg}
            width={"30px"}
            height={"30px"}
            style={{
              cursor: "pointer",
            }}
            onClick={() => goToDownload()}
          />
          <Icon
            iconUrl={messageImg}
            width={"30px"}
            height={"30px"}
            style={{
              cursor: "pointer",
            }}
            onClick={() => goToInbox()}
          />
        </HeaderContentContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default React.memo(MobileHeader);
