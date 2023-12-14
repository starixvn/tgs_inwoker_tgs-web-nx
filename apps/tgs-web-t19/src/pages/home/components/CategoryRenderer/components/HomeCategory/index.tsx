import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import { useGetHomeCategoryList, useGetLobbyCategoryList, useGetNonLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useEffect, useMemo } from "react";
import jackpotPic from "@/assets/t19/images/home/jackpotPic.png";
import recommend_game1 from "@/assets/t19/images/home/recommend_game1.png";
import recommend_game2 from "@/assets/t19/images/home/recommend_game2.png";
import recommend_game3 from "@/assets/t19/images/home/recommend_game3.png";
import recommend_home from "@/assets/t19/images/home/recommend_home.svg";
import latest_home from "@/assets/t19/images/home/latest_home.svg";
import game_icon from "@/assets/t19/images/home/game_icon.png";
import top_home from "@/assets/t19/images/home/top_home.svg";
import live_home from "@/assets/t19/images/home/live_home.svg";
import slot_home from "@/assets/t19/images/home/slot_home.svg";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import ButtonText from "@/pages/home/components/ButtonText";
import CategoryLabel from "./components/CategoryLabel";
import LobbyVendorCard from "@/pages/home/components/VendorCard/LobbyVendorCard";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import GameCard from "@/pages/home/components/GameCard";
import config from "@tgs-web-nx/config";

const HomeCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
  }
`;

const RankingContainer = styled.div`
  width: 100%;
  height: 476px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RecommendContainer = styled.div`
  width: 367px;
  height: 100%;
  display: flex;
  padding-top: 18px;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
`;

const JackPotContainer = styled.div`
  aspect-ratio: 460 / 476;
  width: 100%;
  max-width: 460px;
  background-image: url(${jackpotPic});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const LatestContainer = styled.div`
  width: 373px;
  height: 100%;
  display: flex;
  padding-top: 18px;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
`;

const GameColumnWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 18px;
`;

const RecommendGameCard = styled.div<{ $imgUrl: string }>`
  position: relative;
  aspect-ratio: 367 / 114;
  width: 100%;
  border-radius: 10px;
  background-image: url(${({ $imgUrl }) => $imgUrl});
  background-size: contain;
  background-repeat: no-repeat;
`;

const LatestWinnerCard = styled.div`
  display: flex;
  width: 100%;
  padding: 12px;
  align-items: center;
  gap: 12px;
  border-radius: 12px;
  background: #504C40;
`;

const CategoryTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0px;
`;

const HomeLobbyCategory = styled.div`
  width: 100%;
`;

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  width: 100%;
  align-self: stretch;
  gap: 15px;
`;

const SlotCategoryContent = styled.div`
  width: 100%;
  row-gap: 15px;
  column-gap: 31px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
`;

type GameTypeItem = {
  key: string;
  name: string;
  imgUrl: string;
  text: string | any;
  gameType: GameTypeEnum;
};

