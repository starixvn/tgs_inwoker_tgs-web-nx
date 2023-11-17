import React from "react";
import styled from "styled-components";
import Icon from "@/components/project/Icon";
import iconClose from "@/assets/t34/images/dialog/close.svg";

const PopupHeaderContainer = styled.div`
  background: ${({ theme }) => theme.black};
  position: relative;
  height: 63px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 24px;
  cursor: pointer;
`;

type Props = {
  title: string;
  handleClose: () => void;
};
const PopupHeader = ({ title, handleClose }: Props) => {
  return (
    <PopupHeaderContainer>
      {title}
      <IconContainer onClick={handleClose}>
        <Icon iconUrl={iconClose} width={"24px"} height={"24px"} />
      </IconContainer>
    </PopupHeaderContainer>
  );
};

export default PopupHeader;
