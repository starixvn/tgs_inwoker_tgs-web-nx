import React from "react";
import styled from "styled-components";
import Icon from "@/components/project/Icon";
import iconClose from "@/assets/t18/images/dialog/icon_close.svg";

const PopupHeaderContainer = styled.div`
  background: ${({ theme }) => theme.white};
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
        <Icon iconUrl={iconClose} width={"20px"} height={"20px"} />
      </IconContainer>
    </PopupHeaderContainer>
  );
};

export default PopupHeader;
