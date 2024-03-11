import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import iconPlus from "@/assets/t31/images/withdraw/icon-plus.svg";
import Icon from "@/components/project/Icon";
import { media } from "@/theme/breakpoints";

const CardAddButtonContainer = styled.div`
  width: calc((100% - 30px * 1) / 3);
  min-height: 143px;
  border-radius: 4px;
  padding: 16px;
  background: ${({ theme }) => theme.black60};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0em;
  color: ${({ theme }) => theme.text};
`;

type Props = {
  handleClick: () => void;
};

const CardAddButton = ({ handleClick }: Props) => {
  return (
    <CardAddButtonContainer onClick={handleClick}>
      <Icon iconUrl={iconPlus} width={"40px"} height={"40px"} />
      <Text>{i18n.t("card.msgAddCard")}</Text>
    </CardAddButtonContainer>
  );
};

export default CardAddButton;
