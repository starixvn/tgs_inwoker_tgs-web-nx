import hot from "@/assets/t28/images/home/home_hot.svg";
import jackpotBG from "@/assets/t28/images/home/jackpotBG.png";
import jackpotImg from "@/assets/t28/images/home/jackpotImg.png";
import { useBettingHistory } from "@/pages/home/components/WinnerCard/hooks/useBettingHistory";
import { media } from "@/theme/breakpoints";
import config from "@tgs-web-nx/config";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import { useGetHomeCategoryList, useHomeGameContext, useJackpot } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { Common, i18n, utility } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import GameCard from "../../../GameCard";
import MobileFooter from "../../../MobileFooter";
import DesktopVendorCard from "../../../VendorCard/desktop";
import WinnerCard from "../../../WinnerCard";
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
  gap: 1.6rem;
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
  cursor: "pointer";
`;

const GameTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const JackpotContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${jackpotBG});
  background-size: cover;
  gap: 16px;

  ${media.sm} {
    flex-direction: unset;
  }
`;

const JackpotImgContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  & > img {
    width: 100%;
  }
`;
const JackpotAmount = styled.div`
  position: absolute;
  top: 30%;
  left: 20%;
  font-size: 32px;
  font-weight: 700;
  line-height: 37px;
  letter-spacing: 0.1em;
  text-align: center;
  color: ${({ theme }) => theme.yellow};
  ${media.sm} {
    font-size: 40px;
    line-height: 48px;
  }
`;

const HomeCategory = () => {
  const history = useHistory();
  const { account } = useAccountStore();
  const { isMobileSize } = useRwd();
  const { jackpotAmount } = useJackpot();
  const { providerList, activeGameType } = useHomeGameContext();
  const { hotGameList, newGameList } = useGetHomeCategoryList();
  const { leaderboard } = useBettingHistory();
  const liveCasinoList = providerList.filter((provider) => {
    return provider.gametypes.includes(GameTypeEnum.LIVELOBBY);
  });
  const sportList = providerList.filter((provider) => {
    return provider.gametypes.includes(GameTypeEnum.SPORTS);
  });

  const formatAmount = (amount: number, locales = "en-US") => {
    return amount.toLocaleString(locales, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
      useGrouping: true,
    });
  };

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
                venderLogoUrl={`${utility.imagePathGenerator(`home/provider_logo/sports/${gpCode}.png`)}`}
                launchGame={() => launchLobbyGame(gpCode, GameTypeEnum.SPORTS)}
                status={status}
                venderName={name}
              />
            );
          })}
        </GameContainer>
        <GameTypeTitle>
          <img src="/assets/images/common/icon-popular-slots.svg" alt="slot" />
          {i18n.t("common.slots")}
        </GameTypeTitle>
        <GameContainer>
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
        </GameContainer>
        <GameTypeTitle>
          <img src={hot} alt="hot" />
          {i18n.t("slot.newGame")}
        </GameTypeTitle>
        {/* <GameSubTitle>Most recently played games</GameSubTitle> */}
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
          <img src="/assets/images/common/icon-live-casino-group.svg" alt="slot" />
          {i18n.t("common.live")}
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
      </GameTypeContainer>
      <JackpotContainer>
        <JackpotImgContainer>
          <img src={jackpotImg} alt="jackpot" />
          <JackpotAmount>{formatAmount(jackpotAmount, "vi-VN")}</JackpotAmount>
        </JackpotImgContainer>
        <WinnerCard leaderboard={leaderboard} />
      </JackpotContainer>
      {isMobileSize && <MobileFooter />}
    </DesktopContainer>
  );
};

export default HomeCategory;
