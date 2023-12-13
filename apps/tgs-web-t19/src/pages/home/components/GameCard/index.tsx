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
import maintenanceIcon from "@/assets/t29/images/home/maintenance.svg";
import useDynamicFontSize from "@/hooks/home/useDynamicFontSize";

// -------- hover effect for desktop--------------
const CardHoverBg = styled.div`
  position: absolute;
  width: 100%;
  height: 81%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 60%);
  border-radius: 15px;
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
  border-radius: 15px;
  background-color: ${({ theme }) => theme.black};;
`;

const TagBg = styled.div`
  position: absolute;
  width: 100%;
  padding-top: 100%;
  left: 0;
  top: 0;
  border-radius: 15px;
`;

const NewTag = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 22px;
  padding: 10px;
  border-radius: 12px;
  background: ${(props) => props.theme.goldGradient};
  color: ${(props) => props.theme.black};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
`;

const HotTag = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 53px;
  height: 22px;
  padding: 10px;
  border-radius: 12px;
  background: ${(props) => props.theme.red};
  color: ${(props) => props.theme.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
`;

const GameCardContent = styled.div`
  width: 100%;
`;

const GameCardBg = styled.div`
  width: calc(33.33% - 8px);
  position: relative;
  cursor: pointer;
  aspect-ratio: 94 / 127;

  ${media.sm} {
    width: calc(16.67% - 36px);
    min-width: 170px;
    aspect-ratio: 170 / 210;

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
  height: 74%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 50%);
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;

  ${media.sm} {
    height: 81%;
  }
`;

const MaintenanceIcon = styled.img`
  width: 90px;
  height: 63px;
`;

const GameName = styled.div`
width: 100%;
  position: absolute;
  bottom: 0;
  color: ${(props) => props.theme.white};
  font-size: 0.875rem;
  font-weight: 400;
  text-align: center;
  margin: 4px 0 12px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%; //利用最大寬度來限制文字長度
`;

const PlayBtn = styled.div`
  min-width: 108px;
  padding: 8px 30px;
  color: ${(props) => props.theme.black};
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50px;
  background: var(--Gold-Gridient, linear-gradient(180deg, #EFD068 0%, #FEDFA1 28.13%, #D4B34F 65.1%, #B77E18 100%));
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.25);
  
  &:hover {
    box-shadow: 0 -5px 15px 0 rgba(236,166,61,.501);
    }
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

  useEffect(() => {
    if (gameNameRef.current) {
      resizeText({ container: gameNameRef.current, text: gameNameRef.current });
    }
  }, [resizeText, gameNameRef.current]);

  return (
    <GameCardBg onClick={launchGameHandler}>
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
      {isDesktopSize && (
        <CardHoverBg onClick={launchGameHandler}>
          <PlayBtn>Play</PlayBtn>
        </CardHoverBg>
      )}
    </GameCardBg>
  );
};

export default GameCard;
