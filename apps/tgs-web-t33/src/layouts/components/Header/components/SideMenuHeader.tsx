import React from "react";
import styled from "styled-components";
import { Close as CloseIcon } from "@mui/icons-material";
import { useHeader } from "@tgs-web-nx/core/features";

const SideMenuHeaderContainer = styled.div`
  background: ${({ theme }) => theme.gray30};
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
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
            width: "20px",
            height: "20px",
          }}
        />
      </CloseIconContainer>
    </SideMenuHeaderContainer>
  );
};

export default SideMenuHeader;
