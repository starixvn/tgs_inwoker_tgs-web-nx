import { GameTypeEnum } from "@tgs-web-nx/constants";
import { GameItem } from "@tgs-web-nx/types";

class GameCacheService {
  private readonly gameCacheDictionary: { [key in string]: GameItem[] };

  private readonly totalGameCacheDictionary: { [key in number | string]: number };

  constructor() {
    // @ts-ignore
    this.gameCacheDictionary = {};
    this.totalGameCacheDictionary = {};
  }

  updateGameCacheDictionary(
    keyName: GameTypeEnum | string,
    pageIndex: number,
    gameList: GameItem[],
  ): void {
    const key = this.getKey(keyName, pageIndex);
    if (this.gameCacheDictionary[key]) return;

    this.gameCacheDictionary[key] = gameList;
  }

  hasCache(keyName: GameTypeEnum | string, pageIndex: number): boolean {
    return !!this.gameCacheDictionary[this.getKey(keyName, pageIndex)];
  }

  getCachedGameList(keyName: GameTypeEnum | string, pageIndex: number): Promise<GameItem[]> {
    return Promise.resolve(this.gameCacheDictionary[this.getKey(keyName, pageIndex)] || []);
  }

  updateTotalCacheDictionary(keyName: GameTypeEnum | string, total: number): void {
    if (this.totalGameCacheDictionary[keyName]) return;

    this.totalGameCacheDictionary[keyName] = total;
  }

  hasTotalGameCache(keyName: GameTypeEnum | string): boolean {
    return !!this.gameCacheDictionary[keyName];
  }

  getCachedTotal(keyName: GameTypeEnum | string): number {
    return this.totalGameCacheDictionary[keyName] || 0;
  }

  private getKey(keyName: GameTypeEnum | string, pageIndex: number): string {
    return `${keyName}_${pageIndex}`;
  }
}

export const gameCacheService = new GameCacheService();
