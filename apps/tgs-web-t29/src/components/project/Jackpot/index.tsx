import React, { HTMLProps } from "react";
import styled from "styled-components";
import { useJackpot } from "@tgs-web-nx/core/features";

const JackpotContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 11px 40px;
  overflow: visible;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: skewX(-30deg);
  background: linear-gradient(180deg, #c93131 0%, #a41616 100%);
  z-index: 1;
`;

const JackpotContent = styled.div`
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 35px;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;

const Amount = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  font-style: italic;
`;

type Props = HTMLProps<HTMLDivElement>;

const Jackpot = ({ ...others }: Props) => {
  const { jackpotAmount } = useJackpot();

  const formatAmount = (amount: number, locales = "en-US") => {
    return amount.toLocaleString(locales, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
      useGrouping: true,
    });
  };
  return (
    //@ts-ignore
    <JackpotContainer {...others}>
      <Background />

      <JackpotContent>
        <Title>Jackpot</Title>
        <Amount>{formatAmount(jackpotAmount, "vi-VN")}</Amount>
      </JackpotContent>
    </JackpotContainer>
  );
};

export default Jackpot;
