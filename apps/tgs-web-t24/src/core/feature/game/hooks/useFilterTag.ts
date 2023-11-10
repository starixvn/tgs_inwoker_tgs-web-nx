import { useCallback, useMemo, useState } from "react";
import { GameItem, ProviderDto } from "@tgs-web-nx/types";
import { GameTypeEnum } from "@/constants/GameTypeEnum";
import { useAccountStore } from "@/core/stores/useAccountStore";

export enum FilterTagTypeEnum {
  "PROVIDER" = "PROVIDER",
  "ALL" = "All",
  "HOT" = "HOT",
  "NEW" = "NEW",
  "RECOMMEND" = "RECOMMEND",
  "FAVORITE" = "FAVORITE",
}

export interface FilterTag {
  name: string;
  tagType: FilterTagTypeEnum;
  gpCode?: string;
}

export function useFilterTag(providerList: ProviderDto[], activeGameType: GameTypeEnum) {
  const [activeFilterTag, setActiveFilterTag] = useState<FilterTag>({
    name: "All",
    tagType: FilterTagTypeEnum.ALL,
  });

  const handleChangeActiveFilterTag = useCallback((newFilterTag: FilterTag) => {
    setActiveFilterTag(newFilterTag);
  }, []);

  const { account } = useAccountStore();
  const [gpCodeList, setGpCodeList] = useState<string[]>([]);

  const updateGpCodeList = (gameItemList: GameItem[]) => {
    const gpCodeSet = new Set<string>();

    gameItemList.forEach((gameItem) => {
      gpCodeSet.add(gameItem.gpcode);
    });

    setGpCodeList(Array.from(gpCodeSet));
  };

  const filterTagList = useMemo(() => {
    const filteredTags: FilterTag[] = [];
    providerList.forEach((provider) => {
      if (gpCodeList.includes(provider.code)) {
        filteredTags.push({
          name: provider.name,
          tagType: FilterTagTypeEnum.PROVIDER,
          gpCode: provider.code,
        });
      }
    });

    const additionalTags = [
      { name: "All", tagType: FilterTagTypeEnum.ALL },
      account.token ? { name: "Favorite", tagType: FilterTagTypeEnum.FAVORITE } : null,
      { name: "Hot", tagType: FilterTagTypeEnum.HOT },
      { name: "New", tagType: FilterTagTypeEnum.NEW },
      { name: "Recommend", tagType: FilterTagTypeEnum.RECOMMEND },
      ...filteredTags,
    ];
    return additionalTags.filter((tag) => !!tag) as FilterTag[];
  }, [JSON.stringify(providerList), JSON.stringify(gpCodeList)]);

  return {
    activeFilterTag,
    handleChangeActiveFilterTag,
    filterTagList,
    updateGpCodeList,
  };
}
