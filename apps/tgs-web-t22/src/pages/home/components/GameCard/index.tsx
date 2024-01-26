import { MouseEvent, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { GameItem } from "@tgs-web-nx/types";
import { Common } from "@tgs-web-nx/utils";
import { useAccountStore, useGameStore } from "@tgs-web-nx/core";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Favorite from "@/pages/home/components/Favorite";
import { media } from "@/theme/breakpoints";
import playIcon from "@/assets/t29/images/home/play.svg";
import maintenanceIcon from "@/assets/t29/images/home/maintenance.svg";

// -------- hover effect for desktop--------------
const CardHoverBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 60%);
  border-radius: 10px;
  display: none;
  white-space: pre-line;
`;

const GameIcon = styled.div<{ $imageUrl: string }>`
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  border-radius: 10px;
  width: 100%;
  aspect-ratio: 1;
`;

const NewTag = styled.div`
  position: absolute;
  top: 5px;
  left: 3px;
  width: 43px;
  height: 22px;
  padding: 2px 5px;
  border-radius: 50px;
  background: ${(props) => props.theme.red};
  color: ${(props) => props.theme.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem; 
`;

const HotTag = styled.div`
  position: absolute;
  bottom: 5px;
  left: 3px;
  width: 43px;
  height: 22px;
  padding: 2px 5px;
  border-radius: 50px;
  background: ${(props) => props.theme.green};
  color: ${(props) => props.theme.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 400;
`;

const GameCardBg = styled.div`
  position: relative;
  border-radius: 10px;
  width: 100%;
  aspect-ratio: 1;
  cursor: pointer;

  ${media.sm} {
    &:hover {
      ${CardHoverBg} {
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;

const GameName = styled.p`
  margin-top: 6px;
  max-width: 100%;

  color: ${(props) => props.theme.navTextDefault};
  font-size: .9rem;
  line-height: 20px;
  text-align: center;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MaintenanceBg = styled.div`
  padding: 7px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgb(0 0 0 / 70%);
  border-radius: 10px;
  width: 100%;
  height: 100%;

  &:hover {
    cursor: not-allowed;
  }
`;

const MaintenanceIcon = styled.img`
  max-width: 80%;
`;

type GameCardProps = {
  gameItem: GameItem;
  isActive: boolean;
  imageUrl: string;
};

const HoverGameName = styled.div`
  margin-bottom: 16px;
  width: 100%;
  color: ${(props) => props.theme.white};
  font-size: 1rem;
  text-align: center;
`;

const PlayIcon = styled.img`
  width: 65px;
  height: 65px;
`;

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
  }
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
    <div>
      <GameCardBg onClick={launchGameHandler}>
        <GameIcon $imageUrl={imageUrl}></GameIcon>
        {gameItem.tag.new && <NewTag>New</NewTag>}
        {gameItem.tag.hot && <HotTag>Hot</HotTag>}
        {!isActive && (
          <MaintenanceBg>
            <MaintenanceIcon src={maintenanceIcon} alt={"maintenance"} />
          </MaintenanceBg>
        )}
        
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
            <PlayIcon src={playIcon} alt={"play"} />
          </CardHoverBg>
        )}

      </GameCardBg>
      <GameName>{gameItem.name}</GameName>
    </div>
  );
};

export default GameCard;
