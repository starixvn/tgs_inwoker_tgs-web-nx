import React from "react";
import styled from "styled-components";
import { Close } from "@mui/icons-material";

const CloseIconContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(141, 146, 151, 0.3);
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
