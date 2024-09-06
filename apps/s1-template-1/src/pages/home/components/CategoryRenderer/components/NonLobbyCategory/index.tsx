import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import {
  FilterTag,
  useGetLobbyCategoryList,
  useHomeGameContext,
  useGetNonLobbyCategoryList,
} from "@tgs-web-nx/core/features";
import { MenuItem, Select } from "@mui/material";
import { providerStatus } from "@tgs-web-nx/constants";
import Loading from "@/components/UI/Loading";
import GameCard from "@/pages/home/components/GameCard";
import HomeGameFilterTag, { SearchInputWrapper } from "@/pages/home/components/HomeGameFilterTag";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import SearchInput from "@/pages/home/components/SearchInput";
import searchIcon from "@/assets/t29/images/home/search.svg";
import { theme } from "@/theme";
import LoadMore from "../LoadMore";


const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 6px;

  ${media.sm} {
    /* max-width: ${SUB_CONTENT_MAX_WIDTH}; */
    margin: 0 auto;
    padding: 15px 0px;
  }
`;

const CategoryContentWrapper = styled.div`
  overflow-y: auto;
  height: 100%;
  width: 100%;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.mainBackground};
  padding: 0 20px;
`;

const FilterSection = styled.div`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
`;

const DesktopCategoryContentWrapper = styled.div`
  width: 100%;
  gap: 10px 6px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  padding: 24px 0;
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

const DesktopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* padding: 24px 0; */
  /* align-items: center; */
`;

const Text = styled.div`
  width: 100%;
  text-align: center;
  padding: 40px 0;
  color: ${({ theme }) => theme.gray50};
  font-size: 18px;
  font-weight: 700;
`;

const GameTitle = styled.div`
  font-size: 28px;
  font-weight: 510;
  line-height: 31px;
  letter-spacing: 0em;
`;

const NonLobbyCategory = () => {
  const { isDesktopSize, isMobileSize } = useRwd();
  const { gameList, isLoading } = useGetNonLobbyCategoryList();
  const {
    providerFilterTagList,
    handleChangeActiveProviderFilterTag,
    activeProviderFilterTag,
    searchString,
    handleChangeSearch,
    activeGameTypeKey
  } = useHomeGameContext();
  const hasMappingData = !!gameList.length;
  const { navPopupCategoryList } = useGetLobbyCategoryList();

  const handleSelectProvider = (providerName: string) => {
    const newFilterTag = providerFilterTagList.find(
      (tag: FilterTag) => tag.name === providerName,
    ) as FilterTag;
    handleChangeActiveProviderFilterTag(newFilterTag);
  };

  return (
    <Wrapper>
      {isMobileSize && (
        <CategoryContentWrapper>
          <FilterSection>
            <HomeGameFilterTag />
            <SearchInputWrapper>
              <Select
                onChange={(e) => handleSelectProvider(e.target.value)}
                value={activeProviderFilterTag.name}
                sx={{
                  minWidth: "180px",
                  height: "50px",
                  backgroundColor: theme.secBTNBGC,
                  color: theme.text,
                  padding: "0 12px",
                  borderRadius: "50px",
                  "& .MuiSvgIcon-root": {
                    color: theme.white,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              >
                {providerFilterTagList.map((filterTag) => {
                  const matchedProvider = navPopupCategoryList.find(
                    (provider) => provider.code === filterTag.gpCode,
                  );
                  const status = matchedProvider ? matchedProvider.status : -1;

                  return (
                    <MenuItem
                      key={filterTag.name}
                      value={filterTag.name}
                      sx={{ color: "black" }}
                      disabled={status === providerStatus.Maintenance}
                    >
                      {filterTag.name}
                    </MenuItem>
                  );
                })}
              </Select>
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
                  imageUrl={`${
                    config.sourceUrl
                  }${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                    gameItem.code
                  }.jpg`}
                />
              ))}
            {!hasMappingData && !isLoading && <div>No data</div>}
          </CategoryContent>
          <LoadMore></LoadMore>
        </CategoryContentWrapper>
      )}

      {isDesktopSize && (
        <DesktopWrapper>
          <HomeGameFilterTag />
          <GameTitle>
            {activeGameTypeKey !== "fishing"
              ? i18n.t(`common.${activeGameTypeKey}`)
              : i18n.t(`common.fish`)}
          </GameTitle>
          <DesktopCategoryContentWrapper>
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
                />
              
              ))}
            {!hasMappingData && !isLoading && <Text>No data</Text>}
          </DesktopCategoryContentWrapper>
          <LoadMore></LoadMore>
        </DesktopWrapper>
      )}
      <Loading show={isLoading} />
    </Wrapper>
  );
};

export default NonLobbyCategory;
