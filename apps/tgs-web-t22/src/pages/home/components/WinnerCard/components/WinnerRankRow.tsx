import { forwardRef, Ref } from "react";
import styled from "styled-components";
import game_icon from "@/assets/t22/images/home/game_icon.png";

const RankingRowWrapper = styled.div`
  margin-bottom: 24px;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  gap: 10px;
  width: 100%;
`;


const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Desc = styled.span`
  margin-left: 12px;
`;

const PlayerName = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ theme }) => theme.white};
  margin-bottom: 7px;
`;

const GameName = styled.p`
  color: #FFC632;
  font-size: 0.6rem;
  font-weight: 700;
  line-height: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const BetAmount = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.white};
  font-size: .8rem;
  line-height: 18px;
  font-weight: 400;
`;

const GameImg = styled.img`
  width: 100%;
`;

export interface RankItem {
  key: string;
  gameName?: string;
  playerName: string;
  betAmount: number;
}

type Props = {
  rankItem: RankItem;
};

const WinnerRankRow = forwardRef(
  ({ rankItem }: Props, ref: Ref<HTMLDivElement> | undefined) => {
    const { gameName, playerName, betAmount } = rankItem;
    const cryptoLength = 4;
    const cryptoPlayerName = playerName.slice(cryptoLength).padStart(playerName.length, '*');
    const defaultGameName = 'Thunder God';

    return (
      <RankingRowWrapper ref={ref}>
        <GameImg src={game_icon} alt="game" />

        <Title>
          <PlayerName>
            {cryptoPlayerName}
            <Desc>Just won in</Desc>
          </PlayerName>
          <GameName> {gameName ? gameName : defaultGameName}</GameName>
        </Title>

        <BetAmount>₱{betAmount}</BetAmount>
      </RankingRowWrapper>
    );
  },
);

export default WinnerRankRow;
