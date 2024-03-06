import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import iconPlus from "@/assets/t19/images/withdraw/icon-plus.svg";
import Icon from "@/components/project/Icon";

const CardAddButtonContainer = styled.div`
  margin-left: auto;
  background: ${({ theme }) => theme.primaryGradient};
  color: ${({ theme }) => theme.pureBlack};
  padding: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  font-weight: 700;
`;

type Props = {
  handleClick: () => void;
};

const CardAddButton = ({ handleClick }: Props) => {
  return (
    <CardAddButtonContainer onClick={handleClick}>
      <Icon iconUrl={iconPlus} width={"20px"} height={"20px"} />
      {i18n.t("card.msgAddCard")}
    </CardAddButtonContainer>
  );
};

export default CardAddButton;
