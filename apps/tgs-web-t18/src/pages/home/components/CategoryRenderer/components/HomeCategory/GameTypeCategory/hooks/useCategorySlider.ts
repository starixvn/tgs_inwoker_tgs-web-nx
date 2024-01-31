import { GameService, useAccountStore } from "@tgs-web-nx/core";
import { getIsGameTypeLobbyCategory, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router-dom";
import { useMemo } from "react";
import { GameItem, ProviderDto } from "@tgs-web-nx/types";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { Common } from "@tgs-web-nx/utils";
import useGameTypeList from "@/hooks/home/useGameTypeList";

export function useCategorySlider(gameType: GameTypeEnum, gameList: GameItem[]) {
  const { account } = useAccountStore();
  const filteredGameList = gameList.filter((item, index) => index < 10);
  const gameTypeList = useGameTypeList();
  const { providerList } = useHomeGameContext();
  const history = useHistory();

  const lobbyCategoryList = useMemo<ProviderDto[]>(() => {
    return providerList.filter((provider) => {
      return provider.gametypes.includes(gameType);
    });
  }, [gameType, JSON.stringify(providerList)]);

  const gameTypeKey = gameTypeList.find((item) => item.gameType === gameType)?.key;
  const hasMappingData = !!lobbyCategoryList.length;

  const isLobbyCategory = getIsGameTypeLobbyCategory(gameType);

  const launchLobbyGame = (gpcode: string) => {
    if (!account.token) {
      history.push("/login");
      return;
    }

    if (gameType === GameTypeEnum.COCKFIGHT) {
      // 以後SM01不會開,多新增AWC_COCKFIGHT(缺對應api)
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
      Common.PopupCenter(`/joinlobbygame/${gameType}/${gpcode}`, "gamewindow");
    }
  };

  return {
    filteredGameList,
    lobbyCategoryList,
    launchLobbyGame,
    isLobbyCategory,
    hasMappingData,
    gameTypeKey,
  };
}
