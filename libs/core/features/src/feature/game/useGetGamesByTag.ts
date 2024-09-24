import { GameService } from "@tgs-web-nx/core";
import { GameItem } from "@tgs-web-nx/types";
import { useEffect, useState } from "react";

import { gameCacheService } from "./services";
import { GetGameListState, TagTypeEnum } from "./types";
import { useHomeGameContext } from "./useHomeGameContext";

export function useGetGamesByTag() {
  const [gameListState, setGameListState] = useState<GetGameListState>({
    isLoading: false,
    gameList: [],
    total: 0,
    error: null,
  });

  const {
    activeTag,
    pageIndex,
    pageSize,
    activeProviderFilterTag,
    activeGameType,
  } = useHomeGameContext();

  const keyName = "GAMES_BY_TAG";

  const fetchGameListOfProvider = async (): Promise<GameItem[] | void> => {
    if (activeTag === TagTypeEnum.NONE) return;
    if (
      gameCacheService.hasCache(activeGameType, pageIndex, activeProviderFilterTag, 0) &&
      gameCacheService.hasTotalGameCache(activeGameType, activeProviderFilterTag, 0)
    ) {
      const gameList = await gameCacheService.getCachedGameList(activeGameType, pageIndex, activeProviderFilterTag, 0);
      const totalGame = await gameCacheService.getCachedTotal(activeGameType, activeProviderFilterTag, 0);
      setGameListState((state) => ({ ...state, gameList: gameList, total: totalGame }));
      return gameList;
    }

    try {
      setGameListState((state) => ({ ...state, isLoading: true }));
      const response = await GameService.GetGameListByTag([activeTag], pageIndex, pageSize, [], activeProviderFilterTag);

      const gameList =
        pageIndex > 1
          ? gameListState.gameList.concat(response.data[0].games)
          : response.data[0].games;

      setGameListState({
        isLoading: false,
        gameList: gameList,
        error: null,
        total: response.data[0].total,
      });

      gameCacheService.updateGameCacheDictionary(activeGameType, pageIndex, activeProviderFilterTag, 0, gameList);
      gameCacheService.updateTotalCacheDictionary(activeGameType, activeProviderFilterTag, 0, response.data[0].total);

      return gameList;
    } catch (error: any) {
      console.error(error);
      setGameListState({
        isLoading: false,
        gameList: [],
        error: error,
        total: 0,
      });
    }
  };

  useEffect(() => {
    fetchGameListOfProvider();
  }, [pageIndex, activeTag, activeProviderFilterTag]);

  return {
    isLoading: gameListState.isLoading,
    gameList: gameListState.gameList,
    error: gameListState.error,
    total: gameListState.total,
  };
}
