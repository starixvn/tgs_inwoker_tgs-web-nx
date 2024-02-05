import React from "react";
import styled from "styled-components";
import {
  FilterTag,
  FilterTagTypeEnum,
  useGetLobbyCategoryList,
  useHomeGameContext,
} from "@tgs-web-nx/core/features";
import Tag from "../components/HomeGameFilterTag/ProviderTag";
import { theme } from "@/theme";
import favoriteActiveIcon from "@/assets/t21/images/home/filter/icon-favorite-active.svg";
import favoriteIcon from "@/assets/t21/images/home/filter/icon-favorite.svg";
import Icon from "@/components/project/Icon";

const filterIconDictionary: Record<FilterTagTypeEnum | string, string> = {
  [FilterTagTypeEnum.FAVORITE]: favoriteIcon,
};
const activeFilterIconDictionary: Record<FilterTagTypeEnum | string, string> = {
  [FilterTagTypeEnum.FAVORITE]: favoriteActiveIcon,
};

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  align-self: stretch;

  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    background: ${(props) => props.theme.mainBackground};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #53535375;
  }

  &::-webkit-scrollbar-track-piece {
    background: transparent;
  }
`;

type FilterTagProps = {
  $isActive: boolean;
  theme: typeof theme;
};

const FilterTagContainer = styled.div<FilterTagProps>`
  width: 29px;
  height: 29px;
  background: ${({ theme }) => theme.primary};
  border-radius: 5px;
  padding: 8px 12px;
  flex-shrink: 0;
  cursor: pointer;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const ProviderTags = () => {
  const {
    activeProviderFilterTag,
    handleChangeActiveProviderFilterTag,
    providerFilterTagList,
    filterTagList,
    activeFilterTag,
    handleChangeActiveFilterTag,
  } = useHomeGameContext();
  const { navPopupCategoryList } = useGetLobbyCategoryList();

  const allTag = {
    tagType: FilterTagTypeEnum.ALL,
    name: "",
  };

  const onChangeProviderFilterTag = (newFilterTag: FilterTag) => {
    handleChangeActiveProviderFilterTag(newFilterTag);
  };
  const handleFilterTagClick = (filterTag: FilterTag) => {
    if (activeFilterTag.tagType === filterTag.tagType) {
      handleChangeActiveFilterTag(allTag);
    } else {
      handleChangeActiveFilterTag(filterTag);
    }
  };
  return (
    <FilterContainer>
      {filterTagList
        .filter((filterTag) => filterTag.tagType === FilterTagTypeEnum.FAVORITE)
        .map((filterTag, index) => {
          const isActive = filterTag.name === activeFilterTag.name;
          return (
            <FilterTagContainer
              key={index}
              $isActive={isActive}
              onClick={() => handleFilterTagClick(filterTag)}
            >
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
      {providerFilterTagList.map((filterTag) => {
        const matchedProvider = navPopupCategoryList.find(
          (provider) => provider.code === filterTag.gpCode,
        );
        const status = matchedProvider ? matchedProvider.status : -1;
        return (
          <Tag
            key={filterTag.name}
            text={filterTag.name}
            gpCode={filterTag.gpCode}
            isActive={filterTag.name === activeProviderFilterTag.name}
            onClick={() => onChangeProviderFilterTag(filterTag)}
            status={status}
          />
        );
      })}
    </FilterContainer>
  );
};

export default ProviderTags;
