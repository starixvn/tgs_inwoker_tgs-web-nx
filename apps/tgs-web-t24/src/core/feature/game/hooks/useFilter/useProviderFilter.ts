import { filterTagAll } from "@/core/feature/game/constants/filterTagAll";
import { FilterTag, FilterTagTypeEnum } from "@/core/feature/game/types";
import { GameItem } from "@/core/models/dto/game/GetGameListResDto";
import { ProviderDto } from "@/core/models/dto/game/GetProviderListResDto";
import { useCallback, useMemo, useState } from "react";

export function useProviderFilter(providerList: ProviderDto[]) {
  const [activeProviderFilterTag, setActiveProviderFilterTag] = useState<FilterTag>(filterTagAll);
  const handleChangeActiveProviderFilterTag = useCallback((newFilterTag: FilterTag) => {
    setActiveProviderFilterTag(newFilterTag);
  }, []);

  const [gpCodeList, setGpCodeList] = useState<string[]>([]);
  const updateGpCodeList = (gameItemList: GameItem[]) => {
    const gpCodeSet = new Set<string>();

    gameItemList.forEach((gameItem) => {
      gpCodeSet.add(gameItem.gpcode);
    });

    setGpCodeList(Array.from(gpCodeSet));
  };

  const providerFilterTagList = useMemo(() => {
    const filteredTags: FilterTag[] = [filterTagAll];
    providerList.forEach((provider) => {
      if (gpCodeList.includes(provider.code)) {
        filteredTags.push({
          name: provider.name,
          tagType: FilterTagTypeEnum.PROVIDER,
          gpCode: provider.code,
        });
      }
    });

    return filteredTags.filter((tag) => !!tag) as FilterTag[];
  }, [gpCodeList, providerList]);

  return {
    providerFilterTagList,
    activeProviderFilterTag,
    handleChangeActiveProviderFilterTag,
    updateGpCodeList,
  };
}
