import React from "react";
import styled from "styled-components";
import Icon from "@/components/project/Icon";
import iconClose from "@/assets/t31/images/account/Close.png";
import titleImg from "@/assets/t31/images/dialog/notice_header.svg";

const PopupHeaderContainer = styled.div`
  /* background: ${({ theme }) => theme.neutralBlack}; */
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

const HeaderTitle = styled.div`
  width: 295px;
  height: 60px;
  display: flex !important;
  justify-content: center;
  align-items: center;
  background: url(${titleImg}) no-repeat;
  background-size: contain;
  background-position: center;
  white-space: nowrap;
  font-size: 0.812rem;
  color: ${({ theme }) => theme.white};
  padding: 10px 24px;
  border-radius: 4px;
  display: inline-block;
  line-height: 25px;
`;

type Props = {
  title: string;
  handleClose: () => void;
};
const PopupHeader = ({ title, handleClose }: Props) => {
  return (
    <PopupHeaderContainer>
      <HeaderTitle>{title.toLocaleUpperCase()}</HeaderTitle>

      <IconContainer onClick={handleClose}>
        <Icon iconUrl={iconClose} width={"20px"} height={"20px"} />
      </IconContainer>
    </PopupHeaderContainer>
  );
};

export default PopupHeader;
