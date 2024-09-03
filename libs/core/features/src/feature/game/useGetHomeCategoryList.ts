import { GameTypeEnum } from "@tgs-web-nx/constants";
import { GameService } from "@tgs-web-nx/core";
import { GameItem } from "@tgs-web-nx/types";
import { useCallback, useEffect, useState } from "react";

import { FilterTag, FilterTagTypeEnum } from "./types";
import { useHomeGameContext } from "./useHomeGameContext";

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

  const [tableGameListState, setTableGameListState] = useState<GetGameListState>({
    isLoading: false,
    gameList: [],
    error: null,
  });

  const [allGameListState, setAllGameListState] = useState<GetGameListState>({
    isLoading: false,
    gameList: [],
    error: null,
  });

  const { activeGameType, activeFilterTag } = useHomeGameContext();

  const getAllGameList = async () => {
    try {
      setAllGameListState({
        isLoading: true,
        gameList: [],
        error: null,
      });
      const response = await GameService.GetGameList("");

      setAllGameListState({
        isLoading: false,
        gameList: response.data,
        error: null,
      });

      return response;
    } catch (error: any) {
      console.error(error);
      setAllGameListState({
        isLoading: false,
        gameList: [],
        error: error,
      });
    }
  };

  const getTableGameList = async () => {
    try {
      setTableGameListState({
        isLoading: true,
        gameList: [],
        error: null,
      });
      const response = await GameService.GetGameList("", GameTypeEnum.TABLEGAME);
      const hotTablegameList = response.data.filter((gameItem: GameItem) => {
        return gameItem.tag.hot;
      });
      setTableGameListState({
        isLoading: false,
        gameList: hotTablegameList,
        error: null,
      });

      return response;
    } catch (error: any) {
      console.error(error);
      setTableGameListState({
        isLoading: false,
        gameList: [],
        error: error,
      });
    }
  };

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
    getAllGameList();
    getTableGameList();
  }, [activeGameType]);

  // filter
  const [slotGameListDictionary, setSlotGameListDictionary] = useState<GameListDictionary>({
    [FilterTagTypeEnum.ALL]: [],
    [FilterTagTypeEnum.FAVORITE]: [],
    [FilterTagTypeEnum.HOT]: [],
    [FilterTagTypeEnum.NEW]: [],
    [FilterTagTypeEnum.RECOMMEND]: [],
    [FilterTagTypeEnum.PROVIDER]: [],
  });

  const [allGameListDictionary, setAllGameListDictionary] = useState<GameListDictionary>({
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
      setSlotGameListDictionary(res);
    });
  }, [JSON.stringify(slotGameListState.gameList), activeFilterTag.gpCode]);

  useEffect(() => {
    if (!allGameListState.gameList.length) return;

    getDictionary(allGameListState.gameList, activeFilterTag).then((res) => {
      setAllGameListDictionary(res);
    });
  }, [JSON.stringify(allGameListState.gameList), activeFilterTag.gpCode]);

  return {
    isLoading: slotGameListState.isLoading || isFilterLoading,
    error: slotGameListState.error,
    slotGameList: slotGameListDictionary[activeFilterTag.tagType] || [],
    allGameList: slotGameListDictionary[FilterTagTypeEnum.ALL] || [],
    favoriteGameList: slotGameListDictionary[FilterTagTypeEnum.FAVORITE] || [],
    hotSlotGameList: slotGameListDictionary[FilterTagTypeEnum.HOT] || [],
    recommendSlotGameList: slotGameListDictionary[FilterTagTypeEnum.RECOMMEND] || [],
    providerGameList: slotGameListDictionary[FilterTagTypeEnum.PROVIDER] || [],
    hotTableGameList: tableGameListState.gameList || [],
    hotGameList: allGameListDictionary[FilterTagTypeEnum.HOT] || [],
    newGameList: allGameListDictionary[FilterTagTypeEnum.NEW] || [],
    tableGameListState,
    isTableGameLoading: tableGameListState.isLoading,
  };
}
