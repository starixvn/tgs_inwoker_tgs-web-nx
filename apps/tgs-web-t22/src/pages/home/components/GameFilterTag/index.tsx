import React, { useState } from "react";
import styled from "styled-components";
import { FilterTag, FilterTagTypeEnum, useHomeGameContext } from "@tgs-web-nx/core/features";
import Tag from "./Tag";
import { gameTagList } from "@/constants/gameTag";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";

const TagContainer = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  background: ${({ theme }) => theme.navMenuBackground};
  width: 100%;

  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

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
    handleChangeActiveProviderFilterTag,
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
            onClick={() => handleFilterClick(filterTag)}
          >
            {tagCmp &&
              tagCmp.iconComponent &&
              React.createElement(tagCmp.iconComponent, {
                $color: isActive ? theme.labelText : theme.gray02,
              })}
          </Tag>
        );
      })}
    </TagContainer>
  );
};

export default GameFilterTag;
