import { useCallback, useMemo, useState } from "react";
import { ProviderDto } from "@tgs-web-nx/types";
import { filterTagAll } from "../../constants/filterTagAll";
import { FilterTag, FilterTagTypeEnum } from "../../types";

export function useProviderFilter() {
  const [activeProviderFilterTag, setActiveProviderFilterTag] = useState<string[]>([]);
  const handleChangeActiveProviderFilterTag = useCallback((newFilterTag: string[]) => {
    setActiveProviderFilterTag(newFilterTag);
  }, []);

  const [gpCodeList, setGpCodeList] = useState<ProviderDto[]>([]);
  const updateGpCodeList = (providers: ProviderDto[]) => {
    setGpCodeList(providers);
  };

  const providerFilterTagList = useMemo(() => {
    const filteredTags: FilterTag[] = [];
    gpCodeList.forEach((provider) => {
      filteredTags.push({
        name: provider.name,
        gpCode: provider.code,
      });
    });

    return filteredTags.filter((tag) => !!tag) as FilterTag[];
  }, [gpCodeList]);

  return {
    providerFilterTagList,
    activeProviderFilterTag,
    handleChangeActiveProviderFilterTag,
    updateGpCodeList,
  };
}
