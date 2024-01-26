import React from "react";
import styled from "styled-components";
import Icon from "@/components/project/Icon";
import iconArrow from "@/assets/t18/images/withdraw/icon-arrow.svg";
import CardAddButton from "@/pages/withdrawal/components/CardManage/CardAddButton";

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 16px;
  height: 46px;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 1.5rem;
  font-weight: 700;
`;

type Props = {
  title: string;
  isCustomizedBrand?: boolean;
  isShowAddCardButton?: boolean;
  handleClickAddCard?: () => void;
};
const FormTitle = ({
  title,
  isCustomizedBrand,
  isShowAddCardButton,
  handleClickAddCard,
}: Props) => {
  return (
    <TitleWrapper>
      {/*<Icon iconUrl={iconArrow} width={"16px"} height={"16px"} />*/}
      <Title>{title}</Title>

      {/*{!isCustomizedBrand && isShowAddCardButton && handleClickAddCard && (*/}
      {/*  <CardAddButton handleClick={handleClickAddCard} />*/}
      {/*)}*/}
    </TitleWrapper>
  );
};

export default FormTitle;
