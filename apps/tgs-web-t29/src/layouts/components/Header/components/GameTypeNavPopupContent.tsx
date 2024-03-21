import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import NavCategory from "@/pages/home/components/CategoryRenderer/components/NavCategory";

const GameTypeNavPopupContent = () => {
  const { activeNavPopupGameType } = useHomeGameContext();

  switch (activeNavPopupGameType) {
    case GameTypeEnum.LIVELOBBY:
    case GameTypeEnum.ARCADELOBBY:
    case GameTypeEnum.SPORTS:
    case GameTypeEnum.COCKFIGHT:
    case GameTypeEnum.ESPORTS:
    case GameTypeEnum.QIPAILOBBY:
    case GameTypeEnum.SLOT:
    case GameTypeEnum.FISH:
    case GameTypeEnum.TABLEGAME:
    case GameTypeEnum.LOTTERYLOBBY:
      return <NavCategory />;

    default:
      return null;
  }
};

export default GameTypeNavPopupContent;
