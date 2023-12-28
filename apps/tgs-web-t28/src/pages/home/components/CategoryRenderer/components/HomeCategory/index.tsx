import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import { useGetHomeCategoryList, useHomeGameContext, useJackpot } from "@tgs-web-nx/core/features";
import { Common, i18n } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import GameCard from "../../../GameCard";
import DesktopVendorCard from "../../../VendorCard/desktop";
import WinnerCard from "../../../WinnerCard";
import MobileFooter from "../../../MobileFooter";
import sport from "@/assets/t28/images/home/home_sport.svg";
import live_casino from "@/assets/t28/images/home/home_live_casino.svg";
import slot from "@/assets/t28/images/home/home_slot.svg";
import hot from "@/assets/t28/images/home/home_hot.svg";
import jackpotBG from "@/assets/t28/images/home/jackpotBG.png";
import jackpotImg from "@/assets/t28/images/home/JackpotImg.png";
import { media } from "@/theme/breakpoints";
import { useBettingHistory } from "@/pages/home/components/WinnerCard/hooks/useBettingHistory";

const DesktopContainer = styled.div`
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  padding: 15px 0px;
`;

const GameContainer = styled.div`
  width: 100%;
  overflow: auto;
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const GameTypeTitle = styled.div`
  font-size: 28px;
  font-weight: 510;
  line-height: 31px;
  letter-spacing: 0em;
  text-align: left;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 4px;
  & > img {
    width: 36px;
    height: 36px;
  }
`;

// const GameSubTitle = styled.div`
//   font-size: 14px;
//   font-weight: 510;
//   line-height: 21px;
//   letter-spacing: 0em;
//   text-align: left;
//   color: ${({ theme }) => theme.gray};
// `;

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
// type GameTypeItem = {
//   key: string;
//   name: string;
//   imgUrl: string;
//   text: string | any;
//   gameType: GameTypeEnum;
// };

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

  // const handleClick = (gameTypeItem: GameTypeItem) => {
  //   handleChangeGameType(gameTypeItem.gameType);
  //   history.push(`/main/${gameTypeItem.key}`);
  // };

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

  // if (isDesktopSize) {
  return (
    <DesktopContainer>
      <GameTypeContainer>
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
          <img src={slot} alt="slot" />
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
          <img src={live_casino} alt="slot" />
          {i18n.t("common.live")}
        </GameTypeTitle>
        <GameContainer>
          {liveCasinoList.map((provider) => {
            const { code: gpCode, status, name } = provider;

            if (gpCode === "BC") return null;
            return (
              <DesktopVendorCard
                key={gpCode}
                bgUrl={`${import.meta.env.BASE_URL}assets/images/home/desktop/liveCasino/bg.png`}
                imageUrl={`${
                  import.meta.env.BASE_URL
                }assets/images/home/desktop/liveCasino/${gpCode}.png`}
                venderLogoUrl={`${
                  import.meta.env.BASE_URL
                }assets/images/home/provider_logo/liveCasino/${gpCode}.png`}
                launchGame={() => launchLobbyGame(gpCode)}
                status={status}
                venderName={name}
              />
            );
          })}
        </GameContainer>
        <GameTypeTitle>
          <img src={sport} alt="sports" />
          {i18n.t("common.sports")}
        </GameTypeTitle>
        <GameContainer>
          {sportList.map((provider) => {
            const { code: gpCode, status, name } = provider;

            if (gpCode === "BC") return null;
            return (
              <DesktopVendorCard
                key={gpCode}
                bgUrl={`${import.meta.env.BASE_URL}assets/images/home/desktop/sports/bg.png`}
                imageUrl={`${
                  import.meta.env.BASE_URL
                }assets/images/home/desktop/sports/${gpCode}.png`}
                venderLogoUrl={`${
                  import.meta.env.BASE_URL
                }assets/images/home/provider_logo/sports/${gpCode}.png`}
                launchGame={() => launchLobbyGame(gpCode)}
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
// };

export default HomeCategory;
