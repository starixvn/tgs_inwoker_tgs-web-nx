import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { Common, i18n } from "@tgs-web-nx/utils";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import ButtonText from "@/pages/home/components/ButtonText";
import CategoryLabel from "./components/CategoryLabel";
import LobbyVendorCard from "@/pages/home/components/VendorCard/LobbyVendorCard";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import GameTypeTab from "@/pages/home/components/GameTypeTab";

const HomeCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  gap: 14px;
  
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
  gap: 10px;
  max-height: 254px;
  overflow-x: hidden;

  ${media.sm} {
    max-height: unset;
    overflow-x: unset;
  }
`;

const HomeCategory = () => {
  const history = useHistory();
  const { account } = useAccountStore();
  const { handleChangeGameType, providerList, activeGameType } = useHomeGameContext();
  const gameTypeList = useGameTypeList();

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
  const lotteryList = providerList.filter((provider) => {
    return provider.gametypes.includes(GameTypeEnum.LOTTERYLOBBY);
  })
  const sportsList = providerList.filter((provider) => {
    return provider.gametypes.includes(GameTypeEnum.SPORTS);
  })
  const sabongList = providerList.filter((provider) => {
    return provider.gametypes.includes(GameTypeEnum.COCKFIGHT);
  })
  const cardGamegList = providerList.filter((provider) => {
    return provider.gametypes.includes(GameTypeEnum.QIPAILOBBY);
  })
  const esportsList = providerList.filter((provider) => {
    return provider.gametypes.includes(GameTypeEnum.ESPORTS);
  })
  const slotList = providerList.filter((provider) => {
    return provider.gametypes.includes(GameTypeEnum.SLOT);
  })
  const fishList = providerList.filter((provider) => {
    return provider.gametypes.includes(GameTypeEnum.FISH);
  })
  const tableGameList = providerList.filter((provider) => {
    return provider.gametypes.includes(GameTypeEnum.TABLEGAME);
  })
  // to-do : 抽出去useGetVendorList

  return (
    <>
      <GameTypeTab />
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
          <CategoryContent>
            {liveCasinoList.map((provider) => {
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
      </HomeCategoryContainer>

      <HomeCategoryContainer>
        <HomeLobbyCategory>
          <CategoryTitle>
            <CategoryLabel text={"Lottery"} />
            <ButtonText
              size="small"
              text={"More"}
              onClick={() => handleViewAllClick(GameTypeEnum.LOTTERYLOBBY)}
            />
          </CategoryTitle>
          <CategoryContent>
            {lotteryList.slice(0, 2).map((provider) => {
              const { code: gpCode, status, name } = provider;

              return (
                <LobbyVendorCard
                  key={gpCode}
                  bgUrl={`/assets/images/home/desktop/lottery/bg.png`}
                  imageUrl={`/assets/images/home/desktop/lottery/${gpCode}.png`}
                  venderLogoUrl={`/assets/images/home/provider_logo/lottery/${gpCode}.png`}
                  launchGame={() => launchLobbyGame(gpCode)}
                  status={status}
                  venderName={name}
                />
              );
            })}
          </CategoryContent>
        </HomeLobbyCategory>
      </HomeCategoryContainer>

      <HomeCategoryContainer>
        <HomeLobbyCategory>
          <CategoryTitle>
            <CategoryLabel text={"Slot"} />
            <ButtonText
              size="small"
              text={"More"}
              onClick={() => handleViewAllClick(GameTypeEnum.SLOT)}
            />
          </CategoryTitle>
          <CategoryContent>
            {slotList.slice(0, 2).map((provider) => {
              const { code: gpCode, status, name } = provider;

              return (
                <LobbyVendorCard
                  key={gpCode}
                  bgUrl={`/assets/images/home/desktop/slots/bg.png`}
                  imageUrl={`/assets/images/home/desktop/slots/${gpCode}.png`}
                  venderLogoUrl={`/assets/images/home/provider_logo/slots/${gpCode}.png`}
                  launchGame={() => launchLobbyGame(gpCode)}
                  status={status}
                  venderName={name}
                />
              );
            })}
          </CategoryContent>
        </HomeLobbyCategory>
      </HomeCategoryContainer>

      <HomeCategoryContainer>
        <HomeLobbyCategory>
          <CategoryTitle>
            <CategoryLabel text={"Fishing"} />
            <ButtonText
              size="small"
              text={"More"}
              onClick={() => handleViewAllClick(GameTypeEnum.FISH)}
            />
          </CategoryTitle>
          <CategoryContent>
            {fishList.slice(0, 2).map((provider) => {
              const { code: gpCode, status, name } = provider;

              return (
                <LobbyVendorCard
                  key={gpCode}
                  bgUrl={`/assets/images/home/desktop/fishing/bg.png`}
                  imageUrl={`/assets/images/home/desktop/fishing/${gpCode}.png`}
                  venderLogoUrl={`/assets/images/home/provider_logo/fishing/${gpCode}.png`}
                  launchGame={() => launchLobbyGame(gpCode)}
                  status={status}
                  venderName={name}
                />
              );
            })}
          </CategoryContent>
        </HomeLobbyCategory>
      </HomeCategoryContainer>

      <HomeCategoryContainer>
        <HomeLobbyCategory>
          <CategoryTitle>
            <CategoryLabel text={"Sports"} />
            <ButtonText
              size="small"
              text={"More"}
              onClick={() => handleViewAllClick(GameTypeEnum.SPORTS)}
            />
          </CategoryTitle>
          <CategoryContent>
            {sportsList.slice(0, 2).map((provider) => {
              const { code: gpCode, status, name } = provider;

              return (
                <LobbyVendorCard
                  key={gpCode}
                  bgUrl={`/assets/images/home/desktop/sports/bg.png`}
                  imageUrl={`/assets/images/home/desktop/sports/${gpCode}.png`}
                  venderLogoUrl={`/assets/images/home/provider_logo/sports/${gpCode}.png`}
                  launchGame={() => launchLobbyGame(gpCode)}
                  status={status}
                  venderName={name}
                />
              );
            })}
          </CategoryContent>
        </HomeLobbyCategory>
      </HomeCategoryContainer>

      {sabongList.length > 0 &&
        <HomeCategoryContainer>
          <HomeLobbyCategory>
            <CategoryTitle>
              <CategoryLabel text={"Sabong"} />
              <ButtonText
                size="small"
                text={"More"}
                onClick={() => handleViewAllClick(GameTypeEnum.COCKFIGHT)}
              />
            </CategoryTitle>
            <CategoryContent>
              {sabongList.slice(0, 2).map((provider) => {
                const { code: gpCode, status, name } = provider;

                return (
                  <LobbyVendorCard
                    key={gpCode}
                    bgUrl={`/assets/images/home/desktop/sabong/bg.png`}
                    imageUrl={`/assets/images/home/desktop/sabong/${gpCode}.png`}
                    venderLogoUrl={`/assets/images/home/provider_logo/sabong/${gpCode}.png`}
                    launchGame={() => launchLobbyGame(gpCode)}
                    status={status}
                    venderName={name}
                  />
                );
              })}
            </CategoryContent>
          </HomeLobbyCategory>
        </HomeCategoryContainer>
      }

      <HomeCategoryContainer>
        <HomeLobbyCategory>
          <CategoryTitle>
            <CategoryLabel text={"Card Game"} />
            <ButtonText
              size="small"
              text={"More"}
              onClick={() => handleViewAllClick(GameTypeEnum.SPORTS)}
            />
          </CategoryTitle>
          <CategoryContent>
            {cardGamegList.slice(0, 2).map((provider) => {
              const { code: gpCode, status, name } = provider;

              return (
                <LobbyVendorCard
                  key={gpCode}
                  bgUrl={`/assets/images/home/desktop/cardGame/bg.png`}
                  imageUrl={`/assets/images/home/desktop/cardGame/${gpCode}.png`}
                  venderLogoUrl={`/assets/images/home/provider_logo/cardGame/${gpCode}.png`}
                  launchGame={() => launchLobbyGame(gpCode)}
                  status={status}
                  venderName={name}
                />
              );
            })}
          </CategoryContent>
        </HomeLobbyCategory>
      </HomeCategoryContainer>

      <HomeCategoryContainer>
        <HomeLobbyCategory>
          <CategoryTitle>
            <CategoryLabel text={"Egame"} />
            <ButtonText
              size="small"
              text={"More"}
              onClick={() => handleViewAllClick(GameTypeEnum.TABLEGAME)}
            />
          </CategoryTitle>
          <CategoryContent>
            {tableGameList.slice(0, 2).map((provider) => {
              const { code: gpCode, status, name } = provider;

              return (
                <LobbyVendorCard
                  key={gpCode}
                  bgUrl={`/assets/images/home/desktop/egame/bg.png`}
                  imageUrl={`/assets/images/home/desktop/egame/${gpCode}.png`}
                  venderLogoUrl={`/assets/images/home/provider_logo/egame/${gpCode}.png`}
                  launchGame={() => launchLobbyGame(gpCode)}
                  status={status}
                  venderName={name}
                />
              );
            })}
          </CategoryContent>
        </HomeLobbyCategory>
      </HomeCategoryContainer>

      <HomeCategoryContainer>
        <HomeLobbyCategory>
          <CategoryTitle>
            <CategoryLabel text={"Esports"} />
            <ButtonText
              size="small"
              text={"More"}
              onClick={() => handleViewAllClick(GameTypeEnum.SPORTS)}
            />
          </CategoryTitle>
          <CategoryContent>
            {esportsList.slice(0, 2).map((provider) => {
              const { code: gpCode, status, name } = provider;

              return (
                <LobbyVendorCard
                  key={gpCode}
                  bgUrl={`/assets/images/home/desktop/esports/bg.png`}
                  imageUrl={`/assets/images/home/desktop/esports/${gpCode}.png`}
                  venderLogoUrl={`/assets/images/home/provider_logo/esports/${gpCode}.png`}
                  launchGame={() => launchLobbyGame(gpCode)}
                  status={status}
                  venderName={name}
                />
              );
            })}
          </CategoryContent>
        </HomeLobbyCategory>
      </HomeCategoryContainer>
    </>
  );
};

export default HomeCategory;
