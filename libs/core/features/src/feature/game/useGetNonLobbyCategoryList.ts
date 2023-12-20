import { useCallback, useEffect, useMemo, useState } from "react";
import { GameItem } from "@tgs-web-nx/types";
import { GameService } from "@tgs-web-nx/core";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHomeGameContext } from "./useHomeGameContext";
import { getFilteredGameListByProvider } from "./utils/getFilteredGameListByProvider";
import { getFilteredGameListByTag } from "./utils/getFilteredGameListByTag";
import { gameCacheService } from "./services";

interface GetGameListState {
  isLoading: boolean;
  gameList: GameItem[];
  error: Error | null;
}

export function useGetNonLobbyCategoryList() {
  const [gameListState, setGameListState] = useState<GetGameListState>({
    isLoading: false,
    gameList: [],
    error: null,
  });

  const {
    activeGameType,
    updateGpCodeList,
    activeFilterTag,
    favoriteList,
    activeProviderFilterTag,
    searchString,
  } = useHomeGameContext();

  const fetchGameList = async (): Promise<GameItem[] | void> => {
    if (gameCacheService.hasCache(activeGameType)) {
      const gameList = await gameCacheService.getCachedGameList(activeGameType);

      setGameListState({
        isLoading: false,
        gameList,
        error: null,
      });

      return gameList;
    }

    try {
      setGameListState({
        isLoading: true,
        gameList: [],
        error: null,
      });

      const response = await GameService.GetGameList("", activeGameType);

      setGameListState({
        isLoading: false,
        gameList: response.data,
        error: null,
      });

      gameCacheService.updateGameCacheDictionary(activeGameType, response.data);

      return response.data;
    } catch (error: any) {
      console.error(error);
      setGameListState({
        isLoading: false,
        gameList: [],
        error: error,
      });
    }
  };

  useEffect(() => {
    fetchGameList().then((response) => {
      if (!response) return;
      updateGpCodeList(response);
    });
  }, [activeGameType]);

  const filteredGameListByTag = useMemo(() => {
    return getFilteredGameListByTag(gameListState.gameList, activeFilterTag, favoriteList);
  }, [JSON.stringify(gameListState.gameList), activeFilterTag]);

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
  };
}
