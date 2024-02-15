import React, { HTMLProps } from "react";
import styled from "styled-components";
import { useJackpot } from "@tgs-web-nx/core/features";
import jackpotPic from "@/assets/t26/images/home/jackpotPic.png";

const JackPotContainer = styled.div`
  position: relative;
  width: 1300px;
  height: 250px;
  background-image: url(${jackpotPic});
  background-size: cover;
  background-repeat: no-repeat;
`;

const JackPotText = styled.div`
  position: absolute;
  top: 12%;
  left: 60%;
  font-size: 40px;
  font-weight: 700;
  line-height: 42px;
  letter-spacing: 0em;
  text-align: center;
`;

const AmountContainer = styled.div`
  position: absolute;
  width: 580px;
  top: 50%;
  left: 50%;
  margin-left: 5px;
  display: flex;
  justify-content: space-between;
`;

const AmountColumn = styled.div`
  font-size: 62px;
  font-weight: 400;
  line-height: 66px;
  width: 50px;
  display: flex;
  justify-content: center;
`;

type Props = HTMLProps<HTMLDivElement>;

const Jackpot = ({ ...others }: Props) => {
  const { jackpotAmount } = useJackpot();

  return (
    //@ts-ignore
    <JackPotContainer>
      <JackPotText>MEGA JACKPOT</JackPotText>
      <AmountContainer>
        {Array.from(jackpotAmount.toFixed(0).toString()).map((amount, index) => {
          return <AmountColumn key={index}>{amount}</AmountColumn>;
        })}
        <AmountColumn>{0}</AmountColumn>
        <AmountColumn>{0}</AmountColumn>
        <AmountColumn>{0}</AmountColumn>
      </AmountContainer>
    </JackPotContainer>
  );
};

export default Jackpot;
