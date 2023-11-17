import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import AddCardIcon from "@/assets/t33/images/card/add-card.svg";

const CardContainer = styled.div`
  padding: 13px 20px;
  background: ${({ theme }) => theme.gray40};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  border-radius: 5px;
  cursor: pointer;
`;

const EmptyCardTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.white};
`;

const EmptyCardDesc = styled.div`
  font-size: 0.937rem;
  color: ${({ theme }) => theme.white};
`;

const IconContainer = styled.div`
  width: 38px;
  height: 38px;

  & > img {
    width: 100%;
    object-fit: cover;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
`;

type Props = {
  handleClick: () => void;
};
const AddCardsButton = ({ handleClick }: Props) => {
  return (
    <CardContainer onClick={handleClick}>
      <Wrapper>
        <IconContainer>
          <img src={AddCardIcon} alt={"addCard"} />
        </IconContainer>
        <EmptyCardTitle>{i18n.t("card.msgAddCard")}</EmptyCardTitle>
      </Wrapper>

      <EmptyCardDesc>{i18n.t("card.msgAddCardDesc")}</EmptyCardDesc>
    </CardContainer>
  );
};

export default AddCardsButton;
