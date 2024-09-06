import React from "react";
import styled from "styled-components";

const CloseIconContainer = styled.div`
  position: absolute;
  top: 22px;
  right: 24px;
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
    <CloseIconContainer style={style} {...others} onClick={onClick}>
      <img src="/assets/images/common/icon-close.svg" width="32" height="32" alt="Close" />
    </CloseIconContainer>
  );
};

export default CloseIcon;
