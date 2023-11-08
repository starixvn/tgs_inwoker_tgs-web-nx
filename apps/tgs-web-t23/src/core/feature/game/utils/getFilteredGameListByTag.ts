import { GameItem } from "@/core/models/dto/game/GetGameListResDto";
import { FilterTag, FilterTagTypeEnum } from "@/core/feature/game/types";

export function getFilteredGameListByTag(
  gameList: GameItem[],
  activeFilterTag: FilterTag,
  favoriteList: number[],
) {
  switch (activeFilterTag.tagType) {
    default:
    case FilterTagTypeEnum.ALL:
      return gameList;

    case FilterTagTypeEnum.FAVORITE:
      return gameList.filter((gameItem) => {
        return favoriteList.includes(gameItem.id);
      });

    case FilterTagTypeEnum.HOT:
      return gameList.filter((gameItem) => {
        return gameItem.tag.hot;
      });

    case FilterTagTypeEnum.NEW:
      return gameList.filter((gameItem) => {
        return gameItem.tag.new;
      });

    case FilterTagTypeEnum.RECOMMEND:
      return gameList.filter((gameItem) => {
        return gameItem.tag.recommend;
      });
  }
}
