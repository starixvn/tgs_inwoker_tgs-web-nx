import React from "react";
import styled from "styled-components";
import { Close as CloseIcon } from "@mui/icons-material";
import { useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useGeneralStore } from "@tgs-web-nx/core";
import HomeIcon from "./HomeIcon";
import { theme } from "@/theme";

const SideMenuHeaderContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  const { handleToggleMenu } = useHeader();
  const { setIsEnterGamePortal } = useHomeGameContext();

  const handleEnterGamePortal = () => {
    setIsEnterGamePortal(true);
    handleToggleMenu();
  };

  return (
    <SideMenuHeaderContainer>
      <CloseIconContainer onClick={() => handleToggleMenu(false)}>
        <CloseIcon
          style={{
            color: theme.primary,
            width: "24px",
            height: "24px",
          }}
        />
      </CloseIconContainer>
      <LogoImg src={brand && brand.loadingUrl} />
      <Wrapper>
        <HomeBtn onClick={() => handleEnterGamePortal()}>
          <HomeIcon $color={"#fff"} />
          <Text>Home</Text>
        </HomeBtn>
      </Wrapper>
    </SideMenuHeaderContainer>
  );
};

export default SideMenuHeader;
