import React from "react";
import styled from "styled-components";
import { Close as CloseIcon } from "@mui/icons-material";
import { useAuth, useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useGeneralStore } from "@tgs-web-nx/core";
import Avatar from "@/components/project/Avatar";
import HomeIcon from "./HomeIcon";
import { GameTypeEnum } from "@tgs-web-nx/constants";

const SideMenuHeaderContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 66px;
`;

const CloseIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 54px;
`;

const HomeBtn = styled.div`
  width: 97px;
  display: flex;
  padding: 10px 14px;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  background: ${({ theme }) => theme.g7};
`;

const Text = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 13.6px;
  font-weight: 400;
`;

const SideMenuHeader = () => {
  const {
    general: { brand },
  } = useGeneralStore();
  const { isLogin } = useAuth();
  const { handleToggleMenu } = useHeader();
  const { setIsEnterGamePortal } = useHomeGameContext();

  const handleEnterGamePortal = () => {
    setIsEnterGamePortal(true);
    handleToggleMenu();
  }

  return (
    <SideMenuHeaderContainer>
      {/* <LogoImg src={brand && brand.loadingUrl} /> */}
      {/* <Wrapper>
        <CloseIconContainer onClick={() => handleToggleMenu(false)}>
          <CloseIcon
            style={{
              color: "#67707B",
              width: "20px",
              height: "20px",
            }}
          />
        </CloseIconContainer>
      </Wrapper> */}
      {/* {isLogin ? <Avatar /> : <LogoImg src={brand && brand.loadingUrl} />} */}
    </SideMenuHeaderContainer>
  );
};

export default SideMenuHeader;
