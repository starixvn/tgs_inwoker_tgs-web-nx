import { GameTypeEnum } from './../../../../../../apps/tgs-web-t36/src/hooks/home/useGetVendorList';
import { GameService } from "@tgs-web-nx/core";
import { GameItem } from "@tgs-web-nx/types";
import { useEffect, useState } from "react";

import { gameCacheService } from "./services";
import { GetGameListState, TagTypeEnum } from "./types";
import { useHomeGameContext } from "./useHomeGameContext";

export function useGetGamesByProvider() {
  const [gameListState, setGameListState] = useState<GetGameListState>({
    isLoading: false,
    gameList: [],
    total: 0,
    error: null,
  });

  const { activeFilterTag, pageIndex, pageSize, searchedGameProviderCode, activeGameType } = useHomeGameContext();

  const fetchGameListOfProvider = async (): Promise<GameItem[] | void> => {
    if (
      gameCacheService.hasCache(activeGameType, pageIndex, [searchedGameProviderCode], activeFilterTag) &&
      gameCacheService.hasTotalGameCache(activeGameType, [searchedGameProviderCode], activeFilterTag)
    ) {
      const gameList = await gameCacheService.getCachedGameList(
        activeGameType, pageIndex, [searchedGameProviderCode], activeFilterTag
      );
      const totalGame = await gameCacheService.getCachedTotal(activeGameType, [searchedGameProviderCode], activeFilterTag);
      setGameListState((state) => ({ ...state, gameList: gameList, total: totalGame }));
      return gameList;
    }

    try {
      setGameListState((state) => ({ ...state, isLoading: true }));
      const response = await GameService.GetGameType(
        [],
        [],
        pageIndex,
        pageSize,
        [searchedGameProviderCode],
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

      gameCacheService.updateGameCacheDictionary(activeGameType, pageIndex, [searchedGameProviderCode], activeFilterTag, gameList);
      gameCacheService.updateTotalCacheDictionary(activeGameType, [searchedGameProviderCode], activeFilterTag, response.data[0].total);

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
    if (searchedGameProviderCode === "") {
      return;
    }
    fetchGameListOfProvider();
  }, [searchedGameProviderCode, pageIndex, activeFilterTag]);

  return {
    isLoading: gameListState.isLoading,
    gameList: gameListState.gameList,
    error: gameListState.error,
    total: gameListState.total,
  };
}
