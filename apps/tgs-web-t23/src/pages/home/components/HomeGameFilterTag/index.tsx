import { FilterTagTypeEnum } from "@/core/feature/game/hooks/useFilterTag";
import { useHomeGameContext } from "@/core/feature/game/useHomeGameContext";
import styled from "styled-components";
import CommonTag from "./CommonTag";
import Tag from "./ProviderTag";

const FilterTagWrapper = styled.div`
  width: 100%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CommonTagContainer = styled.div`
  width: 100%;
  height: 50px;
  padding: 4px 0px;
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  align-items: center;
  gap: 5px;
`;

const ProviderTagContainer = styled.div`
  width: 100%;
  height: 40px;
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  align-items: center;
  gap: 5px;
  row-gap: 8px;
  flex-shrink: 0;
`;

const HomeGameFilterTag = () => {
  const {
    handleChangeActiveFirstRowFilterTag,
    handleChangeActiveSecondRowFilterTag,
    activeFirstRowFilterTag,
    activeSecondRowFilterTag,
    firstRowTags,
    secondRowTags
  } = useHomeGameContext();

  return (
    <FilterTagWrapper>
      <CommonTagContainer>
        {firstRowTags.map((filterTag) => {
          return (
            <CommonTag
              key={filterTag.name}
              text={filterTag.name}
              isActive={filterTag.tagType === activeFirstRowFilterTag.tagType}
              onClick={() => handleChangeActiveFirstRowFilterTag(filterTag)}
            />
          );
        })}
      </CommonTagContainer>
      <ProviderTagContainer>
        {[{ name: "All", tagType: FilterTagTypeEnum.ALL }, ...secondRowTags].map((filterTag) => {
          return (
            <Tag
              key={filterTag.name}
              text={filterTag.name}
              isActive={filterTag.tagType === activeSecondRowFilterTag.tagType}
              onClick={() => handleChangeActiveSecondRowFilterTag(filterTag)}
            />
          );
        })}
      </ProviderTagContainer>
    </FilterTagWrapper>
  );
};

export default HomeGameFilterTag;
