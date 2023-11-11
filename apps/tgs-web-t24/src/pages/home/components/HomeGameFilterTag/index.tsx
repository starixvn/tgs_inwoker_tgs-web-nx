import styled from "styled-components";
import { FilterTag, filterTagAll, useHomeGameContext } from "@tgs-web-nx/core/features";
import CommonTag from "./CommonTag";
import Tag from "./ProviderTag";

const FilterTagWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CommonTagContainer = styled.div`
  width: 100%;
  height: 50px;
  padding: 4px 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
`;

const ProviderTagContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  row-gap: 8px;
  flex-shrink: 0;
`;

const HomeGameFilterTag = () => {
  const {
    filterTagList,
    providerFilterTagList,
    handleChangeActiveFilterTag,
    handleChangeActiveProviderFilterTag,
    activeFilterTag,
    activeProviderFilterTag,
  } = useHomeGameContext();

  const onChangeFilterTag = (newFilterTag: FilterTag) => {
    handleChangeActiveFilterTag(newFilterTag);
    handleChangeActiveProviderFilterTag(filterTagAll);
  };

  const onChangeProviderFilterTag = (newFilterTag: FilterTag) => {
    handleChangeActiveProviderFilterTag(newFilterTag);
  };

  return (
    <FilterTagWrapper>
      <CommonTagContainer>
        {filterTagList.map((filterTag) => {
          return (
            <CommonTag
              key={filterTag.name}
              text={filterTag.name}
              isActive={filterTag.tagType === activeFilterTag.tagType}
              onClick={() => onChangeFilterTag(filterTag)}
            />
          );
        })}
      </CommonTagContainer>
      <ProviderTagContainer>
        {providerFilterTagList.map((filterTag) => {
          return (
            <Tag
              key={filterTag.name}
              text={filterTag.name}
              isActive={filterTag.gpCode === activeProviderFilterTag.gpCode}
              onClick={() => onChangeProviderFilterTag(filterTag)}
            />
          );
        })}
      </ProviderTagContainer>
    </FilterTagWrapper>
  );
};

export default HomeGameFilterTag;
