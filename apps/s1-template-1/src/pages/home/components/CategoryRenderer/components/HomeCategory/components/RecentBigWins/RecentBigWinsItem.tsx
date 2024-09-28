import { RecentBigWinItem } from "@tgs-web-nx/types";
import { utility } from "@tgs-web-nx/utils";

import { BigWinsAmount, BottomArea, GameContainer, PlayerName, RecentBigWinsSlide } from "./style";
import GameCard from "@/pages/home/components/GameCard";

const RecentBigWinsItem: React.FC<{
  item: RecentBigWinItem;
  launchGame: (gameId: number, gameProviderCode: string) => void;
  handleOpenDialog: (data: RecentBigWinItem) => void;
}> = ({ item, launchGame, handleOpenDialog }) => {
  const {
    gameId,
    gameType,
    gameProviderCode,
    gameProviderName,
    gameCode,
    playerName,
    gameName,
    profit,
    currencyCode,
    payout
  } = item;
  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  // convert recent big wins data to game data
  const gameItem = {
    id: gameId,
    code: gameCode,
    name: gameName,
    description: "",
    gpcode: gameProviderCode,
    gpname: gameProviderName,
    status: 0,
    type: gameType,
    tag: {
      new: true,
      hot: false,
      recommend: false,
    },
    gamestatus: 0,
    payout: payout
  };
  return (
    <RecentBigWinsSlide className="embla__slide">
      <GameContainer>
        <GameCard
          isHideProviderName={true}
          gameItem={gameItem}
          imageUrl={utility.getGameUrl(gameProviderCode, gameCode)}
        />

        <BottomArea onClick={() => handleOpenDialog(item)}>
          <PlayerName>{playerName}</PlayerName>
          <BigWinsAmount>{`${currencyCode} ${formatter.format(profit)}`}</BigWinsAmount>
        </BottomArea>
      </GameContainer>
    </RecentBigWinsSlide>
  );
};

export default RecentBigWinsItem;
