import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router-dom";
// import HomeCategory from "@/pages/home/components/CategoryRenderer/components/HomeCategory";
import LobbyCategory from "@/pages/home/components/CategoryRenderer/components/LobbyCategory";
import NonLobbyCategory from "@/pages/home/components/CategoryRenderer/components/NonLobbyCategory";

const CategoryRenderer = () => {
  const { activeGameType } = useHomeGameContext();

  // switch (activeGameType) {
  //   case GameTypeEnum.NONE:
  //     return <HomeCategory />;
  //   // 遊戲大廳 isEnterGamePortal
  // }

  switch (activeGameType) {
    case GameTypeEnum.SLOT:
    case GameTypeEnum.FISH:
    case GameTypeEnum.TABLEGAME:
    // 虛擬體育雖是歸類在體育底下,但呈現方式是和NonLobby一樣
    // eslint-disable-next-line no-fallthrough
    case GameTypeEnum.RNGSPORTS:
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
