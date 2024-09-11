import { useCallback, useEffect, useMemo, useState } from "react";
import { GameItem } from "@tgs-web-nx/types";
import { GameService } from "@tgs-web-nx/core";
import { useHomeGameContext } from "./useHomeGameContext";
import { getFilteredGameListByProvider } from "./utils/getFilteredGameListByProvider";
import { getFilteredGameListByTag } from "./utils/getFilteredGameListByTag";
import { gameCacheService } from "./services";

interface GetGameListState {
  isLoading: boolean;
  gameList: GameItem[];
  error: Error | null;
  total: number;
}

export function useGetNonLobbyCategoryList() {
  const [gameListState, setGameListState] = useState<GetGameListState>({
    isLoading: false,
    gameList: [],
    total: 0,
    error: null,
  });

  const {
    activeGameType,
    updateGpCodeList,
    activeFilterTag,
    favoriteList,
    activeProviderFilterTag,
    searchString,
    pageIndex,
    pageSize
  } = useHomeGameContext();

  const fetchGameList = async (): Promise<GameItem[] | void> => {
    if (gameCacheService.hasCache(activeGameType, pageIndex) && gameCacheService.hasTotalGameCache(activeGameType)) {
      const gameList = await gameCacheService.getCachedGameList(activeGameType, pageIndex);
      const totalGame = await gameCacheService.getCachedTotal(activeGameType);
      setGameListState(state => ({ ...state, gameList: gameList, total: totalGame }));
      return gameList;
    }

    try {
      setGameListState(state => ({ ...state, isLoading: true }));

      const response = await GameService.GetCategory([activeGameType], activeFilterTag.tagType, pageIndex, pageSize);

      const gameList = pageIndex > 1 ? gameListState.gameList.concat(response.data[0].games) : response.data[0].games;

      setGameListState({
        isLoading: false,
        gameList: gameList,
        error: null,
        total: response.data[0].total
      });

      gameCacheService.updateGameCacheDictionary(activeGameType, pageIndex, gameList);
      gameCacheService.updateTotalCacheDictionary(activeGameType, response.data[0].total);

      return gameList;
    } catch (error: any) {
      console.error(error);
      setGameListState({
        isLoading: false,
        gameList: [],
        error: error,
        total: 0
      });
    }
  };

  useEffect(() => {
    fetchGameList().then((response) => {
      if (!response) return;
      updateGpCodeList(response);
    });
  }, [activeGameType, pageIndex]);

  const filteredGameListByTag = useMemo(() => {
    return getFilteredGameListByTag(gameListState.gameList, activeFilterTag, favoriteList);
  }, [JSON.stringify(gameListState.gameList), activeFilterTag, favoriteList]);

  const filteredGameListByProvider = useMemo(() => {
    return getFilteredGameListByProvider(filteredGameListByTag, activeProviderFilterTag);
  }, [filteredGameListByTag, activeProviderFilterTag]);

  const searchedGameList = useMemo(() => {
    if (!searchString) return filteredGameListByProvider;

    return filteredGameListByProvider.filter((item) => {
      return item.name.toLowerCase().includes(searchString.toLowerCase());
    });
  }, [searchString, JSON.stringify(filteredGameListByProvider)]);

  return {
    isLoading: gameListState.isLoading,
    gameList: searchedGameList,
    error: gameListState.error,
    total: gameListState.total,
  };
}
