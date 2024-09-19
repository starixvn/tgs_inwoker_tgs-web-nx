import { useCallback, useMemo, useState } from "react";
import { FilterTag, OrderTypeEnum, TagTypeEnum, } from "../../types";

export function useTagFilter() {
  const [activeFilterTag, setActiveFilterTag] = useState<OrderTypeEnum>(OrderTypeEnum.HOT);
  const [activeTag, setActiveTag] = useState<TagTypeEnum>(TagTypeEnum.NONE);

  const handleChangeActiveFilterTag = useCallback((newFilterTag: OrderTypeEnum) => {
    setActiveFilterTag(newFilterTag);
  }, []);

  const handleChangeActiveTag = useCallback((newTag: TagTypeEnum) => {
    setActiveTag(newTag);
  }, []);

  const filterTagList = useMemo(() => {
    const tags = [
      { name: "Hot", tagType: OrderTypeEnum.HOT },
      { name: "A-Z", tagType: OrderTypeEnum.A_Z },
      { name: "Z-A", tagType: OrderTypeEnum.Z_A },
      { name: "New", tagType: OrderTypeEnum.NEW },
    ];
    return tags.filter((tag) => !!tag) as FilterTag[];
  }, []);

  return {
    filterTagList,
    activeFilterTag,
    activeTag,
    handleChangeActiveFilterTag,
    handleChangeActiveTag
  };
}
