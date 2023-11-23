import styled from "styled-components";
import { FilterTag, filterTagAll, useHomeGameContext } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import CommonTag from "./CommonTag";
import Tag from "./ProviderTag";
import SearchInput from "@/pages/home/components/SearchInput";
import searchIcon from "@/assets/t29/images/home/search.svg";
import { media } from "@/theme/breakpoints";

const FilterTagWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const CommonTagContainer = styled.div`
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

export const SearchInputWrapper = styled.div`
  width: 100%;
  height: 37px;

  ${media.sm} {
    width: 300px;
    height: 100%;
    margin-left: 8px;
  }
`;

const CommonSearchWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const HomeGameFilterTag = () => {
  const {
    filterTagList,
    providerFilterTagList,
    handleChangeActiveFilterTag,
    handleChangeActiveProviderFilterTag,
    activeFilterTag,
    activeProviderFilterTag,
    searchString,
    handleChangeSearch,
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

      <CommonSearchWrapper>
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

        <SearchInputWrapper>
          <SearchInput
            placeholder={i18n.t("slot.search")}
            imageUrl={searchIcon}
            handleChange={handleChangeSearch}
            value={searchString}
          />
        </SearchInputWrapper>
      </CommonSearchWrapper>
    </FilterTagWrapper>
  );
};

export default HomeGameFilterTag;
