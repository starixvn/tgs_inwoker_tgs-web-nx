import React, { useState } from "react";
import styled from "styled-components";
import { FilterTag, FilterTagTypeEnum, useHomeGameContext } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import Tag from "./Tag";
import { gameTagList } from "@/constants/gameTag";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";
import { SearchInputWrapper } from "@/pages/home/components/HomeGameFilterTag";

import SearchInput from "@/pages/home/components/SearchInput";
import searchIcon from "@/assets/t29/images/home/search.svg";

const TagContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0px 6px 0px 14px;
  border-radius: 100px;
  gap: 3px;
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

const GameFilterTag = () => {
  const {
    activeFilterTag,
    handleChangeActiveFilterTag,
    filterTagList,
    searchString,
    handleChangeActiveProviderFilterTag,
    handleChangeSearch,
  } = useHomeGameContext();
  const [prevFilterTag, setPrevFilterTag] = useState<FilterTag | null>(activeFilterTag);

  const allTag = {
    tagType: FilterTagTypeEnum.ALL,
    name: "",
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
    <TagContainer>
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
            isActive={isActive}
            isShowIcon={gameTagList.some((tag) => tag.text === name)}
            onClick={() => handleFilterClick(filterTag)}
          >
            {tagCmp &&
              tagCmp.iconComponent &&
              React.createElement(tagCmp.iconComponent, {
                $color: isActive ? theme.primary : theme.text,
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
    </TagContainer>
  );
};

export default GameFilterTag;
