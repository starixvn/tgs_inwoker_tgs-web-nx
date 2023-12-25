import React from "react";
import styled from "styled-components";
import { Close } from "@mui/icons-material";
import { media } from "@/theme/breakpoints";
import iconCloseWhite from "@/assets/t32/images/dialog/icon-close-white.svg";
import Icon from "@/components/project/Icon";

const CloseIconContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 22px;
  width: 24px;
  transform: translateY(-50%) !important;
  height: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
`;

type Props = {
  onClick: () => void;
  style?: React.CSSProperties;
};
const CloseIcon = ({ onClick, style, ...others }: Props) => {
  return (
    <CloseIconContainer style={style} {...others}>
      <Icon onClick={onClick} iconUrl={iconCloseWhite} width={"24px"} height={"24px"} />
    </CloseIconContainer>
  );
};

export default CloseIcon;
