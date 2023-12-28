import { forwardRef, Ref } from "react";
import styled from "styled-components";
import game_icon from "@/assets/t28/images/home/home_sport.svg";
import { media } from "@/theme/breakpoints";

const RankingRowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 82px;
  padding: 12px;
  gap: 12px;
  border-bottom: ${({ theme }) => `1px solid ${theme.gray20}`};
`;

const LeftColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
  color: ${(props) => props.theme.white};
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;

  /* ${media.sm} {
    font-size: 1.25rem;
  } */
`;

const PlayerName = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ theme }) => theme.white};
`;

const GameName = styled.div`
  color: #c19b37;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.75rem;
  font-weight: 700;
`;

const BetAmount = styled.div`
  color: ${({ theme }) => theme.yellow};
  font-size: 1rem;
  font-weight: 700;
`;

const GameImg = styled.img`
  width: 18px;
  height: 18px;
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
        <GameImg src={game_icon} alt="game" />
        <Title>
          <PlayerName>{playerName}</PlayerName>
          {/* <GameName> {gameName ? gameName : 'Thunder God'}</GameName> */}
        </Title>
      </LeftColumn>

      <RightColumn>
        <BetAmount>$ {betAmount}</BetAmount>
      </RightColumn>
    </RankingRowWrapper>
  );
});

export default WinnerRankRow;
