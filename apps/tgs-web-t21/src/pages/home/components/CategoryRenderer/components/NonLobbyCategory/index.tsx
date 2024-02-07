import React from "react";
import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { Common, getGameTypeName, i18n } from "@tgs-web-nx/utils";
import {
  FilterTag,
  FilterTagTypeEnum,
  useGetLobbyCategoryList,
  useGetNonLobbyCategoryList,
  useHomeGameContext,
} from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import SearchInput from "../../../SearchInput";
import Loading from "@/components/UI/Loading";
import GameCard from "@/pages/home/components/GameCard";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import GameFilterToolBox from "@/pages/home/GameFilterToolBox";
import { useCardWidth } from "@/hooks/home/useCardWidth";
import Tag from "@/pages/home/components/HomeGameFilterTag/ProviderTag";
import searchIcon from "@/assets/t21/images/home/search.svg";
import { theme } from "@/theme";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  max-width: ${SUB_CONTENT_MAX_WIDTH};
  margin: 0 auto;
  overflow-y: auto;
  height: 100%;
  width: 100%;
  flex-shrink: 0;
`;

const VenderContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.gray5};
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 40px 36px;
`;

const FilterContainer = styled(VenderContainer)`
  background: ${({ theme }) => theme.white};
  padding: 20px 36px;
`;

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  width: 100%;
  gap: 14px;
  padding: 14px;
  align-self: stretch;
  color: ${({ theme }) => theme.black};
  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
  }
`;

type FilterTextProps = {
  $isActive: boolean;
  theme: typeof theme;
};

const FilterText = styled.div<FilterTextProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  height: 32px;
  font-size: 14px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 0em;
  color: ${({ theme, $isActive }) => ($isActive ? theme.primary : theme.gray80)};
  cursor: pointer;
`;

const FilterContent = styled(CategoryContent)`
  justify-content: space-between;
`;

const FilterTextWarpper = styled.div`
  display: flex;
  gap: 13px;
`;

const NonLobbyCategory = () => {
  const {
    activeGameType,
    filterTagList,
    providerFilterTagList,
    activeProviderFilterTag,
    handleChangeActiveProviderFilterTag,
    activeFilterTag,
    handleChangeActiveFilterTag,
  } = useHomeGameContext();

  const { isMobileSize, isDesktopSize } = useRwd();
  const { gameList, isLoading } = useGetNonLobbyCategoryList();
  const hasMappingData = !!gameList.length;
  const cardWidth = useCardWidth("14px");
  const { navPopupCategoryList } = useGetLobbyCategoryList();
  const onChangeProviderFilterTag = (newFilterTag: FilterTag) => {
    handleChangeActiveProviderFilterTag(newFilterTag);
  };
  const { searchString, handleChangeSearch } = useHomeGameContext();
  const handleFilterTagClick = (filterTag: FilterTag) => {
    const allTag = {
      tagType: FilterTagTypeEnum.ALL,
      name: FilterTagTypeEnum.ALL,
    };
    if (activeFilterTag.tagType === filterTag.tagType) {
      handleChangeActiveFilterTag(allTag);
    } else {
      handleChangeActiveFilterTag(filterTag);
    }
  };
  return (
    <Wrapper>
      {isDesktopSize && (
        <>
          <VenderContainer>
            <CategoryContent>
              {providerFilterTagList
                // .filter((filterTag) => filterTag.name !== "All")
                .map((filterTag) => {
                  const matchedProvider = navPopupCategoryList.find(
                    (provider) => provider.code === filterTag.gpCode,
                  );
                  const status = matchedProvider ? matchedProvider.status : -1;
                  return (
                    <Tag
                      key={filterTag.name}
                      text={filterTag.name}
                      gpCode={filterTag.gpCode}
                      isActive={filterTag.name === activeProviderFilterTag.name}
                      onClick={() => onChangeProviderFilterTag(filterTag)}
                      status={status}
                    />
                  );
                })}
            </CategoryContent>
          </VenderContainer>
          <FilterContainer>
            <FilterContent>
              <FilterTextWarpper>
                {filterTagList.map((filterTag, index) => {
                  const isActive = filterTag.name === activeFilterTag.name;
                  return (
                    <FilterText
                      key={index}
                      $isActive={isActive}
                      onClick={() => handleFilterTagClick(filterTag)}
                    >
                      {filterTag.name.toUpperCase()}
                    </FilterText>
                  );
                })}
              </FilterTextWarpper>
              <SearchInput
                placeholder={i18n.t("slot.search")}
                imageUrl={searchIcon}
                handleChange={handleChangeSearch}
                value={searchString}
              />
            </FilterContent>
          </FilterContainer>
        </>
      )}

      <ContentWrapper>
        {isMobileSize && <GameFilterToolBox />}
        <CategoryContent>
          {hasMappingData &&
            gameList.map((gameItem) => (
              <GameCard
                key={gameItem.id}
                gameItem={gameItem}
                isActive={gameItem.isactive}
                imageUrl={`${
                  config.sourceUrl
                }${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                  gameItem.code
                }.jpg`}
                style={{
                  width: cardWidth,
                  flexShrink: 0,
                }}
              />
            ))}
          {!hasMappingData && !isLoading && <div>No data</div>}
        </CategoryContent>
      </ContentWrapper>
      <Loading show={isLoading} />
    </Wrapper>
  );
};

export default React.memo(NonLobbyCategory);
