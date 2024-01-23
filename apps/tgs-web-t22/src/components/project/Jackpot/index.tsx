import styled from "styled-components";
import { useJackpot } from "@tgs-web-nx/core/features";
import bg from "@/assets/t22/images/home/jackpot.png";
import { media } from "@/theme/breakpoints";

const JackpotContainer = styled.div`
  display: none;
  width: 100%;
  background: url(${bg}) center no-repeat;
  background-size: cover;

  ${media.sm} {
    display: block;
  }
`;

const Content = styled.div`
  margin: 0 auto;
  padding: 15px 0 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
`;

const Amount = styled.p`
  font-size: 1.5rem;
`;

const Title = styled(Amount)`
  margin-right: 10px;
  color: #FDCB5B;
`;



const Jackpot = () => {
  const { jackpotAmount } = useJackpot();

  const formatAmount = (amount: number, locales = "en-US") => {
    return amount.toLocaleString(locales, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
      useGrouping: true,
    });
  };

  return (
    <JackpotContainer >
      <Content>
        <Title>Jackpot</Title>
        <Amount>$ {formatAmount(jackpotAmount, "vi-VN")}</Amount>
      </Content>
    </JackpotContainer>
  );
};

export default Jackpot;
