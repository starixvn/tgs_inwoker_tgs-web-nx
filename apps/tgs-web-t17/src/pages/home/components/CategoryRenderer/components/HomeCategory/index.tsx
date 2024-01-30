import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import { useGetHomeCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { Common, i18n } from "@tgs-web-nx/utils";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import ButtonText from "@/pages/home/components/ButtonText";
import CategoryLabel from "./components/CategoryLabel";
import VendorCard from "@/pages/home/components/VendorCard";
import GameCard from "@/pages/home/components/GameCard";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import config from "@tgs-web-nx/config";
import { usePromotionPage, useRwd } from "@tgs-web-nx/core/hooks";
import HomePromotionCard from "@/pages/promotion/components/HomePromotionCard";

const HomeCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  
  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
  }
`;

const CategoryTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
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
  gap: 20px;
  overflow-x: hidden;
`;

const LobbyCategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  width: 100%;
  flex: 1;
  flex-shrink: 0;
  gap: 8px;

  ${media.sm} {
    max-height: unset;
    overflow-x: unset;
  }
`;

const PromotionContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  width: 100%;
  gap: 23px;
  overflow-x: hidden;
`;

const HomeCategory = () => {
  const history = useHistory();
  const { account } = useAccountStore();
  const { handleChangeGameType, providerList, activeGameType } = useHomeGameContext();
  const gameTypeList = useGameTypeList();
  const { hotGameList } = useGetHomeCategoryList();
  const { isMobileSize, isDesktopSize } = useRwd();
  const { promotionList } = usePromotionPage();

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
    if (!gameType) {
      history.push(`/promotion-list`);
    } else {
      history.push(`/main/${activeGameTypeKey}`);
    }
  };

  const liveCasinoList = providerList.filter((provider) => {
    return provider.gametypes.includes(GameTypeEnum.LIVELOBBY);
  })

  return (
    <>
      <HomeCategoryContainer>
        <HomeLobbyCategory>
          <CategoryTitle>
            <CategoryLabel text={"Hot Games"} />
            <ButtonText
              size="small"
              text={"More"}
              onClick={() => handleViewAllClick(GameTypeEnum.SLOT)}
            />
          </CategoryTitle>
          <CategoryContent>
            {isMobileSize && hotGameList.slice(0, 6).map((gameItem) => {
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
            {isDesktopSize && hotGameList.slice(0, 16).map((gameItem) => {
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
          </CategoryContent>
        </HomeLobbyCategory>
      </HomeCategoryContainer>

      <HomeCategoryContainer>
        <HomeLobbyCategory>
          <CategoryTitle>
            <CategoryLabel text={"Promotion"} />
            <ButtonText
              size="small"
              text={"More"}
              onClick={() => handleViewAllClick(GameTypeEnum.NONE)}
            />
          </CategoryTitle>
          <PromotionContent>
            {promotionList
              .sort((a, b) => a.order - b.order)
              .slice(0, 2)
              .map((promotionData) => (
                <HomePromotionCard key={promotionData.id} promotionData={promotionData} />
              ))}
          </PromotionContent>
        </HomeLobbyCategory>
      </HomeCategoryContainer>

      <HomeCategoryContainer>
        <HomeLobbyCategory>
          <CategoryTitle>
            <CategoryLabel text={"Live Casino"} />
            <ButtonText
              size="small"
              text={"More"}
              onClick={() => handleViewAllClick(GameTypeEnum.LIVELOBBY)}
            />
          </CategoryTitle>
          <LobbyCategoryContent>
            {liveCasinoList.slice(0, 2).map((provider) => {
              const { code: gpCode, status, name } = provider;

              if (gpCode === "BC") return null;
              return (
                <VendorCard
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
          </LobbyCategoryContent>
        </HomeLobbyCategory>
      </HomeCategoryContainer>
    </>
  );
};

export default HomeCategory;
