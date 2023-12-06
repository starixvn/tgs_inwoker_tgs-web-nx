import { useCallback, useMemo, useState } from "react";
import { useAccountStore } from "@tgs-web-nx/core";
import { FilterTag, FilterTagTypeEnum } from "../../types";
import { filterTagAll } from "../../constants/filterTagAll";

export function useTagFilter() {
  const {
    account: { token },
  } = useAccountStore();

  const [activeFilterTag, setActiveFilterTag] = useState<FilterTag>(filterTagAll);

  const handleChangeActiveFilterTag = useCallback((newFilterTag: FilterTag) => {
    setActiveFilterTag(newFilterTag);
  }, []);

  const filterTagList = useMemo(() => {
    const tags = [
      { name: "All", tagType: FilterTagTypeEnum.ALL },
      token ? { name: "Favorite", tagType: FilterTagTypeEnum.FAVORITE } : null,
      { name: "Hot", tagType: FilterTagTypeEnum.HOT },
      { name: "New", tagType: FilterTagTypeEnum.NEW },
      { name: "Recommend", tagType: FilterTagTypeEnum.RECOMMEND },
    ];
    return tags.filter((tag) => !!tag) as FilterTag[];
  }, [token]);

  return {
    filterTagList,
    activeFilterTag,
    handleChangeActiveFilterTag,
  };
}
