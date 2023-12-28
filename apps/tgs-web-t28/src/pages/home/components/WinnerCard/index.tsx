import styled from "styled-components";
import FlipMove from "react-flip-move";
import { useRwd } from "@tgs-web-nx/core/hooks";
import WinnerRankRow, { RankItem } from "./components/WinnerRankRow";
import { theme } from "@/theme";
import winnerBanner from "@/assets/t23/images/home/winner-banner.png";
import { media } from "@/theme/breakpoints";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 18px;
`;

const Content = styled.div``;

type Props = {
  leaderboard: RankItem[];
};

const WinnerCard = ({ leaderboard }: Props) => {
  const { isMobileSize } = useRwd();

  return (
    <Wrapper>
      <Content>
        <FlipMove
          style={{
            width: "100%",
            display: "flex",
            gap: isMobileSize ? "10spx" : "15px",
            flexDirection: "column",
          }}
        >
          {leaderboard.map((rankItem) => {
            return <WinnerRankRow key={rankItem.key} rankItem={rankItem} />;
          })}
        </FlipMove>
      </Content>
    </Wrapper>
  );
};

export default WinnerCard;
