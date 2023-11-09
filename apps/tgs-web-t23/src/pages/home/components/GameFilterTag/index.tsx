import React, { useState } from "react";
import styled from "styled-components";
import Tag from "./Tag";
import { gameTagList } from "@/core/constants/gameTag";
import { FilterTag, FilterTagTypeEnum } from "@/core/feature/game/types";
import { useHomeGameContext } from "@/core/feature/game/useHomeGameContext";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";

const TagContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  ${media.sm} {
    margin-top: 20px;
    padding-bottom: 5px;

    &::-webkit-scrollbar {
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
      background: ${(props) => props.theme.mainDarkBackground};
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
    activeProviderFilterTag,
    handleChangeActiveProviderFilterTag,
    providerFilterTagList,
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
      }
    } else {
      if (filterTag.tagType === prevFilterTag?.tagType) {
        handleChangeActiveFilterTag(allTag);
        handleChangeActiveProviderFilterTag(allTag);
        setPrevFilterTag(allTag);
      } else {
        handleChangeActiveFilterTag(filterTag);
      }
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
                $color: isActive ? theme.primary : theme.lighterGray,
              })}
          </Tag>
        );
      })}

      {/* Provider list */}

      {providerFilterTagList.map((filterTag) => {
        const { name, gpCode } = filterTag;

        const isActive =
          filterTag.tagType === FilterTagTypeEnum.PROVIDER &&
          gpCode === activeProviderFilterTag.gpCode;

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
                $color: isActive ? theme.primary : theme.lighterGray,
              })}
          </Tag>
        );
      })}
    </TagContainer>
  );
};

export default GameFilterTag;
