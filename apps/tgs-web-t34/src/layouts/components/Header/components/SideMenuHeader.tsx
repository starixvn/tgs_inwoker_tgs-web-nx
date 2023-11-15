import React from "react";
import styled from "styled-components";
import { Close as CloseIcon } from "@mui/icons-material";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useAuth, useHeader } from "@tgs-web-nx/core/features";
import headerBg from "@/assets/t23/images/header/side-menu-bg.png";
import Avatar from "@/components/project/Avatar";
import BrandLogo from "@/components/project/BrandLogo";

const SideMenuHeaderContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 44px;
  background: ${({ theme }) => theme.black};
  display: flex;
  align-items: center;
  gap: 23.5px;
`;

const CloseIconContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SideMenuHeader = () => {
  const { handleToggleMenu } = useHeader();

  return (
    <SideMenuHeaderContainer>
      <CloseIconContainer onClick={() => handleToggleMenu(false)}>
        <CloseIcon
          style={{
            color: "white",
          }}
        />
      </CloseIconContainer>
      <BrandLogo style={{ height: "28px", margin: 0 }} />
    </SideMenuHeaderContainer>
  );
};

export default SideMenuHeader;
