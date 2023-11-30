import React from "react";
import styled from "styled-components";
import { Close as CloseIcon } from "@mui/icons-material";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useHeader } from "@tgs-web-nx/core/features";

const SideMenuHeaderContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.sideMenu};
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
  const { handleToggleMenu } = useHeader();

  return (
    <SideMenuHeaderContainer>
      <CloseIconContainer onClick={() => handleToggleMenu(false)}>
        <CloseIcon
          style={{
            color: "white",
            transform: "scale(1.6)",
            width: "20px",
            height: "20px",
          }}
        />
      </CloseIconContainer>
    </SideMenuHeaderContainer>
  );
};

export default SideMenuHeader;
