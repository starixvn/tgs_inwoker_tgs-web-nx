import styled from "styled-components";
import FlipMove from "react-flip-move";
import WinnerRankRow, { RankItem } from "./components/WinnerRankRow";
import boxBg from '@/assets/t22/images/home/rankingBoxBg.png';
import bg from '@/assets/t22/images/home/rankingBg.png'
import {media} from '@/theme/breakpoints';

const Root = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  width: 100%;

  ${media.md} {
    justify-content: flex-end;
    background: url(${bg}) no-repeat center center;
    background-size: contain;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: url(${boxBg}) no-repeat top;
  background-size: contain;
  width: 100%;
  max-width: 450px;
  height: 515px;
`;

const Label = styled.p`
  padding: 16px;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
`;

const Ranking = styled.div`
  padding: 25px 25px 0;
  flex: 1;
`;

type Props = {
  leaderboard: RankItem[];
};

const WinnerCard = ({ leaderboard }: Props) => {
  return (
    <Root>
      <Content>
        <Label>Latest Winners</Label>
        <Ranking>
          <FlipMove>
            {leaderboard.map((rankItem) => {
              return <WinnerRankRow key={rankItem.key} rankItem={rankItem} />;
            })}
          </FlipMove>
        </Ranking>
      </Content>
    </Root>
  );
};

export default WinnerCard;
