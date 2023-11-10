import { GetFavoriteGameResDto, GetProviderListResDto } from "@tgs-web-nx/types";
import { ApiService } from "@/api-services/services/ApiService";
import i18n from "@/utils/i18n";
import config from "@/config/config";
import { GameService as PrevGameService } from "@/api-services/services/GameService";

export const GameService = {
  ...PrevGameService,
  JoinGame,
  JoinLobbyGame,
  GetProviderList,
  GetGameList,
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
    },
  }) as unknown as Promise<JoinLobbyGameResDto>;
}

function GetProviderList() {
  return ApiService.get(
    //@ts-ignore
    `GameProvider/list?platformtype=${config.isPC}&language=${i18n.language}&currency=${config.currency}`,
  ) as unknown as Promise<GetProviderListResDto>;
}

function GetGameList(gpCode: string, gametypes: number) {
  return ApiService.get(
    //@ts-ignore
    `Game/list?gpcode=${gpCode}&platformtype=${config.isPC}&language=${i18n.language}&currency=${config.currency}&gametypes=${gametypes}`,
  ) as unknown as Promise<GetFavoriteGameResDto>;
}
