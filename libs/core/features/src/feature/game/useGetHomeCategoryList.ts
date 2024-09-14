import { GameTypeEnum } from "@tgs-web-nx/constants";
import { GameService } from "@tgs-web-nx/core";
import { GameItem, GameTagListResDto, GameTypeDto, HotMatchList } from "@tgs-web-nx/types";
import { useEffect, useState } from "react";

import { TagTypeEnum } from "./types";

interface HomeGameList {
  isLoading: boolean;
  error: Error | null;
  slotGameList: GameItem[];
  tableGameList: GameItem[];
  sportGameList: GameItem[];
  liveCasinoList: GameItem[];
}

interface TagGameList {
  isLoading: boolean;
  error: Error | null;
  hotGameList: GameItem[];
  newGameList: GameItem[];
}

interface HotMatchs {
  isLoading: boolean;
  error: Error | null;
  matches: HotMatchList;
}

const initHomeGameList: HomeGameList = {
  isLoading: false,
  error: null,
  slotGameList: [],
  tableGameList: [],
  sportGameList: [],
  liveCasinoList: [],
};

const initTagGameList: TagGameList = {
  isLoading: false,
  error: null,
  hotGameList: [],
  newGameList: [],
};

const initHotMatchList: HotMatchs = {
  isLoading: false,
  error: null,
  matches: [],
};

const HomeCategory = [
  GameTypeEnum.SPORTS,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.SLOT,
  GameTypeEnum.TABLEGAME,
  GameTypeEnum.LIVE,
];

export function useGetHomeCategoryList() {
  const [homeGameList, setHomeGameList] = useState<HomeGameList>(initHomeGameList);

  const [tagGameList, setTagGameList] = useState<TagGameList>(initTagGameList);

  const [hotMatchList, setHotMatchList] = useState<HotMatchs>(initHotMatchList);

  const getHomeGameList = async () => {
    try {
      setHomeGameList({ ...initHomeGameList, isLoading: true });
      const response = await GameService.GetGameType(HomeCategory, TagTypeEnum.RECOMMEND, 1, 30);

      setHomeGameList({
        ...initHomeGameList,
        isLoading: false,
        error: null,
        slotGameList: filterGameType(response.data, [GameTypeEnum.SLOT]),
        tableGameList: filterGameType(response.data, [GameTypeEnum.TABLEGAME]),
        liveCasinoList: filterGameType(response.data, [GameTypeEnum.LIVE]),
        sportGameList: filterGameType(response.data, [GameTypeEnum.SPORTS, GameTypeEnum.ESPORTS]),
      });

      return response;
    } catch (error: any) {
      console.error(error);
      setHomeGameList({ ...initHomeGameList, isLoading: false, error: error });
    }
  };

  const getGameByTag = async () => {
    try {
      setTagGameList({ ...initTagGameList, isLoading: true });

      const response = await GameService.GetGameListByTag([TagTypeEnum.HOT, TagTypeEnum.NEW], 30);
      const hotTag =
        response.data.find((gt: GameTagListResDto) => gt.tag === TagTypeEnum.HOT)?.games || [];
      const newTag =
        response.data.find((gt: GameTagListResDto) => gt.tag === TagTypeEnum.NEW)?.games || [];

      setTagGameList({
        ...initTagGameList,
        isLoading: false,
        hotGameList: hotTag,
        newGameList: newTag,
      });
      return response;
    } catch (error: any) {
      console.error(error);
      setTagGameList({ ...initTagGameList, isLoading: false, error: error });
    }
  };

  const getHotMatch = async () => {
    try {
      setHotMatchList({ ...initHotMatchList, isLoading: true });
      const response = await GameService.GetHotMatchList();

      setHotMatchList({
        ...initHotMatchList,
        isLoading: false,
        error: null,
        matches: response.data,
      });

      return response;
    } catch (error: any) {
      console.error(error);
      setHotMatchList({ ...initHotMatchList, isLoading: false, error: error });
    }
  }

  const filterGameType = (gameTypes: GameTypeDto[], types: GameTypeEnum[]) => {
    const results = gameTypes.filter((gameType) => types.includes(gameType.gameType));

    if (results.length > 0) {
      return results.map((category) => category.games).flat();
    }
    return [];
  };

  useEffect(() => {
    getHomeGameList();
    getGameByTag();
    getHotMatch();
  }, []);

  return {
    isLoading: homeGameList.isLoading || tagGameList.isLoading,
    error: homeGameList.error || tagGameList.error,
    slotGameList: homeGameList.slotGameList,
    hotGameList: tagGameList.hotGameList,
    newGameList: tagGameList.newGameList,
    tableGameList: homeGameList.tableGameList,
    liveCasinoList: homeGameList.liveCasinoList,
    sportGameList: homeGameList.sportGameList,
    hotMatchList: hotMatchList.matches,
  };
}
