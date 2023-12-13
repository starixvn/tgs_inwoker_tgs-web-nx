import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import iconPlus from "@/assets/t34/images/withdraw/icon-plus.svg";
import Icon from "@/components/project/Icon";

const CardAddButtonContainer = styled.div`
  margin-left: auto;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.white};
  padding: 12px 37.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

type Props = {
  handleClick: () => void;
};

const CardAddButton = ({ handleClick }: Props) => {
  return (
    <CardAddButtonContainer onClick={handleClick}>
      {i18n.t("card.msgAddCard")}
    </CardAddButtonContainer>
  );
};

export default CardAddButton;
