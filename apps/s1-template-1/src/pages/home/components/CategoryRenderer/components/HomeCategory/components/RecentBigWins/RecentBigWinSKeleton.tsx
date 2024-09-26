import Skeleton from "@mui/material/Skeleton/Skeleton";

import { BigWinsAmount, GameContainer, GameIcon, PlayerName, RecentBigWinsSlide } from "./style";

const RecentBigWinSKeleton = () => {
  return (
    <RecentBigWinsSlide className="embla__slide">
      <GameContainer>
        <GameIcon></GameIcon>
        <PlayerName>
          <Skeleton animation="wave" />
        </PlayerName>
        <BigWinsAmount>
          <Skeleton animation="wave" />
        </BigWinsAmount>
      </GameContainer>
    </RecentBigWinsSlide>
  );
};

export default RecentBigWinSKeleton;
