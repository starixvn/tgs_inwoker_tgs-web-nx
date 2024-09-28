import { GameTypeEnum } from "@tgs-web-nx/constants";
import { GameService } from "@tgs-web-nx/core";
import { GameItem, GameTagListResDto, GameTypeDto, HightLightMatchDto, RecentBigWinItem } from "@tgs-web-nx/types";
import { useEffect, useState } from "react";
import { HubConnection } from "@microsoft/signalr";

import { TagTypeEnum } from "./types";

interface HomeGameList {
  isLoading: boolean;
  error: Error | null;
  slotGameList: GameItem[];
  tableGameList: GameItem[];
  sportGameList: GameItem[];
  liveCasinoList: GameItem[];
  recentBigWins: RecentBigWinItem[];
}

interface TagGameList {
  isLoading: boolean;
  error: Error | null;
  hotGameList: GameItem[];
  newGameList: GameItem[];
}

interface HightLightMatchList {
  isLoading: boolean;
  error: Error | null;
  matches: HightLightMatchDto[];
}

const initHomeGameList: HomeGameList = {
  isLoading: false,
  error: null,
  slotGameList: [],
  tableGameList: [],
  sportGameList: [],
  liveCasinoList: [],
  recentBigWins: []
};

const initTagGameList: TagGameList = {
  isLoading: false,
  error: null,
  hotGameList: [],
  newGameList: [],
};

const initHighlightMatchList: HightLightMatchList = {
  isLoading: false,
  matches: [],
  error: null
};


const HomeCategory = [
  GameTypeEnum.SPORTS,
  // GameTypeEnum.ESPORTS,
  GameTypeEnum.SLOT,
  GameTypeEnum.TABLEGAME,
  GameTypeEnum.LIVE,
];

export function useGetHomeCategoryList() {
  const [homeGameList, setHomeGameList] = useState<HomeGameList>(initHomeGameList);

  const [tagGameList, setTagGameList] = useState<TagGameList>(initTagGameList);

  const [highlightMatchList, setHighlightMatchList] = useState<HightLightMatchList>(initHighlightMatchList);

  const [hubConnection, setHubConnection] = useState<HubConnection | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const responseRecentBigWins = await GameService.GetRecentBigWins();
      setHomeGameList(currentState => ({
        ...currentState,
        recentBigWins: responseRecentBigWins.data
      }));
    };

    const interval = setInterval(() => {
      fetchData();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const getHomeGameList = async () => {
    try {
      setHomeGameList({ ...initHomeGameList, isLoading: true });
      const response = await GameService.GetGameType(HomeCategory, [TagTypeEnum.RECOMMEND], 1, 30);
      const responseRecentBigWins = await GameService.GetRecentBigWins();

      setHomeGameList({
        ...initHomeGameList,
        isLoading: false,
        error: null,
        slotGameList: filterGameType(response.data, [GameTypeEnum.SLOT]),
        tableGameList: filterGameType(response.data, [GameTypeEnum.TABLEGAME]),
        liveCasinoList: filterGameType(response.data, [GameTypeEnum.LIVE]),
        sportGameList: filterGameType(response.data, [GameTypeEnum.SPORTS, GameTypeEnum.ESPORTS]),
        recentBigWins: responseRecentBigWins.data
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

      const response = await GameService.GetGameListByTag([TagTypeEnum.HOT, TagTypeEnum.NEW], 1, 30, [GameTypeEnum.SPORTS]);
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

  const getHightLightMatch = async () => {
    try {
      setHighlightMatchList({ ...initHighlightMatchList, isLoading: true });

      const today = (new Date()).toISOString().split('T')[0] + 'T00:00:00';
      const twoDaysAfter = new Date();
      twoDaysAfter.setDate((new Date()).getDate() + 2);

      const twoDaysAfterString = twoDaysAfter.toISOString().split('T')[0] + 'T00:00:00';

      const response = await GameService.GetHightLightMatches(1, 5, true, 10, today, twoDaysAfterString);
      setHighlightMatchList({ ...initHighlightMatchList, isLoading: false, matches: response.data });
      return response;

    } catch (error: any) {
      console.error(error);
      setHighlightMatchList({ ...initHighlightMatchList, isLoading: false });
    }
  }

  const filterGameType = (gameTypes: GameTypeDto[], types: GameTypeEnum[]) => {
    const results = gameTypes.filter((gameType) => types.includes(gameType.key));

    if (results.length > 0) {
      return results.map((category) => category.games).flat();
    }
    return [];
  };

  const getHubConnection = async () => {
    const connection = await GameService.ConnectBetHub();

    setHubConnection(connection);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getHightLightMatch();
    }, 60000);
    getHightLightMatch();
    getHomeGameList();
    getGameByTag();
    getHubConnection();

    return () => clearInterval(interval);
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
    recentBigWins: homeGameList.recentBigWins,
    highlightMatches: highlightMatchList.matches,
    betHubConnection: hubConnection
  };
}
