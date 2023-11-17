import React from "react";
import styled from "styled-components";
import { Close as CloseIcon } from "@mui/icons-material";
import { useHeader } from "@tgs-web-nx/core/features";

const SideMenuHeaderContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: visible;
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 0;
  right: 100%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme["515c"]};
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
            width: "20px",
            height: "20px",
          }}
        />
      </CloseIconContainer>
    </SideMenuHeaderContainer>
  );
};

export default SideMenuHeader;
