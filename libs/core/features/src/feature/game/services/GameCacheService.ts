import { GameTypeEnum } from "@tgs-web-nx/constants";
import { GameItem } from "@tgs-web-nx/types";

class GameCacheService {
  private readonly gameCacheDictionary: { [key in string]: GameItem[] };

  private readonly totalGameCacheDictionary: { [key in number]: number };

  constructor() {
    // @ts-ignore
    this.gameCacheDictionary = {};
    this.totalGameCacheDictionary = {};
  }

  updateGameCacheDictionary(gameType: GameTypeEnum, pageIndex: number, gameList: GameItem[]): void {
    const key = this.getKey(gameType, pageIndex);
    if (this.gameCacheDictionary[key]) return;

    this.gameCacheDictionary[key] = gameList;
  }

  hasCache(gameType: GameTypeEnum, pageIndex: number): boolean {
    return !!this.gameCacheDictionary[this.getKey(gameType, pageIndex)];
  }

  getCachedGameList(gameType: GameTypeEnum, pageIndex: number): Promise<GameItem[]> {
    return Promise.resolve(this.gameCacheDictionary[this.getKey(gameType, pageIndex)] || []);
  }

  updateTotalCacheDictionary(gameType: GameTypeEnum, total: number): void {
    if (this.totalGameCacheDictionary[gameType]) return;

    this.totalGameCacheDictionary[gameType] = total;
  }

  hasTotalGameCache(gameType: GameTypeEnum): boolean {
    return !!this.gameCacheDictionary[gameType];
  }

  getCachedTotal(gameType: GameTypeEnum): number {
    return this.totalGameCacheDictionary[gameType] || 0;
  }

  private getKey(gameType: GameTypeEnum, pageIndex: number): string {
    return `${gameType}_${pageIndex}`;
  }
}

export const gameCacheService = new GameCacheService();
