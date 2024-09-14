import { useCallback, useMemo, useState } from "react";
import { FilterTag, OrderTypeEnum, } from "../../types";

export function useTagFilter() {
  const [activeFilterTag, setActiveFilterTag] = useState<OrderTypeEnum>(OrderTypeEnum.HOT);

  const handleChangeActiveFilterTag = useCallback((newFilterTag: OrderTypeEnum) => {
    setActiveFilterTag(newFilterTag);
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
    handleChangeActiveFilterTag,
  };
}
