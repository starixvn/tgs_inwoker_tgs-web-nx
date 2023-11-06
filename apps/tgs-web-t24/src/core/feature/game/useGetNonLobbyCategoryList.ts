import { useEffect, useMemo, useState } from "react";
import { GameService } from "@/core/services/GameService";
import { useHomeGameContext } from "@/core/feature/game/useHomeGameContext";
import { GameItem } from "@/core/models/dto/game/GetGameListResDto";
import { FilterTagTypeEnum } from "@/core/feature/game/hooks/useFilterTag";

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

  const { activeGameType, updateGpCodeList, activeFilterTag } = useHomeGameContext();

  const getGameList = async () => {
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
  };

  useEffect(() => {
    getGameList().then((response) => {
      if (!response?.data) return;
      updateGpCodeList(response.data);
    });
  }, [activeGameType]);

  const filteredGameList = useMemo(() => {
    switch (activeFilterTag.tagType) {
      default:
      case FilterTagTypeEnum.ALL:
        return gameListState.gameList;

      case FilterTagTypeEnum.FAVORITE:
        return gameListState.gameList;

      case FilterTagTypeEnum.HOT:
        return gameListState.gameList.filter((gameItem) => {
          return gameItem.tag.hot;
        });

      case FilterTagTypeEnum.NEW:
        return gameListState.gameList.filter((gameItem) => {
          return gameItem.tag.new;
        });

      case FilterTagTypeEnum.RECOMMEND:
        return gameListState.gameList.filter((gameItem) => {
          return gameItem.tag.recommend;
        });

      case FilterTagTypeEnum.PROVIDER:
        if (!activeFilterTag.gpCode) return [];

        return gameListState.gameList.filter((gameItem) => {
          return gameItem.gpcode === activeFilterTag.gpCode;
        });
    }
  }, [JSON.stringify(gameListState.gameList), activeFilterTag]);

  return {
    isLoading: gameListState.isLoading,
    gameList: filteredGameList,
    error: gameListState.error,
  };
}
