import React, { HTMLProps, MouseEvent, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { GameItem } from "@tgs-web-nx/types";
import { Common } from "@tgs-web-nx/utils";
import { useAccountStore, useGameStore } from "@tgs-web-nx/core";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Favorite from "@/pages/home/components/Favorite";
import { media } from "@/theme/breakpoints";
import playIcon from "@/assets/t34/images/home/play-green.svg";
import maintenanceIcon from "@/assets/t34/images/home/maintenance.svg";

const GameCardContainer = styled.div`
  width: calc(50% - 6px);
  position: relative;
  cursor: pointer;

  background-size: cover;
  background-position: center;

  ${media.sm} {
    width: calc((100% - 15px * 1) / 2);
  }

  ${media.md} {
    width: calc((100% - 15px * 2) / 3);
  }

  ${media.lg} {
    width: calc((100% - 15px * 5) / 6);
  }
`;

// -------- hover effect for desktop--------------
const CardHoverBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 60%);
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
`;

const NewTag = styled.div`
  position: absolute;
  top: 5px;
  left: 3px;
  width: 53px;
  height: 26px;
  padding: 4px 10px;
  border-radius: 50px;
  background: ${(props) => props.theme.red};
  color: ${(props) => props.theme.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
`;

const HotTag = styled.div`
  position: absolute;
  bottom: 7px;
  left: 0;
  width: 53px;
  height: 26px;
  padding: 4px 10px;
  border-radius: 50px;
  background: ${(props) => props.theme.green};
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
  width: 100%;
  position: relative;
  aspect-ratio: 161 / 161;

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
  color: ${(props) => props.theme.white};
  font-size: 1rem;
  text-align: center;
  margin-bottom: 16px;
`;

const PlayIcon = styled.img`
  width: 65px;
  height: 65px;
`;

type GameCardProps = {
  gameItem: GameItem;
  isActive: boolean;
  imageUrl: string;
} & HTMLProps<HTMLDivElement>;

const GameCard = ({ gameItem, isActive, imageUrl, ...others }: GameCardProps) => {
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
    // @ts-ignore
    <GameCardContainer {...others}>
      <GameCardBg onClick={launchGameHandler}>
        <GameCardContent>
          <GameIcon $imageUrl={imageUrl}></GameIcon>
          {gameItem.tag.new && <NewTag>New</NewTag>}
          {gameItem.tag.hot && <HotTag>Hot</HotTag>}
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
            <PlayIcon src={playIcon} alt={"play"} />
          </CardHoverBg>
        )}
      </GameCardBg>
    </GameCardContainer>
  );
};

export default React.memo(GameCard);

function transformString(inputString: string): string {
  const words: string[] = inputString.replace(/_/g, " ").split(" ");
  const transformedString: string = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return transformedString;
}
