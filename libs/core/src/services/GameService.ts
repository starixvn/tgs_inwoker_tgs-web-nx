import config from "@tgs-web-nx/config";
import { GameTagListResDto, GameTypeDto, GetGameListResDto, GetProviderListResDto, JoinGameResDto, JoinLobbyGameResDto, ResponseResDto } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";

import { ApiService } from "../api-services/services/ApiService";
import { GameService as PrevGameService } from "../api-services/services/GameService";

export const GameService = {
  ...PrevGameService,
  JoinGame,
  JoinLobbyGame,
  GetProviderList,
  GetGameList,
  GetCategory,
  GetGameListByTag,
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

function GetCategory(gameTypes: number[], tag: number, pageIndex: number, pageSize: number) {
  const result = ApiService.post("gametype", {
    PlatformType: config.isPC,
    Language: i18n.language,
    Currency: config.currency,
    GameTypes: gameTypes,
    Tag: tag,
    PageIndex: pageIndex,
    PageSize: pageSize,
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
