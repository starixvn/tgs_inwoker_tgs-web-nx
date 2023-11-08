import { useHomeGameContext } from "@/core/feature/game/useHomeGameContext";
import useDynamicFontSize from "@/core/hooks/pages/home/useDynamicFontSize";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { GameItem } from "@/core/models/dto/game/GetGameListResDto";
import { useAccountStore } from "@/core/stores/useAccountStore";
import { useGameStore } from "@/core/stores/useGameStore";
import Common from "@/core/utils/Common";
import Favorite from "@/pages/home/components/Favorite";
import { media } from "@/theme/breakpoints";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import TextButton from "../TextButton";

// -------- hover effect for desktop--------------
const CardHoverBg = styled.div`
  position: absolute;
  width: 100%;
  height: 80.6%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 60%);
  border-radius: 15px;
  display: none;
  white-space: pre-line;
`;

const GameIcon = styled.div<{ $imageUrl: string }>`
  position: absolute;
  width: 100%;
  padding-top: 100%;
  left: 0;
  top: 0;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  border-radius: 5px;

  ${media.sm} {
    border-radius: 15px;
  }
`;

const NewTag = styled.div`
  position: absolute;
  width: 100%;
  top: 60.56%;
  padding: 10px;
  border-radius: 5px;
  background: ${(props) => props.theme.primaryMix};
  color: ${(props) => props.theme.tagColor};
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 110 / 24;
  font-size: 0.875rem;
  font-weight: 400;

  ${media.sm} {
    border-radius: 15px;
    top: 63%;
  }
`;

const GameCardContent = styled.div`
  width: 100%;
`;

const GameCardBg = styled.div`
  width: calc(33.33% - 5.33px);
  position: relative;
  cursor: pointer;
  aspect-ratio: 110 / 142;

  ${media.sm} {
    width: calc(16.67% - 30px);
    min-width: 170px;
    aspect-ratio: 170 / 211;

    &:hover {
      ${CardHoverBg} {
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;

const GameName = styled(GameCardContent)`
  position: absolute;
  bottom: 0;
  color: ${(props) => props.theme.white};
  font-size: 0.875rem;
  font-weight: 400;
  text-align: center;
  margin: 4px 0 12px 0;
`;

const MaintenanceBg = styled.div`
  position: absolute;
  width: 100%;
  height: 77%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 50%);
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.sm} {
    height: 81%;
    border-radius: 15px;
    z-index: 1;
  }
`;

const MaintenanceText = styled.div`
  color: ${(props) => props.theme.darkGray};
  font-size: 0.75rem;
  font-weight: 900;
  text-align: center;

  ${media.sm} {
    font-size: 1rem;
    font-weight: 700;
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
  const gameNameRef = useRef<HTMLDivElement | null>(null);
  const { resizeText } = useDynamicFontSize();
  const { favoriteList, fetchFavoriteList } = useHomeGameContext();
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);
  const { isDesktopSize } = useRwd();
  const isFavorite = favoriteList.includes(gameItem.id);

  const launchGame = () => {
    if (!account.token) {
      history.push("/login");
    } else {
      Common.closePreviousPopup();
      Common.PopupCenter(`/joingame/${gameItem.id}/${gameItem.gpcode}`, "gamewindow");
    }
  };

  const handleToggleFavorite = async (event: MouseEvent, gameId: number) => {
    event.stopPropagation();
    if (!account.token) {
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
    <>
      <GameCardBg onClick={launchGame}>
        <GameCardContent>
          <GameIcon $imageUrl={imageUrl}></GameIcon>
          <NewTag>New</NewTag>
          {!isActive && (
            <MaintenanceBg>
              <MaintenanceText>UNDER MAINTENANCE</MaintenanceText>
            </MaintenanceBg>
          )}
          {gameItem && <GameName ref={gameNameRef}>{gameItem.name}</GameName>}
        </GameCardContent>
        <Favorite
          isFavorite={isFavorite}
          handleToggleFavorite={handleToggleFavorite}
          gameItemId={gameItem.id}
        />

        {isDesktopSize && (
          <CardHoverBg>
            <TextButton text={"Go"} />
          </CardHoverBg>
        )}
      </GameCardBg>
    </>
  );
};

export default GameCard;
