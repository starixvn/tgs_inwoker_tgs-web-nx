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
    activeFilterTag,
    pageIndex,
    pageSize,
    searchedGameProviderCode,
    activeProviderFilterTag,
  } = useHomeGameContext();

  const keyName = "GAMES_BY_TAG";

  const fetchGameListOfProvider = async (): Promise<GameItem[] | void> => {
    if (
      gameCacheService.hasCache(keyName, pageIndex) &&
      gameCacheService.hasTotalGameCache(keyName)
    ) {
      const gameList = await gameCacheService.getCachedGameList(keyName, pageIndex);
      const totalGame = await gameCacheService.getCachedTotal(keyName);
      setGameListState((state) => ({ ...state, gameList: gameList, total: totalGame }));
      return gameList;
    }

    try {
      setGameListState((state) => ({ ...state, isLoading: true }));
      const response = await GameService.GetGameType(
        [],
        TagTypeEnum.NONE,
        pageIndex,
        pageSize,
        [],
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

      gameCacheService.updateGameCacheDictionary(keyName, pageIndex, gameList);
      gameCacheService.updateTotalCacheDictionary(keyName, response.data[0].total);

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
  }, [pageIndex, activeFilterTag, activeProviderFilterTag]);

  return {
    isLoading: gameListState.isLoading,
    gameList: gameListState.gameList,
    error: gameListState.error,
    total: gameListState.total,
  };
}
