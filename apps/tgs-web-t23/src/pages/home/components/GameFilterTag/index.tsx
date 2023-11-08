import { gameTagList } from "@/core/constants/gameTag";
import { useHomeGameContext } from "@/core/feature/game/useHomeGameContext";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Tag from "./Tag";
import { FilterTag, FilterTagTypeEnum } from "@/core/feature/game/types";

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
      background: ${(props) => props.theme.tertiaryDark};
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
  const { activeFilterTag, handleChangeActiveFilterTag, filterTagList } = useHomeGameContext();
  const [prevFilterTag, setPrevFilterTag] = useState<FilterTag | null>(null);

  const handleFilterClick = (filterTag: FilterTag) => {
    setPrevFilterTag(filterTag);
    if (
      filterTag.tagType === prevFilterTag?.tagType &&
      filterTag.gpCode === prevFilterTag?.gpCode
    ) {
      handleChangeActiveFilterTag({
        tagType: FilterTagTypeEnum.ALL,
        name: "",
      });
    } else {
      handleChangeActiveFilterTag(filterTag);
    }
  };

  useEffect(() => {
    setPrevFilterTag(activeFilterTag);
  }, [activeFilterTag]);

  return (
    <TagContainer>
      {filterTagList.map((filterTag) => {
        const { name, tagType, gpCode } = filterTag;
        const isActive =
          (filterTag.tagType === FilterTagTypeEnum.PROVIDER && gpCode === activeFilterTag.gpCode) ||
          (filterTag.tagType !== FilterTagTypeEnum.PROVIDER && tagType === activeFilterTag.tagType);

        // const isActive = (function () {
        //   switch (tagType) {
        //     case FilterTagTypeEnum.PROVIDER:
        //       return gpCode === activeFilterTag.gpCode;

        //     default:
        //       return tagType === activeFilterTag.tagType;
        //   }
        // })();

        const tag = gameTagList.find((tag) => tag.text === name);

        return (
          <Tag
            key={name}
            text={name}
            isActive={isActive}
            icon={tag ? <img src={tag.iconUrl} alt={tag.text} /> : null}
            // icon={tag ? <tag.icon $color={isActive ? theme.primary : theme.lighterGray} /> : null}
            isShowIcon={gameTagList.some((tag) => tag.text === name)}
            onClick={() => handleFilterClick(filterTag)}
          />
        );
      })}
    </TagContainer>
  );
};

export default GameFilterTag;
