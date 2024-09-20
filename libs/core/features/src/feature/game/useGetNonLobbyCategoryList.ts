import { GameService } from "@tgs-web-nx/core";
import { GameItem } from "@tgs-web-nx/types";
import { useEffect, useState } from "react";

import { gameCacheService } from "./services";
import { GetGameListState } from "./types";
import { useHomeGameContext } from "./useHomeGameContext";

export function useGetNonLobbyCategoryList() {
  const [gameListState, setGameListState] = useState<GetGameListState>({
    isLoading: false,
    gameList: [],
    total: 0,
    error: null,
  });

  const { activeGameType, activeProviderFilterTag, activeFilterTag, pageIndex, pageSize } = useHomeGameContext();

  const fetchGameList = async (): Promise<GameItem[] | void> => {
    if (gameCacheService.hasCache(activeGameType, pageIndex, activeProviderFilterTag, activeFilterTag) &&
      gameCacheService.hasTotalGameCache(activeGameType, activeProviderFilterTag)
    ) {
      const gameList = await gameCacheService.getCachedGameList(activeGameType, pageIndex, activeProviderFilterTag, activeFilterTag);
      const totalGame = await gameCacheService.getCachedTotal(activeGameType, activeProviderFilterTag, activeFilterTag);
      setGameListState((state) => ({ ...state, gameList: gameList, total: totalGame }));
      return gameList;
    }

    try {
      setGameListState((state) => ({ ...state, isLoading: true }));
      const response = await GameService.GetGameType(
        [activeGameType],
        [],
        pageIndex,
        pageSize,
        activeProviderFilterTag,
        activeFilterTag,
      );

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

      gameCacheService.updateGameCacheDictionary(activeGameType, pageIndex, activeProviderFilterTag, activeFilterTag, gameList);
      gameCacheService.updateTotalCacheDictionary(activeGameType, activeProviderFilterTag, activeFilterTag, response.data[0].total);

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
    fetchGameList();
  }, [activeGameType, pageIndex, activeProviderFilterTag, activeFilterTag]);

  return {
    isLoading: gameListState.isLoading,
    gameList: gameListState.gameList,
    error: gameListState.error,
    total: gameListState.total,
  };
}
