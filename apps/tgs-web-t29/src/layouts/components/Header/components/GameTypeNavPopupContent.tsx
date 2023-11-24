import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import NavCategory from "@/pages/home/components/CategoryRenderer/components/NavCategory";
import HomeCategory from "@/pages/home/components/CategoryRenderer/components/HomeCategory";

const GameTypeNavPopupContent = () => {
  const { activeNavPopupGameType } = useHomeGameContext();

  switch (activeNavPopupGameType) {
    case GameTypeEnum.LIVELOBBY:
    case GameTypeEnum.ARCADELOBBY:
    case GameTypeEnum.SPORTS:
    case GameTypeEnum.COCKFIGHT:
    case GameTypeEnum.ESPORTS:
    case GameTypeEnum.QIPAILOBBY:
      return <NavCategory />;

    // default:
    // case GameTypeEnum.NONE:
    //   return <HomeCategory />;
  }
};

export default GameTypeNavPopupContent;
