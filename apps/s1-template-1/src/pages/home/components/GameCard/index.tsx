import maintenanceIcon from "@/assets/t28/images/home/maintenance.svg";
import Favorite from "@/pages/home/components/Favorite";
import { media } from "@/theme/breakpoints";
import { useAccountStore, useGameStore } from "@tgs-web-nx/core";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameItem } from "@tgs-web-nx/types";
import { Common } from "@tgs-web-nx/utils";
import { MouseEvent, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import PlayIcon from "../PlayIcon";

// -------- hover effect for desktop--------------
const CardHoverBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 1.2rem;
  background: rgba(6, 0, 74, 0.8);
  backdrop-filter: blur(0.2rem);
  opacity: 0;
`;

const GameIcon = styled.div<{ $imageUrl: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  padding-top: 100%;
  left: 0;
  top: 0;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  border-radius: 1.2rem;
`;

const GameCardContent = styled.div`
  width: 100%;
`;

const GameCardBg = styled.div`
  width: 14rem;
  flex-shrink: 0;
  position: relative;
  cursor: pointer;
  aspect-ratio: 140 / 189;

  ${media.sm} {
    flex-shrink: 0;
    &:hover {
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
  background: rgb(0 0 0 / 70%);
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  z-index: 3;

  &:hover {
    cursor: not-allowed;
  }
`;

const MaintenanceIcon = styled.img`
  width: 118px;
  height: 83px;
`;

const HoverGameName = styled(GameCardContent)`
  position: absolute;
  top: 2rem;
  color: ${(props) => props.theme.white};
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.8rem;
  text-align: center;
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
      Common.PopupCenter(`/joingame/${gameItem.id}/${gameItem.gpcode}`, "gamewindow");
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
        <GameIcon $imageUrl={imageUrl}></GameIcon>
        {/* {gameItem.tag.new && <NewTag>New</NewTag>}
        {gameItem.tag.hot && <HotTag>Hot</HotTag>} */}
        {!isActive && (
          <MaintenanceBg>
            <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
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

      {isDesktopSize && (
        <CardHoverBg onClick={launchGameHandler}>
          {gameItem.name && <HoverGameName>{gameItem.name}</HoverGameName>}
          <PlayIcon />
        </CardHoverBg>
      )}
    </GameCardBg>
  );
};

export default GameCard;
