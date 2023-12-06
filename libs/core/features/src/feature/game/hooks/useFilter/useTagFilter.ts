import { useCallback, useMemo, useState } from "react";
import { useAccountStore } from "@tgs-web-nx/core";
import { useHistory } from "react-router-dom";
import { FilterTag, FilterTagTypeEnum } from "../../types";
import { filterTagAll } from "../../constants/filterTagAll";
import { useAuth } from "@tgs-web-nx/core/features";

export function useTagFilter() {
  const { isLogin } = useAuth();
  const history = useHistory();
  const [activeFilterTag, setActiveFilterTag] = useState<FilterTag>(filterTagAll);

  const handleChangeActiveFilterTag = useCallback((newFilterTag: FilterTag) => {
    if (!isLogin && newFilterTag.tagType === FilterTagTypeEnum.FAVORITE) {
      history.push("/login");
    }

    setActiveFilterTag(newFilterTag);
  }, [isLogin]);

  const filterTagList = useMemo(() => {
    const tags = [
      { name: "All", tagType: FilterTagTypeEnum.ALL },
      { name: "New", tagType: FilterTagTypeEnum.NEW },
      { name: "Favorite", tagType: FilterTagTypeEnum.FAVORITE },
      { name: "Hot", tagType: FilterTagTypeEnum.HOT },
      { name: "Recommend", tagType: FilterTagTypeEnum.RECOMMEND },
    ];
    return tags.filter((tag) => !!tag) as FilterTag[];
  }, []);

  return {
    filterTagList,
    activeFilterTag,
    handleChangeActiveFilterTag,
  };
}
