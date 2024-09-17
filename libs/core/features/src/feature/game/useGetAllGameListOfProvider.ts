import { GameService } from "@tgs-web-nx/core";
import { GameItem } from "@tgs-web-nx/types";
import { useEffect, useState } from "react";

import { gameCacheService } from "./services";
import { TagTypeEnum } from "./types";
import { useHomeGameContext } from "./useHomeGameContext";

interface GetGameListState {
  isLoading: boolean;
  gameList: GameItem[];
  error: Error | null;
  total: number;
}

export function useGetAllGameListOfProvider() {
  const [gameListState, setGameListState] = useState<GetGameListState>({
    isLoading: false,
    gameList: [],
    total: 0,
    error: null,
  });

  const { activeFilterTag, pageIndex, pageSize, searchedGameProviderCode } = useHomeGameContext();

  const fetchGameListOfProvider = async (): Promise<GameItem[] | void> => {
    if (
      gameCacheService.hasCache(searchedGameProviderCode, pageIndex) &&
      gameCacheService.hasTotalGameCache(searchedGameProviderCode)
    ) {
      const gameList = await gameCacheService.getCachedGameList(
        searchedGameProviderCode,
        pageIndex,
      );
      const totalGame = await gameCacheService.getCachedTotal(searchedGameProviderCode);
      setGameListState((state) => ({ ...state, gameList: gameList, total: totalGame }));
      return gameList;
    }

    try {
      setGameListState((state) => ({ ...state, isLoading: true }));
      const response = await GameService.GetAllGameOfProvider(
        TagTypeEnum.NONE,
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

      gameCacheService.updateGameCacheDictionary(searchedGameProviderCode, pageIndex, gameList);
      gameCacheService.updateTotalCacheDictionary(searchedGameProviderCode, response.data[0].total);

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
