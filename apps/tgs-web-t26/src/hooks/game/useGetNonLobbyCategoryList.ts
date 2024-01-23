import { useCallback, useEffect, useMemo, useState } from "react";
import { GameItem } from "@tgs-web-nx/types";
import { GameService } from "@tgs-web-nx/core";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { FilterTag, gameCacheService, useHomeGameContext } from "@tgs-web-nx/core/features";
import { getFilteredGameListByTag } from "../../../../../libs/core/features/src/feature/game/utils/getFilteredGameListByTag";
import { getFilteredGameListByProvider } from "../../../../../libs/core/features/src/feature/game/utils/getFilteredGameListByProvider";

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

  const [activeMobileProviderFilterTag, setMobileActiveProviderFilterTag] = useState<FilterTag | null>(null);

  const handleSetActiveProviderFilterTag = (newFilterTag: FilterTag | null) => {
    setMobileActiveProviderFilterTag(newFilterTag);
  };

  const {
    activeGameType,
    updateGpCodeList,
    activeFilterTag,
    favoriteList,
    // activeProviderFilterTag,
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
    if (!activeMobileProviderFilterTag) {
      return [];
    }
    return getFilteredGameListByProvider(
      filteredGameListByTag,
      activeMobileProviderFilterTag as FilterTag,
    );
  }, [filteredGameListByTag, activeMobileProviderFilterTag]);

  const searchedGameList = useMemo(() => {
    if (!searchString) return filteredGameListByProvider;

    return filteredGameListByProvider.filter((item) => {
      return item.name.toLowerCase().includes(searchString.toLowerCase());
    });
  }, [searchString, JSON.stringify(filteredGameListByProvider)]);

  return {
    activeMobileProviderFilterTag,
    handleSetActiveProviderFilterTag,
    isLoading: gameListState.isLoading,
    gameList: searchedGameList,
    error: gameListState.error,
  };
}
