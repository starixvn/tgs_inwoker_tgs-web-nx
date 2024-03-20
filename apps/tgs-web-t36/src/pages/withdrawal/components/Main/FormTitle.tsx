import React from "react";
import styled from "styled-components";
import Icon from "@/components/project/Icon";
import CardAddButton from "@/pages/withdrawal/components/CardManage/CardAddButton";

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  height: 46px;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.white};
`;

type Props = {
  title: string;
  isShowAddCardButton?: boolean;
  handleClickAddCard?: () => void;
};
const FormTitle = ({ title, isShowAddCardButton, handleClickAddCard }: Props) => {
  return (
    <TitleWrapper>
      {/* <Icon iconUrl={iconArrow} width={"16px"} height={"16px"} /> */}
      <Title>{title}</Title>

      {isShowAddCardButton && handleClickAddCard && (
        <CardAddButton handleClick={handleClickAddCard} />
      )}
    </TitleWrapper>
  );
};

export default FormTitle;
