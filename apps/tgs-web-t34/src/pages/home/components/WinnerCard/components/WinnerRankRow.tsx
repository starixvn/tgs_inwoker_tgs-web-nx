import { forwardRef, Ref } from "react";
import styled from "styled-components";
import winner from "@/assets/t23/images/home/winner.svg";
import currency from "@/assets/t23/images/home/currency.svg";
import { media } from "@/theme/breakpoints";

const RankingRowWrapper = styled.div`
  padding: 0px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  img {
    width: 29px;
    height: 32px;
  }
`;

const RightColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 85px;

  img {
    width: 20px;
    height: 20px;
  }
`;

const Title = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  ${media.sm} {
    font-size: 1.25rem;
  }
`;

export interface RankItem {
  key: string;
  gameName: string;
  playerName: string;
  betAmount: number;
}

type Props = {
  rankItem: RankItem;
};

const WinnerRankRow = forwardRef(({ rankItem }: Props, ref: Ref<HTMLDivElement> | undefined) => {
  const { gameName, playerName, betAmount } = rankItem;
  return (
    <RankingRowWrapper ref={ref as any}>
      <LeftColumn>
        <img src={winner} alt="ranking" />
        <Title>
          <span>{playerName}</span>
          <span> {gameName ? gameName : "Thunder God"}</span>
        </Title>
      </LeftColumn>

      <RightColumn>
        <img src={currency} alt="currency" /> {betAmount}
      </RightColumn>
    </RankingRowWrapper>
  );
});

export default WinnerRankRow;
