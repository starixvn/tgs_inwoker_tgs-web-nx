import config from "@tgs-web-nx/config";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import { useGetHomeCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { Common, i18n, utility } from "@tgs-web-nx/utils";
import useEmblaCarousel from "embla-carousel-react";
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
  margin-top: 2.4rem;
  margin-bottom: 0.8rem;
  gap: 0.8rem;

  &:first-child {
    margin-top: 0;
  }

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

const ProvideItem = styled.div`
  background-color: #1c2532;
  width: 113px;
  height: 60px;
  border-radius: 1rem;

  > img {
    max-width: 100%;
  }
`;

const NoGame = styled.div`
  border: 1px solid grey;
  width: 14rem;
  height: 18.9rem;
  border-radius: 1rem;
`;

const HomeCategory = () => {
  const history = useHistory();
  const { account } = useAccountStore();
  const { providerList, activeGameType } = useHomeGameContext();
  const { hotSlotGameList, newGameList, hotGameList, hotTableGameList } = useGetHomeCategoryList();
  const liveCasinoList = providerList.filter((provider) => {
    return provider.gametypes.includes(GameTypeEnum.LIVELOBBY);
  });
  const sportList = providerList.filter((provider) => {
    return provider.gametypes.includes(GameTypeEnum.SPORTS);
  });

  const [emblaSportRef] = useEmblaCarousel({ dragFree: true });
  const [emblaPopularSlotsRef] = useEmblaCarousel({ dragFree: true });
  const [emblaLiveCasinoRef] = useEmblaCarousel({ dragFree: true });
  const [emblaNewReleaseRef] = useEmblaCarousel({ dragFree: true });
  const [emblaGameProvidersRef] = useEmblaCarousel({ dragFree: true });
  const [emblaHotGamesRef] = useEmblaCarousel({ dragFree: true });

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

        <section className="embla">
          <div className="embla__viewport" ref={emblaSportRef}>
            <div className="embla__container">
              {sportList.map((item, index) => {
                const { code: gpCode, status, name } = item;

                if (gpCode === "BC") return null;
                return (
                  <div className="embla__slide" key={index}>
                    <DesktopVendorCard
                      key={gpCode}
                      bgUrl={`${utility.imagePathGenerator("home/desktop/sports/bg.png")}`}
                      imageUrl={`${utility.imagePathGenerator(
                        `home/desktop/sports/${gpCode}.png`,
                      )}`}
                      venderLogoUrl={`${utility.imagePathGenerator(
                        `home/provider_logo/sports/${gpCode}.png`,
                      )}`}
                      launchGame={() => launchLobbyGame(gpCode, GameTypeEnum.SPORTS)}
                      status={status}
                      venderName={name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <GameTypeTitle>
          <img src="/assets/images/common/icon-popular-slots.svg" alt="slot" />
          Popular Slots
          <ViewAll>View All</ViewAll>
        </GameTypeTitle>
        <section className="embla">
          <div className="embla__viewport" ref={emblaPopularSlotsRef}>
            <div className="embla__container two-rows">
              {hotSlotGameList.map((item, index) => {
                return (
                  <div className="embla__slide" key={index}>
                    <GameCard
                      key={item.id}
                      gameItem={item}
                      isActive={item.isactive}
                      imageUrl={`${
                        config.sourceUrl
                      }${item.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                        item.code
                      }.jpg`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <GameTypeTitle>
          <img src="/assets/images/common/icon-live-casino-group.svg" alt="slot" />
          {i18n.t("common.live")}
          <ViewAll>View All</ViewAll>
        </GameTypeTitle>
        <section className="embla">
          <div className="embla__viewport" ref={emblaLiveCasinoRef}>
            <div className="embla__container">
              {liveCasinoList.map((item, index) => {
                const { code: gpCode, status, name } = item;

                if (gpCode === "BC") return null;
                return (
                  <div className="embla__slide" key={index}>
                    <DesktopVendorCard
                      key={gpCode}
                      bgUrl={`${utility.imagePathGenerator("home/desktop/liveCasino/bg.png")}`}
                      imageUrl={`${utility.imagePathGenerator(
                        `home/desktop/liveCasino/${gpCode}.png`,
                      )}`}
                      venderLogoUrl={`${utility.imagePathGenerator(
                        `home/provider_logo/liveCasino/${gpCode}.png`,
                      )}`}
                      launchGame={() => launchLobbyGame(gpCode, GameTypeEnum.LIVE)}
                      status={status}
                      venderName={name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <GameTypeTitle>
          <img src="/assets/images/common/icon-new-release.svg" alt="hot" />
          New Release
          <ViewAll>View All</ViewAll>
        </GameTypeTitle>
        <section className="embla">
          <div className="embla__viewport" ref={emblaNewReleaseRef}>
            <div className="embla__container">
              {newGameList.map((item, index) => {
                return (
                  <div className="embla__slide" key={index}>
                    <GameCard
                      key={item.id}
                      gameItem={item}
                      isActive={item.isactive}
                      imageUrl={`${
                        config.sourceUrl
                      }${item.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                        item.code
                      }.jpg`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <GameTypeTitle>
          <img src="/assets/images/common/icon-game-providers.svg" alt="hot" />
          Game Providers
          <ViewAll>View All</ViewAll>
        </GameTypeTitle>
        <section className="embla">
          <div className="embla__viewport" ref={emblaGameProvidersRef}>
            <div className="embla__container providers two-rows">
              {providerList.map((provider, index) => {
                return (
                  <div className="embla__slide " key={index}>
                    <ProvideItem>
                      <img
                        src={utility.imagePathGenerator(
                          `provider/dark/${provider.code.toLowerCase()}.png`,
                        )}
                        alt="Provider"
                      />
                    </ProvideItem>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <GameTypeTitle>
          <img src="/assets/images/common/icon-table-game-group.svg" alt="hot" />
          Table Game
          <ViewAll>View All</ViewAll>
        </GameTypeTitle>
        <section className="embla">
          <div className="embla__viewport" ref={emblaHotGamesRef}>
            <div className="embla__container">
              {hotTableGameList.length === 0 && <NoGame></NoGame>}
              {hotTableGameList.map((gameItem, index) => {
                return (
                  <div className="embla__slide" key={index}>
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
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <GameTypeTitle>
          <img src="/assets/images/common/icon-new-release.svg" alt="hot" />
          Hot Games
          <ViewAll>View All</ViewAll>
        </GameTypeTitle>
        <section className="embla">
          <div className="embla__viewport" ref={emblaHotGamesRef}>
            <div className="embla__container">
              {hotGameList.map((gameItem, index) => {
                return (
                  <div className="embla__slide" key={index}>
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
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </GameTypeContainer>
    </DesktopContainer>
  );
};

export default HomeCategory;
