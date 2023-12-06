import React from "react";
import styled from "styled-components";
import { Close } from "@mui/icons-material";

const CloseIconContainer = styled.div`
  position: absolute;
  top: 12.5px;
  right: 12.5px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.primary};
  cursor: pointer;
  z-index: 3;
`;

type Props = {
  onClick: () => void;
};
const CloseIcon = ({ onClick, ...others }: Props) => {
  return (
    <CloseIconContainer {...others}>
      <Close
        onClick={onClick}
        style={{
          color: "white",
        }}
      />
    </CloseIconContainer>
  );
};

export default CloseIcon;
