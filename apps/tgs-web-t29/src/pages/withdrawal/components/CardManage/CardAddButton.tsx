import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";

const CardAddButtonContainer = styled.div`
  margin-left: auto;
  background: ${({ theme }) => theme.blue40};
  color: ${({ theme }) => theme.white};
  padding: 13px;
  cursor: pointer;
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
