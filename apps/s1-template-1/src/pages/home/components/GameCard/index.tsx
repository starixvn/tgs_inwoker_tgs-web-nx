import Favorite from "@/pages/home/components/Favorite";
import { media } from "@/theme/breakpoints";
import { useAccountStore, useGameStore } from "@tgs-web-nx/core";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameItem } from "@tgs-web-nx/types";
import { Common, i18n } from "@tgs-web-nx/utils";
import { MouseEvent, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import PlayIcon from "../PlayIcon";

// -------- hover effect for desktop--------------
const CardHoverBg = styled.div`
  position: absolute;
  bottom: -1px;
  right: -1px;
  left: -1px;
  top: -1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 1.2rem;
  background: ${({ theme }) => theme.gameCardBackgroundHover};
  backdrop-filter: blur(0.2rem);
  transition: opacity 0.15s linear;
  opacity: 0;
`;

const GameCardContent = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
`;

const GameCardBg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-shrink: 0;
  position: relative;
  cursor: pointer;
  aspect-ratio: ${({ theme }) => theme.gameCardAspectRatio};
  border-radius: 1.2rem;
  background: ${({ theme }) => theme.gameCardBackground};
  backdrop-filter: blur(2px);

  .game-icon {
    width: 100%;
    aspect-ratio: ${({ theme }) => theme.gameCardAspectRatio};
  }

  ${media.sm} {
    flex-shrink: 0;

    &:hover {
      border: 2px solid #fff;

      .game-icon {
        transform: scale(1.1);
      }

      ${CardHoverBg} {
        opacity: 1;
      }
    }
  }
`;

const MaintenanceBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 1.2rem;
  background: ${({ theme }) => theme.maintenanceBackground};
  backdrop-filter: blur(2px);
  padding: 0 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;

  .maintenance-text {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 94%;
    height: 3.4rem;
    background-color: ${({ theme }) => theme.maintenanceLabelBackground};
    border-radius: 3rem;
    font-size: 1.3rem;
    font-weight: 700;
    color: ${({ theme }) => theme.maintenanceLabelColor};
  }

  &:hover {
    cursor: not-allowed;
  }
`;

const HoverGameName = styled(GameCardContent)`
  position: absolute;
  top: 2rem;
  color: ${({ theme }) => theme.gameCardGameNameColor};
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  text-transform: capitalize;
`;

const ProviderName = styled.div`
  position: absolute;
  bottom: 0.8rem;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.gameCardGameNameColor};
`;

type GameCardProps = {
  gameItem: GameItem;
  isActive: boolean;
  imageUrl: string;
};

const GameCard = ({ gameItem, isActive, imageUrl }: GameCardProps) => {
  const { setFavoriteGame, removeFavoriteGame } = useGameStore();
  const { account } = useAccountStore();
  const history = useHistory();
  const { favoriteList, fetchFavoriteList } = useHomeGameContext();
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);
  const { isDesktopSize } = useRwd();
  const isFavorite = favoriteList.includes(gameItem.id);
  const isLogin = !!account.token;
  const { id, gpcode, name, gpname } = gameItem;

  const launchGameHandler = () => {
    if (!isActive) {
      return;
    }
    launchGame();
  };
  const launchGame = () => {
    if (!isLogin) {
      history.push("/login");
    } else {
      Common.closePreviousPopup();
      Common.PopupCenter(`/joingame/${id}/${gpcode}`, "gamewindow");
    }
  };

  const handleToggleFavorite = async (event: MouseEvent, gameId: number) => {
    event.stopPropagation();
    if (!isLogin) {
      history.push("/login");
    } else {
      if (isUpdatingFavorite) return;

      setIsUpdatingFavorite(true);
      if (!!favoriteList.length && favoriteList.includes(gameId)) {
        await removeFavoriteGame(gameId);
        await fetchFavoriteList();
      } else {
        await setFavoriteGame(gameId);
        await fetchFavoriteList();
      }
      setIsUpdatingFavorite(false);
    }
  };

  return (
    <GameCardBg onClick={launchGameHandler}>
      <GameCardContent>
        <img className="game-icon" src={imageUrl} title={name} alt={name} />
        <ProviderName>{gpname}</ProviderName>
        {/* {gameItem.tag.new && <NewTag>New</NewTag>}
        {gameItem.tag.hot && <HotTag>Hot</HotTag>} */}
        {!isActive && (
          <MaintenanceBg>
            <div className="maintenance-text">{i18n.t("common.bebacksoon")}</div>
          </MaintenanceBg>
        )}
      </GameCardContent>

      {isLogin && (
        <Favorite
          isFavorite={isFavorite}
          handleToggleFavorite={handleToggleFavorite}
          gameItemId={gameItem.id}
        />
      )}

      {isDesktopSize && isActive && (
        <CardHoverBg onClick={launchGameHandler}>
          {gameItem.name && <HoverGameName>{gameItem.name}</HoverGameName>}
          <PlayIcon />
        </CardHoverBg>
      )}
    </GameCardBg>
  );
};

export default GameCard;
