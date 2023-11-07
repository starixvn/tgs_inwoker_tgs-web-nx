import { gameTagList } from "@/core/constants/gameTag";
import { FilterTagTypeEnum } from "@/core/feature/game/hooks/useFilterTag";
import { useHomeGameContext } from "@/core/feature/game/useHomeGameContext";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";
import styled from "styled-components";
import Tag from "./Tag";

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

  return (
    <TagContainer>
      {filterTagList.map((filterTag) => {
        const { name, tagType, gpCode } = filterTag;

        const isActive = (function () {
          switch (tagType) {
            case FilterTagTypeEnum.PROVIDER:
              return gpCode === activeFilterTag.gpCode;

            default:
              return tagType === activeFilterTag.tagType;
          }
        })();

        const tag = gameTagList.find((tag) => tag.text === name);

        return (
          <Tag
            key={name}
            text={name}
            isActive={isActive}
            icon={tag ? <img src={tag.iconUrl} alt={tag.text} /> : null}
            // icon={tag ? <tag.icon $color={isActive ? theme.primary : theme.lighterGray} /> : null}
            isShowIcon={gameTagList.some((tag) => tag.text === name)}
            onClick={() => handleChangeActiveFilterTag(filterTag)}
          />
        );
      })}
    </TagContainer>
  );
};

export default GameFilterTag;
