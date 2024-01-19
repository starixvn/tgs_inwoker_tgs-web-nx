import React from "react";
import styled from "styled-components";
import Icon from "@/components/project/Icon";
import iconClose from "@/assets/t25/images/dialog/icon-close.svg";
import titleBG from "@/assets/t25/images/dialog/header-title.png";

const PopupHeaderContainer = styled.div`
  //background: ${({ theme }) => theme.white};
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

const Title = styled.div`
  height: 100%;
  min-width: 196px;
  background: url(${titleBG});
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
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

      <Title>{title}</Title>
    </PopupHeaderContainer>
  );
};

export default PopupHeader;
