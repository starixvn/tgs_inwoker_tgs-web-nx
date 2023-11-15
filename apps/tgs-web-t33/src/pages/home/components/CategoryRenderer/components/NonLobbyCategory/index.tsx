import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useGetNonLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import searchIcon from "@/assets/t23/images/home/search.svg";
import Loading from "@/components/UI/Loading";
import { useGameTypeList } from "@/hooks/home/useGameTypeList";
import GameCard from "@/pages/home/components/GameCard";
import HomeGameFilterTag from "@/pages/home/components/HomeGameFilterTag";
import SearchInput from "@/pages/home/components/SearchInput";
import { media } from "@/theme/breakpoints";
import GameFilterTag from "@/pages/home/components/GameFilterTag";

const CategoryContentWrapper = styled.div`
  width: 100%;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.mainBackground};
`;

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  width: 100%;
  row-gap: 10px;
  column-gap: 9px;
  align-self: stretch;

  ${media.sm} {
    row-gap: 5px;
    column-gap: 9px;
  }
`;

const CategoryLabel = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchInputWrapper = styled.div`
  width: 150px;
  height: 40px;
`;

const CategoryTitle = styled.div`
  color: ${(props) => props.theme.white};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 14px;
  padding: 10px 0px;
`;

const NonLobbyCategory = () => {
  const { isMobileSize, isDesktopSize } = useRwd();
  const { activeGameType, searchString, handleChangeSearch } = useHomeGameContext();
  const { gameList, isLoading } = useGetNonLobbyCategoryList();
  const categoryTitle = useGameTypeList().find((item) => item.gameType === activeGameType)?.text;
  const hasMappingData = !!gameList.length;

  return (
    <>
      {isMobileSize && (
        <>
          <CategoryLabel>
            <CategoryTitle>{categoryTitle}</CategoryTitle>
            <SearchInputWrapper>
              <SearchInput
                placeholder={i18n.t("slot.search")}
                imageUrl={searchIcon}
                handleChange={handleChangeSearch}
                value={searchString}
              />
            </SearchInputWrapper>
          </CategoryLabel>
          <GameFilterTag />
        </>
      )}
      {isDesktopSize && <HomeGameFilterTag />}

      <CategoryContentWrapper>
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
    </>
  );
};

export default NonLobbyCategory;
