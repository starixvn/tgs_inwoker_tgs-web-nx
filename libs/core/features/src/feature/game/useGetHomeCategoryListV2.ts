import { useCallback, useEffect, useMemo, useState } from "react";
import { GameItem } from "@tgs-web-nx/types";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { GameService } from "@tgs-web-nx/core";
import useGameTypeList from "../../../../../../apps/tgs-web-t30/src/hooks/home/useGameTypeList";
import { GameTypeItem, useHomeGameContext } from "./useHomeGameContext";
import { FilterTag, FilterTagTypeEnum } from "./types";

interface GetGameListState {
  isLoading: boolean;
  gameList: GameItem[];
  error: Error | null;
}

type GameListDictionary = {
  [key in FilterTagTypeEnum]: GameItem[];
};

export function useGetHomeCategoryList() {
  const gameTypeList = useGameTypeList();
  const { handleChangeGameType, providerList } = useHomeGameContext();

  const filteredGameTypeList = useMemo(() => {
    if (!providerList.length) return [];

    return gameTypeList.filter((gameTypeItem) => {
      return providerList.some((provider) => {
        return provider.gametypes.includes(gameTypeItem.gameType);
      });
    });
  }, [gameTypeList, providerList]);

  const getAllGameList = async (gameTypeItems: GameTypeItem[]) => {
    console.log(gameTypeItems);
    // try {
    //   const response = await GameService.GetGameList("", [
    //     GameTypeEnum.SLOT,
    //     GameTypeEnum.FISH,
    //     GameTypeEnum.TABLEGAME,
    //   ]);
    //   console.log(response);
    //   return response;
    // } catch (error: any) {
    //   console.error(error);
    // }
  };

  useEffect(() => {
    if (!filteredGameTypeList.length) return;

    getAllGameList(filteredGameTypeList);
  }, [filteredGameTypeList]);

  // filter

  return {
    gameTypeItemList: filteredGameTypeList,
  };
}
