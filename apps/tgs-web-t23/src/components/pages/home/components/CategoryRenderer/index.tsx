import HomeCategory from "@/components/pages/home/components/CategoryRenderer/components/HomeCategory";
import LobbyCategory from "@/components/pages/home/components/CategoryRenderer/components/LobbyCategory";
import NonLobbyCategory from "@/components/pages/home/components/CategoryRenderer/components/NonLobbyCategory";
import { useHomeGameContext } from "@/core/feature/game/useHomeGameContext";
import { GameTypeEnum } from "@/core/types/GameTypeEnum";

type Props = {};
const CategoryRenderer = (props: Props) => {
  const { activeGameType } = useHomeGameContext();

  switch (activeGameType) {
    case GameTypeEnum.NONE:
      return <HomeCategory />;

    case GameTypeEnum.SLOT:
    case GameTypeEnum.FISH:
    case GameTypeEnum.TABLEGAME:
      return <NonLobbyCategory />;

    default:
    case GameTypeEnum.LIVELOBBY:
    case GameTypeEnum.ARCADELOBBY:
    case GameTypeEnum.SPORTS:
    case GameTypeEnum.COCKFIGHT:
    case GameTypeEnum.ESPORTS:
    case GameTypeEnum.QIPAILOBBY:
      return <LobbyCategory />;
  }
};

export default CategoryRenderer;
