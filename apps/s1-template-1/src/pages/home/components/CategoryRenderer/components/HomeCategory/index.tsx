import config from "@tgs-web-nx/config";
import { GameTypeEnum, media } from "@tgs-web-nx/constants";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import { useGetHomeCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { Common, i18n, utility } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import GameCard from "../../../GameCard";
import DesktopVendorCard from "../../../VendorCard/desktop";
import RecentBigWins from "./components/RecentBigWins";

const DesktopContainer = styled.div`
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  padding: 1.8rem 0;
`;

const GameContainer = styled.div`
  width: 100%;
  overflow: auto;
  display: flex;
  gap: 0.8rem;
  margin-bottom: 2.4rem;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const GameTypeTitle = styled.div`
  font-size: 2rem;
  font-weight: 510;
  line-height: 1.5;
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  gap: 0.8rem;

  & > img {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const ViewAll = styled.div`
  position: absolute;
  right: 0.8rem;
  color: ${({ theme }) => theme.viewAllLinkColor};
  font-size: 1.3rem;
  cursor: pointer;
`;

const GameTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TwoRowsContainer = styled.div`
  --grid-num: 2.2;
  --grid-rows: 2;
  --grid-gap: 0.8rem;
  --min-width: 140px;

  width: 100%;
  display: grid;
  grid-template-rows: repeat(var(--grid-rows), 1fr);
  grid-auto-flow: column;
  grid-auto-columns: calc(
    100% / var(--grid-num) -(var(--grid-num) - 1) * var(--grid-gap) / var(--grid-num)
  );
  gap: var(--grid-gap);

  ${media.sm} {
    --grid-num: 5;
    --grid-rows: 1;
  }
`;

const ProvideItem = styled.div`
  background-color: #1c2532;
  width: 113px;
  height: 60px;
  border-radius: 1rem;

  > img {
    max-width: 100%;
  }
`;

const HomeCategory = () => {
  const history = useHistory();
  const { account } = useAccountStore();
  const { isMobileSize } = useRwd();
  const { providerList, activeGameType } = useHomeGameContext();
  const { hotGameList, newGameList } = useGetHomeCategoryList();
  const liveCasinoList = providerList.filter((provider) => {
    return provider.gametypes.includes(GameTypeEnum.LIVELOBBY);
  });
  const sportList = providerList.filter((provider) => {
    return provider.gametypes.includes(GameTypeEnum.SPORTS);
  });

  const launchLobbyGame = (gpcode: string, gtype: GameTypeEnum = GameTypeEnum.SPORTS) => {
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
        Common.PopupCenter(`/joinlobbygame/${gtype}/${gpcode}`, "gamewindow");
      }
    } else {
      const audioElement = document.getElementById("audio") as HTMLAudioElement | null;
      if (audioElement) {
        audioElement.volume = 0;
      }
      Common.closePreviousPopup();
      Common.PopupCenter(`/joinlobbygame/${gtype}/${gpcode}`, "gamewindow");
    }
  };

  const recentBigWins = [
    { name: "Itslon1", amount: 666465825, code: "itslon1" },
    { name: "Janganmurated", amount: 729129982, code: "janganmurated" },
    { name: "PERDITA", amount: 666465825, code: "perdita" },
  ];

  console.log(utility.imagePathGenerator("home/desktop/liveCasino/bg.png"));

  return (
    <DesktopContainer>
      <GameTypeContainer>
        <GameTypeTitle>
          <img src="/assets/images/common/icon-big-wins.svg" alt="hot" />
          Recent Big Wins
        </GameTypeTitle>
        <GameContainer>
          <RecentBigWins recentBigWins={recentBigWins}></RecentBigWins>
        </GameContainer>
        <GameTypeTitle>
          <img src="/assets/images/common/icon-sports-group.svg" alt="hot" />
          {i18n.t("common.sports")}
          <ViewAll>View All</ViewAll>
        </GameTypeTitle>
        <GameContainer>
          {sportList.map((provider) => {
            const { code: gpCode, status, name } = provider;

            if (gpCode === "BC") return null;
            return (
              <DesktopVendorCard
                key={gpCode}
                bgUrl={`${utility.imagePathGenerator("home/desktop/sports/bg.png")}`}
                imageUrl={`${utility.imagePathGenerator(`home/desktop/sports/${gpCode}.png`)}`}
                venderLogoUrl={`${utility.imagePathGenerator(
                  `home/provider_logo/sports/${gpCode}.png`,
                )}`}
                launchGame={() => launchLobbyGame(gpCode, GameTypeEnum.SPORTS)}
                status={status}
                venderName={name}
              />
            );
          })}
        </GameContainer>
        <GameTypeTitle>
          <img src="/assets/images/common/icon-popular-slots.svg" alt="slot" />
          {/* {i18n.t("common.slots")} */}
          Popular Slots
          <ViewAll>View All</ViewAll>
        </GameTypeTitle>
        <GameContainer>
          <TwoRowsContainer>
            {hotGameList.slice(0, 20).map((gameItem) => {
              return (
                <GameCard
                  key={gameItem.id}
                  gameItem={gameItem}
                  isActive={gameItem.isactive}
                  imageUrl={`${
                    config.sourceUrl
                  }${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                    gameItem.code
                  }.jpg`}
                />
              );
            })}
          </TwoRowsContainer>
        </GameContainer>
        <GameTypeTitle>
          <img src="/assets/images/common/icon-live-casino-group.svg" alt="slot" />
          {i18n.t("common.live")}
          <ViewAll>View All</ViewAll>
        </GameTypeTitle>
        <GameContainer>
          {liveCasinoList.map((provider) => {
            const { code: gpCode, status, name } = provider;

            if (gpCode === "BC") return null;
            return (
              <DesktopVendorCard
                key={gpCode}
                bgUrl={`${utility.imagePathGenerator("home/desktop/liveCasino/bg.png")}`}
                imageUrl={`${utility.imagePathGenerator(`home/desktop/liveCasino/${gpCode}.png`)}`}
                venderLogoUrl={`${utility.imagePathGenerator(
                  `home/provider_logo/liveCasino/${gpCode}.png`,
                )}`}
                launchGame={() => launchLobbyGame(gpCode, GameTypeEnum.LIVE)}
                status={status}
                venderName={name}
              />
            );
          })}
        </GameContainer>
        <GameTypeTitle>
          <img src="/assets/images/common/icon-new-release.svg" alt="hot" />
          New Release
          <ViewAll>View All</ViewAll>
        </GameTypeTitle>
        <GameContainer>
          {newGameList.slice(0, 20).map((gameItem) => {
            return (
              <GameCard
                key={gameItem.id}
                gameItem={gameItem}
                isActive={gameItem.isactive}
                imageUrl={`${
                  config.sourceUrl
                }${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                  gameItem.code
                }.jpg`}
              />
            );
          })}
        </GameContainer>
        <GameTypeTitle>
          <img src="/assets/images/common/icon-game-providers.svg" alt="hot" />
          Game Providers
          <ViewAll>View All</ViewAll>
        </GameTypeTitle>
        <GameContainer>
          <TwoRowsContainer>
            {providerList &&
              providerList.map((provider) => {
                return (
                  <ProvideItem>
                    <img
                      src={utility.imagePathGenerator(
                        `provider/dark/${provider.code.toLowerCase()}.png`,
                      )}
                      alt="Provider"
                    />
                  </ProvideItem>
                );
              })}
          </TwoRowsContainer>
        </GameContainer>
        <GameTypeTitle>
          <img src="/assets/images/common/icon-new-release.svg" alt="hot" />
          Hot Games
          <ViewAll>View All</ViewAll>
        </GameTypeTitle>
        <GameContainer>
          {newGameList.slice(0, 20).map((gameItem) => {
            return (
              <GameCard
                key={gameItem.id}
                gameItem={gameItem}
                isActive={gameItem.isactive}
                imageUrl={`${
                  config.sourceUrl
                }${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                  gameItem.code
                }.jpg`}
              />
            );
          })}
        </GameContainer>
      </GameTypeContainer>
    </DesktopContainer>
  );
};

export default HomeCategory;
