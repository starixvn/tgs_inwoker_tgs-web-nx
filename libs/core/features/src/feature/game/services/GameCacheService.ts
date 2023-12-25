import { GameTypeEnum } from "@tgs-web-nx/constants";
import { GameItem } from "@tgs-web-nx/types";

class GameCacheService {
  private readonly gameCacheDictionary: { [key in GameTypeEnum]: GameItem[] };

  constructor() {
    // @ts-ignore
    this.gameCacheDictionary = {};
  }

  updateGameCacheDictionary(gameType: GameTypeEnum, gameList: GameItem[]): void {
    if (this.gameCacheDictionary[gameType]) return;

    this.gameCacheDictionary[gameType] = gameList;
  }

  hasCache(gameType: GameTypeEnum): boolean {
    return !!this.gameCacheDictionary[gameType];
  }

  getCachedGameList(gameType: GameTypeEnum): Promise<GameItem[]> {
    return Promise.resolve(this.gameCacheDictionary[gameType] || []);
  }
}

export const gameCacheService = new GameCacheService();
