import { useMemo, useState } from "react";
import { ProviderDto } from "@tgs-web-nx/types";
import { FilterTag } from "../../types";

const initProviderFilterTag: string[] = [];

export function useProviderFilter() {
  const [activeProviderFilterTag, setActiveProviderFilterTag] = useState<string[]>(initProviderFilterTag);
  const handleChangeActiveProviderFilterTag = (newFilterTag: string[]) => {
    setActiveProviderFilterTag(newFilterTag);
  }

  const handleClearActiveProviderFilterTag = () => {
    setActiveProviderFilterTag(initProviderFilterTag);
  }

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
    handleClearActiveProviderFilterTag,
    updateGpCodeList,
  };
}
