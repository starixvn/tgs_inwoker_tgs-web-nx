import { useCallback, useEffect, useMemo, useState } from "react";
import { useHomeGameContext } from "@/core/feature/game/useHomeGameContext";
import { getFilteredGameListByProvider } from "@/core/feature/game/utils/getFilteredGameListByProvider";
import { getFilteredGameListByTag } from "@/core/feature/game/utils/getFilteredGameListByTag";
import { GameItem } from "@/core/models/dto/game/GetGameListResDto";
import { GameService } from "@/core/services/GameService";
import { getFilteredGameListByTag } from "@/core/feature/game/utils/getFilteredGameListByTag";
import { getFilteredGameListByProvider } from "@/core/feature/game/utils/getFilteredGameListByProvider";

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

  const fetchGameList = useCallback(async () => {
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

      return response;
    } catch (error: any) {
      console.error(error);
      setGameListState({
        isLoading: false,
        gameList: [],
        error: error,
      });
    }
  }, [activeGameType]);

  useEffect(() => {
    fetchGameList().then((response) => {
      if (!response?.data) return;
      updateGpCodeList(response.data);
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
