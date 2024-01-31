import React, { useState } from "react";
import styled from "styled-components";
import { FilterTag, FilterTagTypeEnum, useHomeGameContext } from "@tgs-web-nx/core/features";
import Tag from "./Tag";
import { gameTagList } from "@/constants/gameTag";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";
import IconTag from "./IconTag";
import SearchInput from "@/pages/home/components/SearchInput";
import { i18n } from "@tgs-web-nx/utils";
import searchIcon from "@/assets/t17/images/home/search.svg";

const FilterSection = styled.div`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0px 10px;
`;

const ProviderTagContainer = styled.div`
  width: 100%;
  height: 38px;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  align-self: stretch;

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
  height: 38px;
  display: flex;
`;

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 400;
  color: #F2F2F2;
`;

const GameFilterTag = () => {
  const {
    activeFilterTag,
    activeGameTypeKey,
    handleChangeActiveFilterTag,
    filterTagList,
    activeProviderFilterTag,
    handleChangeActiveProviderFilterTag,
    providerFilterTagList,
    searchString,
    handleChangeSearch
  } = useHomeGameContext();
  const [prevFilterTag, setPrevFilterTag] = useState<FilterTag | null>(activeFilterTag);

  const allTag = {
    tagType: FilterTagTypeEnum.ALL,
    name: "",
  };

  const handleFilterClick = (filterTag: FilterTag) => {
    setPrevFilterTag(filterTag);

    if (filterTag.tagType === FilterTagTypeEnum.PROVIDER) {
      if (filterTag.gpCode === prevFilterTag?.gpCode) {
        handleChangeActiveProviderFilterTag(allTag);
        handleChangeActiveFilterTag(allTag);
        setPrevFilterTag(allTag);
      } else {
        handleChangeActiveProviderFilterTag(filterTag);
        handleChangeActiveFilterTag(allTag);
      }
    } else {
      if (filterTag.tagType === prevFilterTag?.tagType) {
        handleChangeActiveFilterTag(allTag);
        handleChangeActiveProviderFilterTag(allTag);
        setPrevFilterTag(allTag);
      } else {
        handleChangeActiveFilterTag(filterTag);
        handleChangeActiveProviderFilterTag(allTag);
      }
    }
  };

  return (
    <FilterSection>
      <ProviderTagContainer>
        {providerFilterTagList.map((filterTag: FilterTag) => {
          const { name, gpCode } = filterTag;

          const isActive =
            (filterTag.tagType === FilterTagTypeEnum.PROVIDER &&
              gpCode === activeProviderFilterTag.gpCode);

          if (filterTag.tagType === FilterTagTypeEnum.ALL) {
            return null;
          }

          return (
            <Tag
              key={name}
              text={name}
              isActive={isActive}
              onClick={() => handleFilterClick(filterTag)}
            ></Tag>
          );
        })}
      </ProviderTagContainer>

      <SearchWrapper>
        <Title>{activeGameTypeKey}</Title>
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
              <IconTag
                key={name}
                text={name}
                isActive={isActive}
                isShowIcon={gameTagList.some((tag) => tag.text === name)}
                onClick={() => handleFilterClick(filterTag)}
              >
                {tagCmp &&
                  tagCmp.iconComponent &&
                  React.createElement(tagCmp.iconComponent, {
                    $color: isActive ? theme.primary : theme.lightGray,
                  })}
              </IconTag>
            );
          })}
        </CommonContainer>
        <SearchInput
          placeholder={i18n.t("slot.search")}
          imageUrl={searchIcon}
          handleChange={handleChangeSearch}
          value={searchString}
        />
      </SearchWrapper>
    </FilterSection>
  );
};

export default GameFilterTag;
