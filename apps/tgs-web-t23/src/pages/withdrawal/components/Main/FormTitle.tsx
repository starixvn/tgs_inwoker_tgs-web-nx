import React from "react";
import styled from "styled-components";
import CardAddButton from "@/pages/withdrawal/components/CardManage/CardAddButton";
import { media } from "@/theme/breakpoints";

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  height: 46px;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.white};
  font-weight: 700;
  font-size: 1.125rem;

  ${media.sm} {
    color: ${({ theme }) => theme.primary};
  }
`;

type Props = {
  title: string;
  isShowAddCardButton?: boolean;
  handleClickAddCard?: () => void;
};
const FormTitle = ({ title, isShowAddCardButton, handleClickAddCard }: Props) => {
  return (
    <TitleWrapper>
      <Title>{title}</Title>

      {isShowAddCardButton && handleClickAddCard && (
        <CardAddButton handleClick={handleClickAddCard} />
      )}
    </TitleWrapper>
  );
};

export default FormTitle;
