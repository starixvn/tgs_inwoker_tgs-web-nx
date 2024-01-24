import styled from "styled-components";
import { usePromotionPage, useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import { useGetHomeCategoryList, useHomeGameContext, useJackpot } from "@tgs-web-nx/core/features";
import { Common, i18n } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import DesktopVendorCard from "../../../VendorCard/desktop";
import CategoryLabel from "./components/CategoryLabel";
import InfoCardList from "./components/InfoCardList";
import WinnerCard from "@/pages/home/components//WinnerCard";
import { useBettingHistory } from "@/pages/home/components/WinnerCard/hooks/useBettingHistory";
import LobbyVendorCard from "@/pages/home/components/VendorCard/LobbyVendorCard";
import GameCard from "@/pages/home/components/GameCard";
import ButtonText from "@/pages/home/components/ButtonText";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import Jackpot from "@/components/project/Jackpot";

import slot_home from "@/assets/t26/images/home/slot_home.svg";
import live_home from "@/assets/t26/images/home/live_home.svg";
import game_home from "@/assets/t26/images/home/game_home.svg";
import cardGameImg from "@/assets/t26/images/home/cardgame_home.png";
import eGameImg from "@/assets/t26/images/home/egame_home.png";
import fishImg from "@/assets/t26/images/home/fish_home.png";
import cockfightImg from "@/assets/t26/images/home/cockfight_home.png";
import sportBG from "@/assets/t26/images/home/sportBG.png";
import sportsImg from "@/assets/t26/images/home/sports_home.png";
import soccerballImg from "@/assets/t26/images/home/soccerball.png";
import BannerImage from "@/pages/promotion/components/BannerImage";

const DesktopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  padding: 15px 0px;
  gap: 30px;
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
  column-gap: 30px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
`;

const GameTypeContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const NonLobbyTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const GameTypeCard = styled.div`
  display: flex;
  align-items: center;
  min-width: 326px;
  min-height: 156px;
  border-radius: 10px;
  background: linear-gradient(102.3deg, #cc9043 0.46%, #3a3a3a 42.8%);
`;

const SportsCard = styled(GameTypeCard)`
  position: relative;
  min-width: 519px;
  min-height: 320px;
  border-radius: 10px;
  background-image: url(${sportBG});
  background-repeat: no-repeat;
  background-size: contain;
  justify-content: space-between;
`;

const GameTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;
  gap: 10px;
`;

const SportsTextWrapper = styled(GameTextWrapper)`
  gap: 14px;
`;

const GameTypeTitle = styled.div`
  font-size: 30px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0em;
  color: ${({ theme }) => theme.primary};
`;

const SportsTitle = styled(GameTypeTitle)`
  font-size: 50px;
  font-weight: 700;
  line-height: 53px;
  letter-spacing: 0em;
`;

const GameButton = styled.div`
  min-width: 127px;
  min-height: 30px;
  border-radius: 10px;
  border: 1px;
  text-align: center;
  background: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.primary};
  border: ${({ theme }) => `1px solid ${theme.primary}`};
  font-size: 20px;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SportsButton = styled(GameButton)`
  width: 189px;
  height: 44px;
  font-size: 28px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: center;
  z-index: 2;
`;

const PromotionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const PromotionContent = styled.div`
  width: 48%;
  padding: 20px;
  gap: 48px;
  background-image: url(${sportBG});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  & img {
    height: fit-content;
  }
`;

const PromotionDetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PromotionTitle = styled.div`
  font-size: 25px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0em;
`;

const PromotionButon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 44px;
  border-radius: 10px;
  background: #00000078;
  border: ${({ theme }) => `1px solid ${theme.primary}`};
  cursor: pointer;
  font-size: 20px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
`;

const HomeCategory = () => {
  const history = useHistory();
  const { isDesktopSize } = useRwd();
  const { account } = useAccountStore();
  const { handleChangeGameType, providerList, activeGameType } = useHomeGameContext();
  const { hotGameList } = useGetHomeCategoryList();
  const { promotionList } = usePromotionPage();
  const { leaderboard } = useBettingHistory();
  const gameTypeList = useGameTypeList();

  const handleActiveGametype = (gameType: GameTypeEnum) => {
    handleChangeGameType(gameType);
    const activeGameTypeKey = gameTypeList.find((item) => item.gameType === gameType)?.key;
    history.push(`/main/${activeGameTypeKey}`);
  };

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
      Common.PopupCenter(`/joinlobbygame/${GameTypeEnum.LIVELOBBY}/${gpcode}`, "gamewindow");
    }
  };

  const liveCasinoList = providerList.filter((provider) => {
    return provider.gametypes.includes(GameTypeEnum.LIVELOBBY);
  });

  return (
    <DesktopContainer>
      <Jackpot />
      <InfoCardList />
      <HomeLobbyCategory>
        <CategoryTitle>
          <CategoryLabel imageUrl={live_home} text={i18n.t("common.live")} />
          <ButtonText
            size="small"
            text={i18n.t("common.more")}
            onClick={() => handleActiveGametype(GameTypeEnum.LIVELOBBY)}
          />
        </CategoryTitle>
        <CategoryContent>
          {liveCasinoList.slice(0, 4).map((provider) => {
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
              // <LobbyVendorCard
              //   key={gpCode}
              //   bgUrl={`/assets/images/home/desktop/liveCasino/bg.png`}
              //   imageUrl={`/assets/images/home/desktop/liveCasino/${gpCode}.png`}
              //   venderLogoUrl={`/assets/images/home/provider_logo/liveCasino/${gpCode}.png`}
              //   launchGame={() => launchLobbyGame(gpCode)}
              //   status={status}
              //   venderName={name}
              // />
            );
          })}
        </CategoryContent>
      </HomeLobbyCategory>
      <HomeLobbyCategory>
        <CategoryTitle>
          <CategoryLabel imageUrl={game_home} text={"Featured Products"} />
        </CategoryTitle>
        <CategoryContent>
          <GameTypeContainer>
            <NonLobbyTypeContainer>
              <GameTypeCard>
                <GameTextWrapper>
                  <GameTypeTitle>{i18n.t("common.chess")}</GameTypeTitle>
                  <GameButton onClick={() => handleActiveGametype(GameTypeEnum.QIPAILOBBY)}>
                    Go Play
                  </GameButton>
                </GameTextWrapper>
                <img src={cardGameImg} alt="card game" />
              </GameTypeCard>

              <GameTypeCard>
                <GameTextWrapper>
                  <GameTypeTitle>{i18n.t("common.egame")}</GameTypeTitle>
                  <GameButton onClick={() => handleActiveGametype(GameTypeEnum.TABLEGAME)}>
                    Go Play
                  </GameButton>
                </GameTextWrapper>
                <img src={eGameImg} alt="egame" />
              </GameTypeCard>
            </NonLobbyTypeContainer>
            <NonLobbyTypeContainer>
              <GameTypeCard>
                <GameTextWrapper>
                  <GameTypeTitle>{i18n.t("common.fish")}</GameTypeTitle>
                  <GameButton onClick={() => handleActiveGametype(GameTypeEnum.FISH)}>
                    Go Play
                  </GameButton>
                </GameTextWrapper>
                <img src={fishImg} alt="fish" />
              </GameTypeCard>
              <GameTypeCard>
                <GameTextWrapper>
                  <GameTypeTitle>{i18n.t("common.cockfight")}</GameTypeTitle>
                  <GameButton onClick={() => handleActiveGametype(GameTypeEnum.COCKFIGHT)}>
                    Go Play
                  </GameButton>
                </GameTextWrapper>
                <img src={cockfightImg} alt="cockfight" />
              </GameTypeCard>
            </NonLobbyTypeContainer>
            <SportsCard>
              <SportsTextWrapper>
                <SportsTitle>{i18n.t("common.sports")}</SportsTitle>
                <SportsButton onClick={() => handleActiveGametype(GameTypeEnum.SPORTS)}>
                  Go Play
                </SportsButton>
              </SportsTextWrapper>
              <img
                src={soccerballImg}
                alt="ball"
                style={{ position: "absolute", bottom: 0, left: "30%" }}
              />
              <img src={sportsImg} alt="sports" />
            </SportsCard>
          </GameTypeContainer>
        </CategoryContent>
      </HomeLobbyCategory>
      <HomeLobbyCategory>
        <CategoryTitle>
          <CategoryLabel imageUrl={slot_home} text={i18n.t("common.slot")} />
          <ButtonText
            size="large"
            text={i18n.t("common.more")}
            onClick={() => handleActiveGametype(GameTypeEnum.SLOT)}
          />
        </CategoryTitle>
        <SlotCategoryContent>
          {hotGameList.slice(0, 18).map((gameItem) => {
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
        </SlotCategoryContent>
      </HomeLobbyCategory>
      <HomeLobbyCategory>
        <PromotionContainer>
          <PromotionContent>
            {/* todo: 輪播功能 */}
            {promotionList[0] && <BannerImage promotionData={promotionList[0]} />}
            <PromotionDetailWrapper>
              <PromotionTitle>{promotionList[0]?.subSubject}</PromotionTitle>
              <PromotionButon
                onClick={() => {
                  history.push(`/promotion/${promotionList[0].id}`);
                }}
              >
                Details
              </PromotionButon>
            </PromotionDetailWrapper>
          </PromotionContent>
          <WinnerCard leaderboard={leaderboard} />
        </PromotionContainer>
      </HomeLobbyCategory>
    </DesktopContainer>
  );
};

export default HomeCategory;
