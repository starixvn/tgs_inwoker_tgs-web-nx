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

// -------- hover effect for desktop--------------
const CardHoverBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 50%);
  border-radius: 4px;
  display: none;
  white-space: pre-line;
`;

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

const TagBg = styled.div`
  position: absolute;
  width: 100%;
  padding-top: 100%;
  left: 0;
  top: 0;
  border-radius: 4px;
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
  font-weight: 400;
`;

const HotTag = styled.div`
  position: absolute;
  bottom: 7px;
  left: 0;
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

const GameCardContent = styled.div`
  width: 100%;
`;

const GameCardBg = styled.div<{ $isActive: boolean }>`
  width: calc(33.33% - 15px);
  position: relative;
  cursor: ${({ $isActive }) => ($isActive ? "pointer" : "unset")};
  aspect-ratio: 94 / 127;

  ${media.sm} {
    width: calc(16.67% - 36px);
    min-width: 196px;
    aspect-ratio: 100 / 127;

    &:hover {
      ${CardHoverBg} {
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
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
  background: rgb(0 0 0 / 80%);
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

const MaintenanceIcon = styled.img`
  width: 90px;
  height: 63px;
`;

const GameName = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  color: ${(props) => props.theme.grey05};
  font-size: 0.875rem;
  font-weight: 400;
  text-align: center;
  margin: 4px 0 12px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%; //利用最大寬度來限制文字長度
  ${media.sm} {
    color: ${(props) => props.theme.white};
  }
`;

const PlayBtnIcon = styled.img`
  width: 45px;
  height: 45px;
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
    <GameCardBg onClick={launchGameHandler} $isActive={isActive}>
      <GameCardContent>
        <GameIcon $imageUrl={imageUrl}></GameIcon>
        <TagBg>
          {gameItem.tag.new && <NewTag>New</NewTag>}
          {gameItem.tag.hot && <HotTag>Hot</HotTag>}
        </TagBg>
        {gameItem.name && <GameName ref={gameNameRef}>{gameItem.name}</GameName>}

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
        <CardHoverBg onClick={launchGameHandler}>
          <PlayBtnIcon src={playIcon} alt={"play"} />
        </CardHoverBg>
      )}
    </GameCardBg>
  );
};

export default GameCard;
