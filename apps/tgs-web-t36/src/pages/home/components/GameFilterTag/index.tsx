import React, { useState } from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { FilterTag, FilterTagTypeEnum, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Tag from "./Tag";
import { gameTagList } from "@/constants/gameTag";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";
import SearchInput from "@/pages/home/components/SearchInput";
import searchIcon from "@/assets/t36/images/home/search.svg";

const FilterSection = styled.div`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
`;

const ProviderTagContainer = styled.div`
  width: 100%;
  height: 32px;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  align-self: stretch;
  display: flex;
  gap: 8px;
  ${media.sm} {
    &::-webkit-scrollbar {
      height: 10px;
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
  }
`;

const CommonContainer = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
`;

const SearchInputWrapper = styled.div`
  width: 100%;
  height: 30px;
`;

const GameFilterTag = () => {
  const {
    activeFilterTag,
    handleChangeActiveFilterTag,
    filterTagList,
    activeProviderFilterTag,
    handleChangeActiveProviderFilterTag,
    providerFilterTagList,
  } = useHomeGameContext();
  const [prevFilterTag, setPrevFilterTag] = useState<FilterTag | null>(activeFilterTag);
  const [prevGPFilterTag, setGPPrevFilterTag] = useState<FilterTag | null>(activeProviderFilterTag);

  const { searchString, handleChangeSearch } = useHomeGameContext();
  const { isMobileSize } = useRwd();

  const allTag = {
    tagType: FilterTagTypeEnum.ALL,
    name: FilterTagTypeEnum.ALL,
  };

  const handleGPFilterClick = (filterTag: FilterTag) => {
    setGPPrevFilterTag(filterTag);
    if (filterTag.gpCode === prevGPFilterTag?.gpCode) {
      handleChangeActiveProviderFilterTag(allTag);
      setGPPrevFilterTag(allTag);
    } else {
      handleChangeActiveProviderFilterTag(filterTag);
    }
  };

  const handleFilterClick = (filterTag: FilterTag) => {
    setPrevFilterTag(filterTag);
    if (filterTag.tagType === prevFilterTag?.tagType) {
      handleChangeActiveFilterTag(allTag);
      setPrevFilterTag(allTag);
    } else {
      handleChangeActiveFilterTag(filterTag);
    }
  };

  return (
    <FilterSection>
      <ProviderTagContainer>
        {providerFilterTagList.map((filterTag: FilterTag) => {
          const { name } = filterTag;
          const isActive = name === activeProviderFilterTag.name;
          const tagCmp = gameTagList.find((tag) => tag.text === name);

          return (
            <Tag
              key={name}
              text={name}
              isActive={isActive}
              isShowIcon={false}
              onClick={() => handleGPFilterClick(filterTag)}
            >
              {tagCmp &&
                tagCmp.iconComponent &&
                React.createElement(tagCmp.iconComponent, {
                  $color: isActive ? theme.red : theme.grey10,
                })}
            </Tag>
          );
        })}
      </ProviderTagContainer>

      <CommonContainer>
        {filterTagList.map((filterTag) => {
          const { name, tagType } = filterTag;

          const isActive =
            filterTag.tagType !== FilterTagTypeEnum.PROVIDER && tagType === activeFilterTag.tagType;
          const tagCmp = gameTagList.find((tag) => tag.text === name);

          if (filterTag.tagType === FilterTagTypeEnum.ALL) {
            return null;
          }

          return (
            <Tag
              key={name}
              text={name}
              isActive={false}
              isShowIcon={true}
              onClick={() => handleFilterClick(filterTag)}
            >
              {tagCmp &&
                tagCmp.iconComponent &&
                React.createElement(tagCmp.iconComponent, {
                  $color: isActive
                    ? isMobileSize
                      ? theme.primary
                      : "#25AAE1"
                    : isMobileSize
                    ? theme.grey03
                    : theme.white,
                })}
            </Tag>
          );
        })}
        <SearchInputWrapper>
          <SearchInput
            placeholder={i18n.t("slot.search")}
            imageUrl={searchIcon}
            handleChange={handleChangeSearch}
            value={searchString}
          />
        </SearchInputWrapper>
      </CommonContainer>
    </FilterSection>
  );
};

export default GameFilterTag;
