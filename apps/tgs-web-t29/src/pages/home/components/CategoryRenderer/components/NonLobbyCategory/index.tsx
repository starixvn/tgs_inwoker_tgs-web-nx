import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useGetNonLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import searchIcon from "@/assets/t29/images/home/search.svg";
import Loading from "@/components/UI/Loading";
import GameCard from "@/pages/home/components/GameCard";
import HomeGameFilterTag from "@/pages/home/components/HomeGameFilterTag";
import SearchInput from "@/pages/home/components/SearchInput";
import { media } from "@/theme/breakpoints";
import GameFilterTag from "@/pages/home/components/GameFilterTag";
import GameTypeTab from "@/pages/home/components/GameTypeTab";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 6px;
`;

const CategoryContentWrapper = styled.div`
  overflow-y: scroll;
  height: 100%;
  width: calc(100% - 78px);
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.mainBackground};
`;

const FilterSection = styled.div`
  width: 100%;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.mainBackground};
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
`;

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  width: 100%;
  row-gap: 10px;
  column-gap: 9px;
  align-self: stretch;

  ${media.sm} {
    row-gap: 5px;
    column-gap: 9px;
  }
`;

const SearchInputWrapper = styled.div`
  width: 100%;
  height: 37px;

  ${media.sm} {
    width: 300px;
    height: 100%;
    margin-left: 8px;
  }
`;

const FilterWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const NonLobbyCategory = () => {
  const { isDesktopSize } = useRwd();
  const { searchString, handleChangeSearch } = useHomeGameContext();
  const { gameList, isLoading } = useGetNonLobbyCategoryList();
  const hasMappingData = !!gameList.length;

  return (
    <Wrapper>
      <GameTypeTab />

      {isDesktopSize && (
        <FilterWrapper>
          <GameFilterTag />
          <SearchInputWrapper>
            <SearchInput
              placeholder={i18n.t("slot.search")}
              imageUrl={searchIcon}
              handleChange={handleChangeSearch}
              value={searchString}
            />
          </SearchInputWrapper>
        </FilterWrapper>
      )}

      <CategoryContentWrapper>
        <FilterSection>
          <GameFilterTag />
          <SearchInputWrapper>
            <SearchInput
              placeholder={i18n.t("slot.search")}
              imageUrl={searchIcon}
              handleChange={handleChangeSearch}
              value={searchString}
            />
          </SearchInputWrapper>
        </FilterSection>
        <CategoryContent>
          {hasMappingData &&
            gameList.map((gameItem) => (
              <GameCard
                key={gameItem.id}
                gameItem={gameItem}
                isActive={gameItem.isactive}
                imageUrl={`${config.sourceUrl
                  }${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${gameItem.code
                  }.jpg`}
              />
            ))}
          {!hasMappingData && !isLoading && <div>No data</div>}
        </CategoryContent>
      </CategoryContentWrapper>

      <Loading show={isLoading} />
    </Wrapper>
  );
};

export default NonLobbyCategory;
