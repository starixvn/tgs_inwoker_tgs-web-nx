import React from "react";
import styled from "styled-components";
import { Close } from "@mui/icons-material";
import { media } from "@/theme/breakpoints";

const CloseIconContainer = styled.div`
  position: absolute;
  right: 40.316px;
  top: 40px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;

  ${media.sm} {
    width: 24px;
    height: 24px;
    transform: scale(1.5);
    border-radius: 36px;
  }
`;

type Props = {
  onClick: () => void;
  style?: React.CSSProperties;
};
const CloseIcon = ({ onClick, style, ...others }: Props) => {
  return (
    <CloseIconContainer style={style} {...others}>
      <Close
        onClick={onClick}
        style={{
          color: "#8C8998",
        }}
      />
    </CloseIconContainer>
  );
};

export default CloseIcon;
