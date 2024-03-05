import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { Common } from "@tgs-web-nx/utils";
import {
  FilterTag,
  useGetLobbyCategoryList,
  useGetNonLobbyCategoryList,
  useHomeGameContext,
} from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import ProviderTag from "../../../HomeGameFilterTag/ProviderTag";
import Loading from "@/components/UI/Loading";
import GameCard from "@/pages/home/components/GameCard";
import HomeGameFilterTag from "@/pages/home/components/HomeGameFilterTag";
import { media } from "@/theme/breakpoints";
import GameFilterTag from "@/pages/home/components/GameFilterTag";
import GameTypeTab from "@/pages/home/components/GameTypeTab";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* justify-content: center; */
  width: 100%;
  gap: 6px;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
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
  ${media.sm} {
    width: calc(100% - 78px);
  }
`;

const FilterSection = styled.div`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
`;

const DesktopCategoryContentWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;

const ProviderTagContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  margin-bottom: 20px;
  line-height: 110px;
  padding: 0px 4px;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  gap: 4px;
  border-radius: 12px;
  background: ${({ theme }) => theme.grayGradient};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const GameListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  row-gap: 10px;
  column-gap: 10px;
  ${media.sm} {
    row-gap: 15px;
    column-gap: 30px;
  }
`;

const VenderListWarpper = styled(GameListWrapper)`
  justify-content: center;
`;

const CategoryContent = styled.div`
  display: flex;
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
  align-items: center;
`;

const Text = styled.div`
  width: 100%;
  text-align: center;
  padding: 40px 0;
  color: ${({ theme }) => theme.gray50};
  font-size: 18px;
  font-weight: 700;
`;

const NonLobbyCategory = () => {
  const { isDesktopSize, isMobileSize } = useRwd();
  const { gameList, isLoading } = useGetNonLobbyCategoryList();
  const hasMappingData = !!gameList.length;
  const { providerFilterTagList, activeProviderFilterTag, handleChangeActiveProviderFilterTag } =
    useHomeGameContext();
  const { navPopupCategoryList } = useGetLobbyCategoryList();

  const onChangeProviderFilterTag = (newFilterTag: FilterTag) => {
    handleChangeActiveProviderFilterTag(newFilterTag);
  };

  const getProviderAbbreviation = (provider: string) => {
    switch (provider) {
      case "No Limit City":
        return "NLC";
      case "PragmaticPlay":
        return "PP";
      default:
        return provider;
    }
  };

  return (
    <Wrapper>
      {isMobileSize && (
        <>
          <GameTypeTab />
          <CategoryContentWrapper>
            {activeProviderFilterTag.tagType !== "All" ? (
              <>
                <FilterSection>
                  <GameFilterTag />
                </FilterSection>
                <CategoryContent>
                  <GameListWrapper>
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
                  </GameListWrapper>
                </CategoryContent>
              </>
            ) : (
              <CategoryContent>
                <VenderListWarpper>
                  {providerFilterTagList
                    .filter((filterTag) => filterTag.name !== "All")
                    .map((filterTag) => {
                      const matchedProvider = navPopupCategoryList.find(
                        (provider) => provider.code === filterTag.gpCode,
                      );
                      const status = matchedProvider ? matchedProvider.status : -1;

                      return (
                        <ProviderTag
                          key={filterTag.name}
                          text={getProviderAbbreviation(filterTag.name)}
                          gpCode={filterTag.gpCode}
                          isActive={false}
                          onClick={() => onChangeProviderFilterTag(filterTag)}
                          status={status}
                        />
                      );
                    })}
                </VenderListWarpper>
              </CategoryContent>
            )}
          </CategoryContentWrapper>
        </>
      )}

      {isDesktopSize && (
        <DesktopWrapper>
          <HomeGameFilterTag />
          <DesktopCategoryContentWrapper>
            <ProviderTagContainer>
              {providerFilterTagList.map((filterTag) => {
                const matchedProvider = navPopupCategoryList.find(
                  (provider) => provider.code === filterTag.gpCode,
                );
                const status = matchedProvider ? matchedProvider.status : -1;

                return (
                  <ProviderTag
                    key={filterTag.name}
                    text={getProviderAbbreviation(filterTag.name)}
                    gpCode={filterTag.gpCode}
                    isActive={filterTag.gpCode === activeProviderFilterTag.gpCode}
                    onClick={() => onChangeProviderFilterTag(filterTag)}
                    status={status}
                  />
                );
              })}
            </ProviderTagContainer>
            <GameListWrapper>
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
            </GameListWrapper>
          </DesktopCategoryContentWrapper>
        </DesktopWrapper>
      )}
      <Loading show={isLoading} />
    </Wrapper>
  );
};

export default NonLobbyCategory;
