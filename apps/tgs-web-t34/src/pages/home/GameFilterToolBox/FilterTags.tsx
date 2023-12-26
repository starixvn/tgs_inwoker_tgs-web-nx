import React from "react";
import styled from "styled-components";
import { FilterTag, FilterTagTypeEnum, useHomeGameContext } from "@tgs-web-nx/core/features";
import { theme } from "@/theme";
import Icon from "@/components/project/Icon";
import hotIcon from "@/assets/t34/images/home/filter/icon-hot.svg";
import newIcon from "@/assets/t34/images/home/filter/icon-new.svg";
import recommendIcon from "@/assets/t34/images/home/filter/icon-recommend.svg";
import favoriteIcon from "@/assets/t34/images/home/filter/icon-favorite.svg";
import hotActiveIcon from "@/assets/t34/images/home/filter/icon-hot-active.svg";
import newActiveIcon from "@/assets/t34/images/home/filter/icon-new-active.svg";
import recommendActiveIcon from "@/assets/t34/images/home/filter/icon-recommend-active.svg";
import favoriteActiveIcon from "@/assets/t34/images/home/filter/icon-favorite-active.svg";
import { media } from "@/theme/breakpoints";

const filterIconDictionary: Record<FilterTagTypeEnum | string, string> = {
  [FilterTagTypeEnum.HOT]: hotIcon,
  [FilterTagTypeEnum.NEW]: newIcon,
  [FilterTagTypeEnum.RECOMMEND]: recommendIcon,
  [FilterTagTypeEnum.FAVORITE]: favoriteIcon,
};
const activeFilterIconDictionary: Record<FilterTagTypeEnum | string, string> = {
  [FilterTagTypeEnum.HOT]: hotActiveIcon,
  [FilterTagTypeEnum.NEW]: newActiveIcon,
  [FilterTagTypeEnum.RECOMMEND]: recommendActiveIcon,
  [FilterTagTypeEnum.FAVORITE]: favoriteActiveIcon,
};

const FilterTagsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Label = styled.div`
  display: none;
  ${media.lg} {
    display: block;
  }
`;

type FilterTagProps = {
  $isActive: boolean;
  theme: typeof theme;
};
const FilterTagContainer = styled.div<FilterTagProps>`
  width: 32px;
  height: 32px;
  background: ${({ $isActive, theme }: FilterTagProps) => ($isActive ? theme.grey00 : theme.white)};
  color: ${({ $isActive, theme }: FilterTagProps) => ($isActive ? theme.white : theme.grey00)};
  border: 1px solid ${({ theme }) => theme.grey00};
  border-radius: 2px;
  padding: 8px 12px;
  flex-shrink: 0;
  cursor: pointer;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.sm} {
    font-size: 0.875rem;
    width: auto;
    height: auto;
    gap: 4px;
    padding: 12px;
    background: ${({ $isActive, theme }: FilterTagProps) =>
      $isActive ? theme.grey00 : theme.grey04};
  }
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
            <Label>{filterTag.name}</Label>
            <Icon
              iconUrl={
                isActive
                  ? activeFilterIconDictionary[filterTag.tagType]
                  : filterIconDictionary[filterTag.tagType]
              }
              width={"20px"}
              height={"20px"}
            />
          </FilterTagContainer>
        );
      })}
    </FilterTagsContainer>
  );
};

export default FilterTags;
