import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useGetNonLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Loading from "@/components/UI/Loading";
import GameCard from "@/pages/home/components/GameCard";
import HomeGameFilterTag from "@/pages/home/components/HomeGameFilterTag";
import { media } from "@/theme/breakpoints";
import GameFilterTag from "@/pages/home/components/GameFilterTag";
import GameTypeTab from "@/pages/home/components/GameTypeTab";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import SearchInput from "@/pages/home/components/SearchInput";
import searchIcon from "@/assets/t27/images/home/search.svg";

const CategoryMainWrapper = styled.div`
  width: 100%;
  padding: 12px;
`;

const CategoryContentWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
  row-gap: 10px;
  flex-wrap: wrap;
`;

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  width: 100%;
  align-self: stretch;
  gap: 10px;

  ${media.sm} {
    max-height: unset;
    overflow-x: unset;
  }
`;

const SearchInputWrapper = styled.div`
  width: 100%;
  height: 47px;
  margin: 8px 0 10px 0 ;
`;

const NonLobbyCategory = () => {
  const { gameList, isLoading } = useGetNonLobbyCategoryList();
  const hasMappingData = !!gameList.length;
  const { searchString, handleChangeSearch } = useHomeGameContext();

  return (
    <>
      <GameTypeTab />
      <CategoryMainWrapper>
        <GameFilterTag />
        <SearchInputWrapper>
          <SearchInput
            placeholder={i18n.t("slot.search")}
            imageUrl={searchIcon}
            handleChange={handleChangeSearch}
            value={searchString}
          />
        </SearchInputWrapper>
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
      </CategoryMainWrapper>
      <Loading show={isLoading} />
    </>
  );
};

export default NonLobbyCategory;
