import { MouseEvent, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { GameItem } from "@tgs-web-nx/types";
import { Common } from "@tgs-web-nx/utils";
import { useAccountStore, useGameStore } from "@tgs-web-nx/core";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Favorite from "@/pages/home/components/Favorite";
import { media } from "@/theme/breakpoints";
import maintenanceIcon from "@/assets/t36/images/home/maintenance.svg";
import useDynamicFontSize from "@/hooks/home/useDynamicFontSize";
import playIcon from "@/assets/t36/images/home/play-icon.png";

const GameIcon = styled.div<{ $imageUrl: string }>`
  position: relative;
  width: 100%;
  padding-top: 100%;
  left: 0;
  top: 0;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.black};
`;

const GameCardContent = styled.div`
  width: 100%;
`;

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
  cursor: pointer;
`;

const GameCardBg = styled.div`
  width: calc(40% - 13px);
  position: relative;
  aspect-ratio: 148 / 194;

  ${media.sm} {
    width: calc(12.19% - 14px);
    min-width: 148px;
  }
  &:hover {
    ${CardHoverBg} {
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;

const MaintenanceBg = styled.div`
  position: absolute;
  width: 100%;
  height: 78%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 80%);
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

const MaintenanceIcon = styled.img`
  width: 118px;
  height: 83px;
`;

const GameName = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  color: ${(props) => props.theme.grey05};
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  margin: 4px 0 12px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%; //利用最大寬度來限制文字長度

  ${media.sm} {
    color: ${({ theme }) => theme.white};
  }
`;

const PlayIcon = styled.img`
  width: 65px;
  height: 65px;
`;

type GameCardProps = {
  gameItem: GameItem;
  isActive: boolean;
  imageUrl: string;
  tag: string;
};

const HomeGameCard = ({ gameItem, isActive, imageUrl, tag }: GameCardProps) => {
  const { setFavoriteGame, removeFavoriteGame } = useGameStore();
  const { account } = useAccountStore();
  const history = useHistory();
  const { favoriteList, fetchFavoriteList } = useHomeGameContext();
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);
  const { isDesktopSize } = useRwd();
  const isFavorite = favoriteList.includes(gameItem.id);
  const isLogin = !!account.token;
  const gameNameRef = useRef<HTMLDivElement | null>(null);
  const { resizeText } = useDynamicFontSize();

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

  useEffect(() => {
    if (gameNameRef.current) {
      resizeText({ container: gameNameRef.current, text: gameNameRef.current });
    }
  }, [resizeText, gameNameRef.current]);

  return (
    <GameCardBg onClick={launchGameHandler}>
      <GameCardContent>
        <GameIcon $imageUrl={imageUrl}></GameIcon>
        <GameName>{gameItem.name}</GameName>
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
      {isDesktopSize && isActive && (
        <CardHoverBg onClick={launchGame}>
          <PlayIcon src={playIcon} alt={"play"} />
        </CardHoverBg>
      )}
    </GameCardBg>
  );
};

export default HomeGameCard;
