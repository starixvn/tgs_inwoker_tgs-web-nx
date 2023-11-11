import React from "react";
import styled from "styled-components";
import { Close as CloseIcon } from "@mui/icons-material";
import { useGeneralStore } from "@tgs-web-nx/core";
import headerBg from "@/assets/t23/images/header/side-menu-bg.png";
import Avatar from "@/components/project/Avatar";
import { useHeader } from "@/core/feature/useHeader";
import { useAuth } from "@/core/feature/useAuth";

const SideMenuHeaderContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 219px;
  background-image: url(${headerBg});
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogoImg = styled.img`
  margin: 0 auto;
  display: block;
  width: 174px;
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SideMenuHeader = () => {
  const {
    general: { brand },
  } = useGeneralStore();
  const { isLogin } = useAuth();
  const { handleToggleMenu } = useHeader();

  return (
    <SideMenuHeaderContainer>
      <CloseIconContainer onClick={() => handleToggleMenu(false)}>
        <CloseIcon
          style={{
            color: "white",
            transform: "scale(1.6)",
          }}
        />
      </CloseIconContainer>

      {isLogin ? <Avatar /> : <LogoImg src={brand && brand.loadingUrl} />}
    </SideMenuHeaderContainer>
  );
};

export default SideMenuHeader;
