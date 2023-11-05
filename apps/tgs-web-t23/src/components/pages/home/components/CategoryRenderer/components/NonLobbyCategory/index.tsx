import searchIcon from "@/assets/t23/images/home/search.svg";
import Loading from "@/components/UI/Loading";
import GameCard from "@/components/pages/home/components/GameCard";
import GameFilterTag from "@/components/pages/home/components/GameFilterTag";
import HomeGameFilterTag from "@/components/pages/home/components/HomeGameFilterTag";
import SearchInput from "@/components/pages/home/components/SearchInput";
import config from "@/config/config";
import { useGetNonLobbyCategoryList } from "@/core/feature/game/useGetNonLobbyCategoryList";
import { useHomeGameContext } from "@/core/feature/game/useHomeGameContext";
import { useRwd } from "@/core/hooks/tools/useRwd";
import Common from "@/core/utils/Common";
import i18n from "@/core/utils/i18n";
import { useGameTypeList } from "@/hooks/home/useGameTypeList";
import { media } from "@/theme/breakpoints";
import styled from "styled-components";

const CategoryContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 10px;
  gap: 12px;
  flex-shrink: 0;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.mainDarkBackground};

  ${media.sm} {
    background-color: transparent;
  }
`;

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  gap: 8px;
  flex-shrink: 0;
  width: 100%;
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

const FilterSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 10px;
  gap: 12px;
  flex-shrink: 0;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.mainDarkBackground};

  ${media.sm} {
    background-color: transparent;
  }
`;

const NonLobbyCategory = () => {
  const { isMobileSize, isDesktopSize } = useRwd();
  const { activeGameType, searchString, handleChangeSearch } = useHomeGameContext();
  const { gameList, isLoading } = useGetNonLobbyCategoryList();
  const categoryTitle = useGameTypeList().find(item => item.gameType === activeGameType)?.text;
  const hasMappingData = !!gameList.length;

  return (
    <>
      {isMobileSize && <>
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
      }
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
