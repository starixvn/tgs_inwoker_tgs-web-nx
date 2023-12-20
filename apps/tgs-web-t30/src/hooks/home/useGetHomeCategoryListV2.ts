import { useEffect, useMemo } from "react";
import { GameTypeItem, useHomeGameContext } from "@tgs-web-nx/core/features";
import useGameTypeList from "@/hooks/home/useGameTypeList";

export function useGetHomeCategoryListV2() {
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
