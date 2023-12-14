import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import AddCardIcon from "@/assets/t23/images/withdraw/icon-plus.svg";
import { media } from "@/theme/breakpoints";

const CardContainer = styled.div`
  width: 100%;
  padding: 13px 20px;
  background: ${({ theme }) => theme.mainLightBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  border-radius: 30px;
  cursor: pointer;

  ${media.sm} {
    background: ${({ theme }) => theme.mainBackground};
    width: calc((100% - 14px * 1) / 2);
  }
`;

const EmptyCardTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16.5px;
`;

type Props = {
  handleClick: () => void;
};
const CardAddCard = ({ handleClick }: Props) => {
  return (
    <CardContainer onClick={handleClick}>
      <Wrapper>
        <IconContainer>
          <img src={AddCardIcon} alt={"addCard"} />
        </IconContainer>
        <EmptyCardTitle>{i18n.t("card.msgAddCard")}</EmptyCardTitle>
      </Wrapper>

      {/*<EmptyCardDesc>{i18n.t("card.msgAddCardDesc")}</EmptyCardDesc>*/}
    </CardContainer>
  );
};

export default CardAddCard;
