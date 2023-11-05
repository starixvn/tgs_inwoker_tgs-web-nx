import picMask from "@/assets/t23/images/home/picMask.svg";
import Favorite from "@/components/pages/home/components/Favorite";
import useDynamicFontSize from "@/hooks/home/useDynamicFontSize";
import { useAccountStore } from "@/core/stores/useAccountStore";
import { useGameStore } from "@/core/stores/useGameStore";
import Common from "@/core/utils/Common";
import { media } from "@/theme/breakpoints";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { GameItem } from "@/core/models/dto/game/GetGameListResDto";
import { useHomeGameContext } from "@/core/feature/game/useHomeGameContext";

// -------- hover effect for desktop--------------
const CardHoverBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 80%);
  border-radius: 10px;
  padding: 0 5px;
  display: none;
  white-space: pre-line;
  display: flex;
  justify-content: flex-end;
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
`;

const GradientBg = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  left: 0;
  top: 0;
  background-image: url(${picMask});
  background-size: cover;
  border-radius: 0 0 5px 5px;
`;

const GameCardContent = styled.div`
  width: 100%;
`;

const HoverGameOrVenderName = styled(GameCardContent)`
  color: ${(props) => props.theme.white};
  font-size: 1rem;
  text-align: center;
  margin-bottom: 16px;
`;

const PlayIcon = styled.img`
  width: 65px;
  height: 65px;
`;

const GameCardBg = styled.div`
  width: calc(33.33% - 5.8px);
  position: relative;
  cursor: pointer;
  aspect-ratio: 110 / 142;

  ${media.sm} {
    width: calc(16.67% - 24.4px);
    min-width: 110px;

    &:hover {
      ${CardHoverBg} {
        z-index: 1;
        display: inline-flex;
        flex-direction: column;
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

const VenderLogo = styled.div<{ $venderLogoUrl: string }>`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  width: 100%;
  max-width: 80px;
  min-height: 30px;
  background-image: url(${({ $venderLogoUrl }) => $venderLogoUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
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
`;

const MaintenanceText = styled.div`
  color: ${(props) => props.theme.darkGray};
  font-size: 0.75rem;
  font-weight: 900;
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
  const gameNameRef = useRef<HTMLDivElement | null>(null);
  const { resizeText } = useDynamicFontSize();
  const { favoriteList, fetchFavoriteList } = useHomeGameContext();
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);

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
          {/* <GradientBg>
            {venderLogoUrl && (
              <VenderLogo $venderLogoUrl={venderLogoUrl}></VenderLogo>
            )}
          </GradientBg> */}
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

        {/* {isDesktopSize && <CardHoverBg>
          {gameName && <HoverGameOrVenderName ref={lobbyVenderNameRef}>{gameName}</HoverGameOrVenderName>}
          {lobbyVenderName && (
            <HoverGameOrVenderName ref={lobbyVenderNameRef}>{lobbyVenderName}</HoverGameOrVenderName>
          )}
        </CardHoverBg>} */}

        {/* {isMobileSize && (
          <Favorite
            isFavorite={isFavorite}
            handleToggleFavorite={handleToggleFavorite}
            gameItemId={gameItem.id}
          />
        )} */}
        {/*
        {gameItem.tag.hot && gameItem.tag.new && selectedTag === "All" && (
          <>
            <BadgeIcon $imageUrl={badgeList.hot} />
            <NewBadgeIcon $imageUrl={badgeList.new} />
          </>
        )}
        {gameItem.tag.hot && selectedTag === "Hot" && (
          <BadgeIcon $imageUrl={badgeList.hot} />
        )}
        {gameItem.tag.new && selectedTag === "New" && (
          <BadgeIcon $imageUrl={badgeList.new} />
        )} */}
      </GameCardBg>
    </>
  );
};

export default GameCard;
