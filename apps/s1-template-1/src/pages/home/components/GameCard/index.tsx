import AppearSensor from "@/components/project/AppearSensor";
import { useAccountStore } from "@tgs-web-nx/core";
import { useAuth, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useJoinGame } from "@tgs-web-nx/core/hooks";
import { GameItem, GameStatus } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { useEffect } from "react";
import { Img } from "react-image";

import PlayIcon from "../PlayIcon";
import { LoadingIcon, NoGameIcon } from "./icons";
import {
  CardHoverBg,
  GameCardBg,
  GameCardContent,
  GameName,
  GameStatusBg,
  ProviderName,
} from "./style";

type GameCardProps = {
  gameItem: GameItem;
  imageUrl: string;
  isHideProviderName?: boolean;
};

const GameCard = ({ gameItem, imageUrl, isHideProviderName }: GameCardProps) => {
  const { account } = useAccountStore();
  const { goToLogin } = useAuth();
  const { isLoading, handleJoinGame } = useJoinGame();
  const { handleLoading } = useHomeGameContext();
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
      handleJoinGame(id, gpcode);
    }
  };

  useEffect(() => {
    if (isLoading) {
      handleLoading(true);
    } else {
      handleLoading(false);
    }
  }, [isLoading]);

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
