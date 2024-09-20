import { GameTypeEnum } from "@tgs-web-nx/constants";
import { GameItem } from "@tgs-web-nx/types";
import { OrderTypeEnum } from "../types";

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
    providerList: string[],
    orderTag: OrderTypeEnum,
    gameList: GameItem[],
  ): void {
    const key = this.getKey(keyName, pageIndex, providerList, orderTag);
    if (this.gameCacheDictionary[key]) return;

    this.gameCacheDictionary[key] = gameList;
  }

  hasCache(keyName: GameTypeEnum | string, pageIndex: number, providerList: string[], orderTag: OrderTypeEnum): boolean {
    return !!this.gameCacheDictionary[this.getKey(keyName, pageIndex, providerList, orderTag)];
  }

  getCachedGameList(keyName: GameTypeEnum | string, pageIndex: number, providerList: string[], orderTag: OrderTypeEnum): Promise<GameItem[]> {
    return Promise.resolve(this.gameCacheDictionary[this.getKey(keyName, pageIndex, providerList, orderTag)] || []);
  }

  updateTotalCacheDictionary(keyName: GameTypeEnum | string, providerList: string[], orderTag: OrderTypeEnum, total: number): void {
    const key = this.getKey(keyName, 0, providerList, orderTag);
    if (this.totalGameCacheDictionary[key]) return;

    this.totalGameCacheDictionary[key] = total;
  }

  hasTotalGameCache(keyName: GameTypeEnum | string, providerList: string[], orderTag: OrderTypeEnum,): boolean {
    return !!this.totalGameCacheDictionary[this.getKey(keyName, 0, providerList, orderTag)];
  }

  getCachedTotal(keyName: GameTypeEnum | string, providerList: string[], orderTag: OrderTypeEnum): number {
    return this.totalGameCacheDictionary[this.getKey(keyName, 0, providerList, orderTag)] || 0;
  }

  private getKey(keyName: GameTypeEnum | string, pageIndex: number, providerList: string[], orderTag: OrderTypeEnum): string {
    return `${keyName}_${pageIndex}_${providerList.join("_")}_${orderTag}`;
  }
}

export const gameCacheService = new GameCacheService();