const HomeCategory = () => {
  const history = useHistory();
  const { account } = useAccountStore();
  const { handleChangeGameType, providerList, activeGameType } = useHomeGameContext();
  const gameTypeList = useGameTypeList();
  const { allGameList, hotGameList, newGameList, isLoading } = useGetHomeCategoryList();
  const recommendGameList = [
    {
      name: "Game1",
      imgUrl: recommend_game1,
    },
    {
      name: "Game2",
      imgUrl: recommend_game2,
    },
    {
      name: "Game3",
      imgUrl: recommend_game3,
    }
  ]

  const launchLobbyGame = (gpcode: string) => {
    if (!account.token) {
      history.push("/login");
      return;
    }

    if (activeGameType === GameTypeEnum.COCKFIGHT) {
      if (gpcode === "SM01") {
        const gameWindow = window.open("", "Cockfight");
        if (gameWindow) {
          GameService.GetCockfight()
            .then((res) => {
              gameWindow.document.write(res?.data);
              gameWindow.document.close();
              gameWindow.focus();
            })
            .catch(() => {
              gameWindow.close();
            });
        }
      } else {
        Common.closePreviousPopup();
        Common.PopupCenter(`/joinlobbygame/${GameTypeEnum.SPORTS}/${gpcode}`, "gamewindow");
      }
    } else {
      const audioElement = document.getElementById("audio") as HTMLAudioElement | null;
      if (audioElement) {
        audioElement.volume = 0;
      }
      Common.closePreviousPopup();
      Common.PopupCenter(`/joinlobbygame/${activeGameType}/${gpcode}`, "gamewindow");
    }
  };

  const handleViewAllClick = (gameType: GameTypeEnum) => {
    handleChangeGameType(gameType);
    const activeGameTypeKey = gameTypeList.find((item) => item.gameType === gameType)?.key;
    history.push(`/main/${activeGameTypeKey}`);
  };

  const liveCasinoList = providerList.filter((provider) => {
    return provider.gametypes.includes(GameTypeEnum.LIVELOBBY);
  })

  return (
    <HomeCategoryContainer>
      <RankingContainer>
        <RecommendContainer>
          <CategoryLabel imageUrl={recommend_home} text={"Reocmmend"} />
          <GameColumnWrapper>
            {recommendGameList.map((gameItem, index) => (
              <RecommendGameCard key={index} $imgUrl={gameItem.imgUrl}></RecommendGameCard>
            ))}
          </GameColumnWrapper>
        </RecommendContainer>
        <JackPotContainer></JackPotContainer>
        <LatestContainer>
          <CategoryLabel imageUrl={latest_home} text={"Latest winners"} />
          <GameColumnWrapper>
            <LatestWinnerCard>
              <img src={game_icon} alt={"game_icon"} />
              <div>First Person Lightning Bacca...</div>
              <div>₱52,360x</div>
            </LatestWinnerCard>
            <LatestWinnerCard>
              <img src={game_icon} alt={"game_icon"} />
              <div>First Person Lightning Bacca...</div>
              <div>₱52,360x</div>
            </LatestWinnerCard>
            <LatestWinnerCard>
              <img src={game_icon} alt={"game_icon"} />
              <div>First Person Lightning Bacca...</div>
              <div>₱52,360x</div>
            </LatestWinnerCard>
            <LatestWinnerCard>
              <img src={game_icon} alt={"game_icon"} />
              <div>First Person Lightning Bacca...</div>
              <div>₱52,360x</div>
            </LatestWinnerCard>
          </GameColumnWrapper>
        </LatestContainer>
      </RankingContainer>

      <HomeLobbyCategory>
        <CategoryTitle>
          <CategoryLabel imageUrl={live_home} text={"Live Casino"} />
          <ButtonText
            size="small"
            text={"More"}
            onClick={() => handleViewAllClick(GameTypeEnum.LIVELOBBY)}
          />
        </CategoryTitle>
        <CategoryContent>
          {liveCasinoList.slice(0, 4).map((provider) => {
            const { code: gpCode, status, name } = provider;

            if (gpCode === "BC") return null;
            return (
              <LobbyVendorCard
                key={gpCode}
                bgUrl={`/assets/images/home/desktop/liveCasino/bg.png`}
                imageUrl={`/assets/images/home/desktop/liveCasino/${gpCode}.png`}
                venderLogoUrl={`/assets/images/home/provider_logo/liveCasino/${gpCode}.png`}
                launchGame={() => launchLobbyGame(gpCode)}
                status={status}
                venderName={name}
              />
            );
          })}
        </CategoryContent>
      </HomeLobbyCategory>
      <HomeLobbyCategory>
        <CategoryTitle><CategoryLabel imageUrl={slot_home} text={"Slot Games"} />
          <ButtonText
            size="small"
            text={"More"}
            onClick={() => handleViewAllClick(GameTypeEnum.SLOT)}
          />
        </CategoryTitle>
        <SlotCategoryContent>
          {allGameList.slice(0, 18).map((gameItem) => {
            return (
              <GameCard
                key={gameItem.id}
                gameItem={gameItem}
                isActive={gameItem.isactive}
                imageUrl={`${config.sourceUrl
                  }${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${gameItem.code
                  }.jpg`}
              />
            );
          })}
        </SlotCategoryContent>
      </HomeLobbyCategory>
    </HomeCategoryContainer>
  );
};

export default HomeCategory;
