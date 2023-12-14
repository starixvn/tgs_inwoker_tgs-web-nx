import React, { HTMLProps } from "react";
import styled from "styled-components";
import { useJackpot } from "@tgs-web-nx/core/features";

const JackpotContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: visible;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const JackpotContent = styled.div`
  z-index: 2;
  position: absolute;
  bottom: 63px;
`;

const Amount = styled.div`
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 3.2px;
  color: ${({ theme }) => theme.primary};
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
        <Amount>₱{formatAmount(jackpotAmount, "vi-VN")}</Amount>
      </JackpotContent>
    </JackpotContainer>
  );
};

export default Jackpot;
