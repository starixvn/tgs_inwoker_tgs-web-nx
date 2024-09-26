import { GameTagListResDto, GameTypeDto, GetGameListResDto, GetProviderListResDto, HightLightMatchDto, JoinGameResDto, JoinLobbyGameResDto, RecentBigWinItem, ResponseResDto } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";

import { ApiService } from "../api-services/services/ApiService";
import { GameService as PrevGameService } from "../api-services/services/GameService";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import config from "../config/config";

export const GameService = {
  ...PrevGameService,
  JoinGame,
  JoinLobbyGame,
  GetProviderList,
  GetGameList,
  GetGameType,
  GetGameListByTag,
  GetRecentBigWins,
  GetHightLightMatches
};

const languageFromLocalStorage = localStorage.getItem("i18nextLng");

const detectLanguage = languageFromLocalStorage || i18n.language || import.meta.env.VITE_DEFAULT_LANGUAGE;

function JoinGame(gid: number, gpcode: string) {
  return ApiService.post(`Game/geturl`, {
    gpcode: gpcode,
    gid: gid,
    language: detectLanguage,
    extends: {
      lobbyurl: window.location.protocol + "//" + window.location.hostname,
      browserUserAgent: window.navigator?.userAgent,
    },
  }) as unknown as Promise<JoinGameResDto>;
}

function JoinLobbyGame(gtype: string, gpcode: string) {
  return ApiService.post(`Game/lobby/geturl`, {
    gpcode: gpcode,
    gtype: parseInt(gtype),
    language: detectLanguage,
    extends: {
      lobbyurl: window.location.protocol + "//" + window.location.hostname,
      browserUserAgent: window.navigator?.userAgent,
    },
  }) as unknown as Promise<JoinLobbyGameResDto>;
}

function GetProviderList() {
  return ApiService.get(
    //@ts-ignore
    `GameProvider?platformtype=${config.isPC}&language=${i18n.language}&currency=${import.meta.env.VITE_CURRENCY}`,
  ) as unknown as Promise<GetProviderListResDto>;
}

function GetGameList(gpCode: string, gametypes?: number) {
  return ApiService.get(
    //@ts-ignore
    `Game/list?gpcode=${gpCode}&platformtype=${config.isPC}&language=${i18n.language}&currency=${import.meta.env.VITE_CURRENCY
    }${gametypes ? `&gametypes=${gametypes}` : ""}`,
  ) as unknown as Promise<GetGameListResDto>;
}

function GetGameType(
  gameTypes: number[],
  tag: number[],
  pageIndex: number,
  pageSize: number,
  providerCode: string[] = [],
  orderBy = 0,
) {
  const result = ApiService.post("games", {
    PlatformType: config.isPC,
    Language: i18n.language,
    Currency: import.meta.env.VITE_CURRENCY,
    GameTypes: gameTypes,
    Tag: tag,
    PageIndex: pageIndex,
    PageSize: pageSize,
    providerCode,
    orderType: orderBy,
  });
  return result as unknown as Promise<ResponseResDto<GameTypeDto>>;
}

function GetGameListByTag(tags: number[], pageIndex: number, pageSize: number, sportExclude: GameTypeEnum[], providerCode: string[] = []) {
  return ApiService.post("games/by-tag", {
    PlatformType: config.isPC,
    language: i18n.language,
    currency: import.meta.env.VITE_CURRENCY,
    tags,
    pageIndex,
    pageSize,
    providerCode,
    GameTypeExclude: sportExclude
  }) as unknown as Promise<ResponseResDto<GameTagListResDto>>;
}

function GetRecentBigWins() {
  return ApiService.get(
    //@ts-ignore
    `Game/rencent-big-wins?platformtype=${config.isPC}`,
  ) as unknown as Promise<ResponseResDto<RecentBigWinItem>>;
}

function GetHightLightMatches(sportType: number, betType: number, top: number, from: string, to: string) {
  return ApiService.getSabaAPI(`saba/event?sportType=${sportType}&betType=${betType}&top=${top}&from=${from}&to=${to}`) as unknown as Promise<ResponseResDto<HightLightMatchDto>>;
}
