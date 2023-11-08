import { useCallback, useEffect, useState } from "react";
import { GameService } from "@/core/services/GameService";
import { useHomeGameContext } from "@/core/feature/game/useHomeGameContext";
import { GameItem } from "@/core/models/dto/game/GetGameListResDto";
import { GameTypeEnum } from "@/core/types/GameTypeEnum";
import { FilterTag, FilterTagTypeEnum } from "@/core/feature/game/types";

interface GetGameListState {
  isLoading: boolean;
  gameList: GameItem[];
  error: Error | null;
}

type GameListDictionary = {
  [key in FilterTagTypeEnum]: GameItem[];
};

export function useGetHomeCategoryList() {
  const [slotGameListState, setSlotGameListState] = useState<GetGameListState>({
    isLoading: false,
    gameList: [],
    error: null,
  });

  const { activeGameType, activeFilterTag } = useHomeGameContext();

  const getSlotGameList = async () => {
    try {
      setSlotGameListState({
        isLoading: true,
        gameList: [],
        error: null,
      });
      const response = await GameService.GetGameList("", GameTypeEnum.SLOT);
      setSlotGameListState({
        isLoading: false,
        gameList: response.data,
        error: null,
      });

      return response;
    } catch (error: any) {
      console.error(error);
      setSlotGameListState({
        isLoading: false,
        gameList: [],
        error: error,
      });
    }
  };

  useEffect(() => {
    getSlotGameList();
  }, [activeGameType]);

  // filter
  const [gameListDictionary, setGameListDictionary] = useState<GameListDictionary>({
    [FilterTagTypeEnum.ALL]: [],
    [FilterTagTypeEnum.FAVORITE]: [],
    [FilterTagTypeEnum.HOT]: [],
    [FilterTagTypeEnum.NEW]: [],
    [FilterTagTypeEnum.RECOMMEND]: [],
    [FilterTagTypeEnum.PROVIDER]: [],
  });
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  const getDictionary = useCallback(async (gameList: GameItem[], activeFilterTag: FilterTag) => {
    setIsFilterLoading(true);
    const dictionary: { [key in FilterTagTypeEnum]: GameItem[] } = {
      [FilterTagTypeEnum.ALL]: [],
      [FilterTagTypeEnum.FAVORITE]: [],
      [FilterTagTypeEnum.HOT]: [],
      [FilterTagTypeEnum.NEW]: [],
      [FilterTagTypeEnum.RECOMMEND]: [],
      [FilterTagTypeEnum.PROVIDER]: [],
    };

    gameList.forEach((gameItem) => {
      if (gameItem.tag.hot) {
        dictionary[FilterTagTypeEnum.HOT].push(gameItem);
      }

      if (gameItem.tag.new) {
        dictionary[FilterTagTypeEnum.NEW].push(gameItem);
      }

      if (gameItem.tag.recommend) {
        dictionary[FilterTagTypeEnum.RECOMMEND].push(gameItem);
      }

      if (activeFilterTag.gpCode && gameItem.gpcode === activeFilterTag.gpCode) {
        dictionary[FilterTagTypeEnum.PROVIDER].push(gameItem);
      }

      if (true) {
        dictionary[FilterTagTypeEnum.FAVORITE].push(gameItem);
      }

      dictionary[FilterTagTypeEnum.ALL].push(gameItem);
    });

    setIsFilterLoading(false);

    return dictionary;
  }, []);

  useEffect(() => {
    if (!slotGameListState.gameList.length) return;

    getDictionary(slotGameListState.gameList, activeFilterTag).then((res) => {
      setGameListDictionary(res);
    });
  }, [JSON.stringify(slotGameListState.gameList), activeFilterTag.gpCode]);

  return {
    isLoading: slotGameListState.isLoading || isFilterLoading,
    error: slotGameListState.error,
    gameList: gameListDictionary[activeFilterTag.tagType] || [],
    allGameList: gameListDictionary[FilterTagTypeEnum.ALL] || [],
    favoriteGameList: gameListDictionary[FilterTagTypeEnum.FAVORITE] || [],
    hotGameList: gameListDictionary[FilterTagTypeEnum.HOT] || [],
    newGameList: gameListDictionary[FilterTagTypeEnum.NEW] || [],
    recommendGameList: gameListDictionary[FilterTagTypeEnum.RECOMMEND] || [],
    providerGameList: gameListDictionary[FilterTagTypeEnum.PROVIDER] || [],
  };
}
