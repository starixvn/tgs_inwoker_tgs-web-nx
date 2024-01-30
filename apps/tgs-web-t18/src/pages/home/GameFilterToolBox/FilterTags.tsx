import React from "react";
import styled from "styled-components";
import { FilterTag, FilterTagTypeEnum, useHomeGameContext } from "@tgs-web-nx/core/features";
import { theme } from "@/theme";
import Icon from "@/components/project/Icon";
import hotIcon from "@/assets/t18/images/home/filter/icon-hot.svg";
import newIcon from "@/assets/t18/images/home/filter/icon-new.svg";
import recommendIcon from "@/assets/t18/images/home/filter/icon-recommend.svg";
import favoriteIcon from "@/assets/t18/images/home/filter/icon-favorite.svg";

const filterIconDictionary: Record<FilterTagTypeEnum | string, string> = {
  [FilterTagTypeEnum.HOT]: hotIcon,
  [FilterTagTypeEnum.NEW]: newIcon,
  [FilterTagTypeEnum.RECOMMEND]: recommendIcon,
  [FilterTagTypeEnum.FAVORITE]: favoriteIcon,
};

const FilterTagsContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
`;

const Label = styled.div`
  display: block;
  //text-transform: uppercase;
`;

type FilterTagProps = {
  $isActive: boolean;
  theme: typeof theme;
};
const FilterTagContainer = styled.div<FilterTagProps>`
  flex-grow: 1;
  height: 32px;
  background: ${({ $isActive, theme }: FilterTagProps) =>
    $isActive ? theme.primary : theme.tertiaryDark};
  color: ${({ $isActive, theme }: FilterTagProps) => ($isActive ? theme.white : theme.tertiary)};
  border-radius: 50px;
  padding: 9px;
  flex-shrink: 0;
  cursor: pointer;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const allTag = {
  tagType: FilterTagTypeEnum.ALL,
  name: "",
};

const FilterTags = () => {
  const { activeFilterTag, handleChangeActiveFilterTag, filterTagList } = useHomeGameContext();

  const handleFilterTagClick = (filterTag: FilterTag) => {
    if (activeFilterTag.tagType === filterTag.tagType) {
      handleChangeActiveFilterTag(allTag);
    } else {
      handleChangeActiveFilterTag(filterTag);
    }
  };
  return (
    <FilterTagsContainer>
      {filterTagList.map((filterTag, index) => {
        const isActive = filterTag.name === activeFilterTag.name;
        if (filterTag.tagType === FilterTagTypeEnum.ALL) return null;

        return (
          <FilterTagContainer
            key={index}
            $isActive={isActive}
            onClick={() => handleFilterTagClick(filterTag)}
          >
            <Icon
              iconUrl={filterIconDictionary[filterTag.tagType]}
              width={"20px"}
              height={"20px"}
            />
            <Label>{filterTag.name}</Label>
          </FilterTagContainer>
        );
      })}
    </FilterTagsContainer>
  );
};

export default FilterTags;
