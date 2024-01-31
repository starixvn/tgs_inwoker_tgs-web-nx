import React, { HTMLProps } from "react";
import styled from "styled-components";
import { useJackpot } from "@tgs-web-nx/core/features";
import jackpoTitle from "@/assets/t17/images/home/jackpot-title.svg";
import { media } from "@/theme/breakpoints";

const JackpotContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: visible;
`;

const Amount = styled.div`
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 3.2px;
  color: ${({ theme }) => theme.white};
`;

const Image = styled.div`
  width: 100%;
  max-width: 216px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  ${media.sm} {
    max-width: 497px;
    margin-right: 72px;
  }
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
      <Image><img src={jackpoTitle} alt={"jackpot"} /></Image>
      <Amount>{formatAmount(jackpotAmount, "vi-VN")}</Amount>
    </JackpotContainer>
  );
};

export default Jackpot;
