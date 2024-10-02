import AppearSensor from "@/components/project/AppearSensor";
import { useAccountStore } from "@tgs-web-nx/core";
import { useAuth } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameItem, GameStatus } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { Img } from "react-image";

import PlayIcon from "../PlayIcon";
import { LoadingIcon, NoGameIcon } from "./icons";
import { CardHoverBg, GameCardBg, GameCardContent, GameName, GameStatusBg, ProviderName } from "./style";

type GameCardProps = {
  gameItem: GameItem;
  imageUrl: string;
  isHideProviderName?: boolean;
};

const GameCard = ({ gameItem, imageUrl, isHideProviderName }: GameCardProps) => {
  const { account } = useAccountStore();
  const { isDesktopSize } = useRwd();
  const { goToLogin } = useAuth();
  const isLogin = !!account.token;
  const { id, gpcode, name, gpname, gamestatus } = gameItem;

  const isActive = gamestatus === GameStatus.ACTIVE;

  const launchGameHandler = () => {
    if (!isActive) {
      return;
    }
    launchGame();
  };

  let gameStatusClassName = "normal";
  let isShowGameStatus = false;
  let gameStatus = "";

  switch (gamestatus) {
    case GameStatus.MAINTENANCE:
      gameStatusClassName = "maintenance";
      isShowGameStatus = true;
      gameStatus = i18n.t("common.bebacksoon");
      break;
    case GameStatus.TESTING:
      gameStatusClassName = "testing";
      isShowGameStatus = true;
      gameStatus = i18n.t("common.comingSoon");
      break;
    default:
      break;
  }

  const launchGame = () => {
    if (!isLogin) {
      goToLogin();
    } else {
      window.open(`/joingame/${id}/${gpcode}`, import.meta.env.VITE_GAME_WINDOW_NAME);
    }
  };

  return (
    <AppearSensor>
      {
        // @ts-ignore
        ({ hasBeenVisible }) => (
          <GameCardBg className={gameStatusClassName} onAuxClick={launchGameHandler}>
            <GameCardContent>
              {hasBeenVisible && (
                <Img
                  className="game-icon"
                  src={imageUrl}
                  loader={<LoadingIcon />}
                  unloader={<NoGameIcon gameName={name} />}
                />
              )}
              {!isHideProviderName && <ProviderName>{gpname}</ProviderName>}

              {isShowGameStatus && (
                <GameStatusBg>
                  <div className="status-text">{gameStatus}</div>
                </GameStatusBg>
              )}
            </GameCardContent>

            {isActive && (
              <CardHoverBg onClick={launchGameHandler}>
                {name && (
                  // @ts-ignore
                  <GameName id={id}>{name}</GameName>
                )}
                <PlayIcon />
              </CardHoverBg>
            )}
          </GameCardBg>
        )
      }
    </AppearSensor>
  );
};

export default GameCard;
