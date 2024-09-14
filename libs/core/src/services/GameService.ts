import config from "@tgs-web-nx/config";
import { GameTagListResDto, GameTypeDto, GetGameListResDto, GetProviderListResDto, HotMatchList, JoinGameResDto, JoinLobbyGameResDto, ResponseResDto } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";

import { ApiService } from "../api-services/services/ApiService";
import { GameService as PrevGameService } from "../api-services/services/GameService";

export const GameService = {
  ...PrevGameService,
  JoinGame,
  JoinLobbyGame,
  GetProviderList,
  GetGameList,
  GetGameType,
  GetGameListByTag,
  GetHotMatchList
  GetRecentBigWins
};

const languageFromLocalStorage = localStorage.getItem("i18nextLng");

const detectLanguage = languageFromLocalStorage || i18n.language || config.defaultLanguage;

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
    `GameProvider?platformtype=${config.isPC}&language=${i18n.language}&currency=${config.currency}`,
  ) as unknown as Promise<GetProviderListResDto>;
}

function GetGameList(gpCode: string, gametypes?: number) {
  return ApiService.get(
    //@ts-ignore
    `Game/list?gpcode=${gpCode}&platformtype=${config.isPC}&language=${i18n.language}&currency=${config.currency
    }${gametypes ? `&gametypes=${gametypes}` : ""}`,
  ) as unknown as Promise<GetGameListResDto>;
}

function GetGameType(gameTypes: number[], tag: number, pageIndex: number, pageSize: number, providerCode = [], orderBy = 0) {
  const result = ApiService.post("gametype", {
    PlatformType: config.isPC,
    Language: i18n.language,
    Currency: config.currency,
    GameTypes: gameTypes,
    Tag: tag,
    PageIndex: pageIndex,
    PageSize: pageSize,
    providerCode,
    orderType: orderBy
  });
  return result as unknown as Promise<ResponseResDto<GameTypeDto>>;
}

function GetGameListByTag(tags: number[], limit: number) {
  const tagsQuery = tags.map((tag) => `tags=${tag}`).join("&");
  return ApiService.get(
    //@ts-ignore
    `Game/by-tag?platformtype=${config.isPC}&language=${i18n.language}&currency=${config.currency}&${tagsQuery}&limit=${limit}`,
  ) as unknown as Promise<ResponseResDto<GameTagListResDto>>;
}

function GetRecentBigWins() {
  return ApiService.get(
    //@ts-ignore
    `Game/rencent-big-wins?platformtype=${config.isPC}`,
  ) as unknown as Promise<ResponseResDto<GameTagListResDto>>;
}

function GetHotMatchList() {
  return ApiService.getSabaAPI(
    //@ts-ignore
    `sports/V1/GetEvents?query=$filter=sporttype eq 1&$top=10&includeMarkets=$filter=bettype eq 5&language=en&from=${new Date().toJSON()}`,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTdGFyaXgxU1dfNHVueHFobHd4dzBrX3Rlc3QiLCJzbiI6IlN0YXJpeDFTVyIsInAiOiIwNVNobWlrM2NJZnhWRlVjVkloTzV0VmFCVVA4SnMvUmZwYVVKaUVuM3hiS1hnM0I1SUtEeW9IczF5Q0hRbUtOWlhzVzZHMGlNK2lMekE5OENFKzRCUFcrZGVJeEt6RDNyNmFlb2I3d1hpMD0iLCJTaXRlSWQiOiI0MzUxNDAwIiwibmJmIjoxNzI2Mjc5MTM4LCJleHAiOjE3MjYyNzk3Mzh9.7FlNBoOlMLNyHrPZoNhmBH10ULdfiEEAiDpBD_q1xCk"
  ) as unknown as Promise<ResponseResDto<HotMatchList>>;
}
