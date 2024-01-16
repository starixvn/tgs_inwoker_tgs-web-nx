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
import gradientBg from "@/assets/t27/images/home/name-bg.png";
import maintenanceIcon from "@/assets/t27/images/home/maintenance.svg";
import useDynamicFontSize from "@/hooks/home/useDynamicFontSize";
import MaskPlayerName from "@/pages/home/components/Ranking/components/MaskPlayerName";
import config from "@tgs-web-nx/config";

const GameIcon = styled.div<{ $imageUrl: string }>`
  position: relative;
  width: 100%;
  padding-top: 100%;
  left: 0;
  top: 0;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.black};;
`;

const GameCardContent = styled.div`
  width: 100%;
`;

const GameCardBg = styled.div`
  width: calc(40% - 13px);
  position: relative;
  aspect-ratio: 148 / 222;

  ${media.sm} {
    width: calc(12.35% - 14px);
    min-width: 148px;
  }
`;

const NameBg = styled.div`
  position: absolute;
  width: 100%;
  height: 67.7%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

const NameBgIcon = styled.img`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const MaintenanceBg = styled.div`
  position: absolute;
  width: 100%;
  height: 67.7%;
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

const PlayerWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  padding: 12px;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const Player = styled.div`
  width: 100%;
  font-size: 15.6px;
  font-weight: 400;
  line-height: 17.51px;
  color: ${({ theme }) => theme.white};
`;

const AmountWrapper = styled.div`
  display: flex;
  padding: 2px 5.39px 1px 5.84px;
  align-items: flex-start;
  border-radius: 1px;
  background: rgba(69, 217, 30, 0.10);
`;

const Amount = styled.div`
  width: 100%;
  font-size: 15.6px;
  font-weight: 400;
  line-height: 15.56px;
  color: #3BC117;
`;

type GameCardProps = {
  gameItem: GameItem;
  isActive: boolean;
  imageUrl: string;
  playerName: string;
  amount: number;
};

const BigWinsCard = ({ gameItem, isActive, imageUrl, playerName, amount }: GameCardProps) => {
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
        <NameBg>
          <NameBgIcon src={gradientBg} alt={"game name"} />
          {gameItem.name && <GameName ref={gameNameRef}>{gameItem.name}</GameName>}
        </NameBg>
        <PlayerWrapper>
          <Player><MaskPlayerName playerName={playerName} /></Player>
          <AmountWrapper>
            <Amount>{config.currency} {amount}</Amount>
          </AmountWrapper>
        </PlayerWrapper>

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
    </GameCardBg>
  );
};

export default BigWinsCard;
