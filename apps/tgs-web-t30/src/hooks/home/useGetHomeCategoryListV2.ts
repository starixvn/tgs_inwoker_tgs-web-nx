import { useEffect, useMemo, useState } from "react";
import { gameCacheService, GameTypeItem, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameItem } from "@tgs-web-nx/types";
import { GameService } from "@tgs-web-nx/core";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import useGameTypeList from "@/hooks/home/useGameTypeList";

export function useGetHomeCategoryListV2() {
  const [gameTypeDictionary, setGameTypeDictionary] = useState<{
    [key in GameTypeEnum]: GameItem[];
    // @ts-ignore
  }>({});
  const [recommendGames, setRecommendGames] = useState<GameItem[]>([]);

  const gameTypeList = useGameTypeList();
  const { providerList } = useHomeGameContext();

  const filteredGameTypeList = useMemo(() => {
    if (!providerList.length) return [];

    return gameTypeList.filter((gameTypeItem) => {
      return providerList.some((provider) => {
        return provider.gametypes.includes(gameTypeItem.gameType);
      });
    });
  }, [gameTypeList, providerList]);

  const getAllGameList = async (gameTypeItems: GameTypeItem[]) => {
    for (const gameTypeItem of gameTypeItems) {
      const { gameType } = gameTypeItem;

      let gameList: GameItem[] = [];

      if (gameCacheService.hasCache(gameType)) {
        gameList = await gameCacheService.getCachedGameList(gameType);
      } else {
        const response = await GameService.GetGameList("", gameType);
        gameList = response.data || [];
        gameCacheService.updateGameCacheDictionary(gameType, gameList);
      }

      setGameTypeDictionary((prevDictionary) => {
        return {
          ...prevDictionary,
          [gameType]: gameList,
        };
      });

      setRecommendGames((prevGames) => {
        return [...prevGames, ...getRecommandGameItems(gameList)].filter(
          (gameItem, index) => index < 16,
        );
      });
    }
  };

  useEffect(() => {
    if (!filteredGameTypeList.length) return;

    getAllGameList(filteredGameTypeList);
  }, [filteredGameTypeList]);

  return {
    gameTypeItemList: filteredGameTypeList,
    gameTypeDictionary,
    recommendGames,
  };
}

function getRecommandGameItems(gameItemList: GameItem[]) {
  return gameItemList.filter((gameItem) => {
    return gameItem.tag.recommend;
  });
}
