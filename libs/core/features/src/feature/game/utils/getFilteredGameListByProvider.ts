import { GameItem } from "@tgs-web-nx/types";
import { FilterTag, FilterTagTypeEnum } from "../types";

export function getFilteredGameListByProvider(
  gameList: GameItem[],
  activeProviderFilterTag: FilterTag,
) {
  switch (activeProviderFilterTag.tagType) {
    default:
    case FilterTagTypeEnum.ALL:
      return gameList;

    case FilterTagTypeEnum.PROVIDER:
      if (!activeProviderFilterTag.gpCode) return [];

      return gameList.filter((gameItem) => {
        return gameItem.gpcode === activeProviderFilterTag.gpCode;
      });
  }
}
