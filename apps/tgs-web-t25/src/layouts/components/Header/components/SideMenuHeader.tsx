import React from "react";
import styled from "styled-components";
import { Close as CloseIcon } from "@mui/icons-material";
import { useHeader } from "@tgs-web-nx/core/features";
import { useGeneralStore } from "@tgs-web-nx/core";
import MenuButton from "@/layouts/components/Header/components/MenuButton";

const SideMenuHeaderContainer = styled.div`
  background: ${({ theme }) => theme.gray30};
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
`;

const LogoImgContainer = styled.div`
  max-width: 100px;
  height: 27px;
  justify-self: start;
  padding: 0 10px;
  margin: auto;

  & > img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

const SideMenuHeader = () => {
  const {
    general: { brand },
  } = useGeneralStore();
  const { isMenuOpen, handleToggleMenu } = useHeader();

  return (
    <SideMenuHeaderContainer>
      <MenuButton width={"56px"} height={"56px"} />

      {isMenuOpen && (
        <LogoImgContainer>
          <img src={brand && brand.loadingUrl} alt={"logo"} />
        </LogoImgContainer>
      )}
    </SideMenuHeaderContainer>
  );
};

export default SideMenuHeader;
