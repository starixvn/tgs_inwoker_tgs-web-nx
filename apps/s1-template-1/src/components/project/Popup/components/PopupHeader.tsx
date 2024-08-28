import React from "react";
import styled from "styled-components";
import Icon from "@/components/project/Icon";
import iconClose from "@/assets/t28/images/dialog/icon-close.svg";

const PopupHeaderContainer = styled.div`
  background: ${({ theme }) => theme.secBTNBGC};
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
`;

type Props = {
  title: string;
  handleClose: () => void;
};
const PopupHeader = ({ title, handleClose }: Props) => {
  return (
    <PopupHeaderContainer>
      <IconContainer onClick={handleClose}>
        <Icon iconUrl={iconClose} width={"30px"} height={"30px"} />
      </IconContainer>
    </PopupHeaderContainer>
  );
};

export default PopupHeader;
