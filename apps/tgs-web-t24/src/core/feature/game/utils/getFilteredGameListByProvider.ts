import { GameItem } from "@/core/models/dto/game/GetGameListResDto";
import { FilterTag, FilterTagTypeEnum } from "@/core/feature/game/types";

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
