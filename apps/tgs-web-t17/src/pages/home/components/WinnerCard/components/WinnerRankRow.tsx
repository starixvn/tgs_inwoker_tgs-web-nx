import { forwardRef, Ref } from "react";
import styled from "styled-components";
import game_icon from "@/assets/t19/images/home/game_icon.png";
import { media } from "@/theme/breakpoints";

const RankingRowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 19px;
  
  ${media.sm} {
    padding: 0px 15px;
  }
`;

const LeftColumn = styled.div`
  display:flex;
  align-items:center;
  gap: 10px;
`;

const RightColumn = styled.div`
  display:flex;
  align-items:center;
  gap: 11px;
  min-width: 85px;

  img{
    width: 20px;
    height: 20px;
  }
`;

const Title = styled.div`
  color: ${(props) => props.theme.white};
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

const PlayerName = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ theme }) => theme.white};
  margin-bottom: 7px;
`;

const GameName = styled.div`
  color: ${({ theme }) => theme.white};
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.75rem;
  font-weight: 400;
`;

const Amount = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 0.75rem;
  font-weight: 700;
`;

const BetAmount = styled.div`
  display: flex;
  color: #F3AF16;
  font-size: 1rem;
  font-weight: 700;
`;

const GameImg = styled.img`
  width: 58px;
  height: 58px;
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

const WinnerRankRow = forwardRef(
  ({ rankItem }: Props, ref: Ref<HTMLDivElement> | undefined) => {
    const { gameName, playerName, betAmount } = rankItem;
    return (
      <RankingRowWrapper ref={ref as any}>
        <LeftColumn>
          <GameImg src={game_icon} alt="game" />
          <Title>
            <PlayerName>{playerName}</PlayerName>
            <GameName> {gameName ? gameName : 'Thunder God'}</GameName>
          </Title>
        </LeftColumn>

        <RightColumn>
          <BetAmount>PHP <Amount>{betAmount}</Amount></BetAmount>
        </RightColumn>
      </RankingRowWrapper>
    );
  },
);

export default WinnerRankRow;