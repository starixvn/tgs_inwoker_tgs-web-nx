import Skeleton from "@mui/material/Skeleton/Skeleton";

import { BigWinsAmount, GameContainer, GameIcon, GameName, RecentBigWinsSlide } from "./style";

const RecentBigWinSKeleton = () => {
  return (
    <RecentBigWinsSlide className="embla__slide">
      <GameContainer>
        <GameIcon></GameIcon>
        <GameName>
          <Skeleton animation="wave" />
        </GameName>
        <BigWinsAmount>
          <Skeleton animation="wave" />
        </BigWinsAmount>
      </GameContainer>
    </RecentBigWinsSlide>
  );
};

export default RecentBigWinSKeleton;
