import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { Common, i18n } from "@tgs-web-nx/utils";
import {
  FilterTag,
  useGetNonLobbyCategoryList,
  useHomeGameContext,
} from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Loading from "@/components/UI/Loading";
import GameCard from "@/pages/home/components/GameCard";
import HomeGameFilterTag from "@/pages/home/components/HomeGameFilterTag";
import { media } from "@/theme/breakpoints";
import GameFilterTag from "@/pages/home/components/GameFilterTag";
import GameTypeTab from "@/pages/home/components/GameTypeTab";
import SearchInput from "@/pages/home/components/SearchInput";
import searchIcon from "@/assets/t29/images/home/search.svg";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 12px;
  flex: 1;
  width: 100%;
  overflow-y: auto;

  ${media.sm} {
    display: block;
  }
`;

const VendorCard = styled.div`
  width: 100%;
`;

const VendorText = styled.p`
  margin-top: 6px;
  max-width: 100%;

  color: ${(props) => props.theme.navTextDefault};
  font-size: .9rem;
  line-height: 20px;
  text-align: center;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const VendorImage = styled.div<{
  $imageUrl: string;
}>`
  position: relative;
  background: url(${({$imageUrl}) => $imageUrl}) no-repeat center;
  background-size: 90%;
  border-radius: 6px;
  border: 1px solid ${({theme}) => theme.gray01};
  width: 100%;
  aspect-ratio: 1;
`;

const CategoryContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.mainBackground};
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const FilterSection = styled.div`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 35px;
  width: 100%;
`;

const CategoryContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: 100%;
  

  ${media.sm} {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    align-self: stretch;
  }
`;

const DesktopWrapper = styled.div`
  padding: 30px 0;
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
  const { activeGameTypeKey, searchString, handleChangeSearch, providerFilterTagList, activeProviderFilterTag, handleChangeActiveProviderFilterTag  } = useHomeGameContext();

  const onChangeProviderFilterTag = (newFilterTag: FilterTag) => {
    handleChangeActiveProviderFilterTag(newFilterTag);
  };

  const renderMobileLayout = () => {
    const renderCards = () => {
      if(activeProviderFilterTag.tagType !== "All") {
        return (
          <>
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
          </>
        )
      }
      
      return (
        providerFilterTagList
          .filter((filterTag) => filterTag.name !== "All")
          .map((filterTag, i) => (
              <VendorCard 
                key={i} 
                onClick={() => onChangeProviderFilterTag(filterTag)}
              >
                <VendorImage $imageUrl={`${import.meta.env.BASE_URL}assets/images/home/provider_logo/${activeGameTypeKey}/${filterTag.gpCode}.png`}/>
                <VendorText>{filterTag.name}</VendorText>
              </VendorCard>
            )
        )
      )
    };
    
    return (
      <>
        <GameTypeTab />
        <CategoryContentWrapper>
          <FilterSection>
            <SearchInput
              placeholder={i18n.t("slot.search")}
              imageUrl={searchIcon}
              handleChange={handleChangeSearch}
              value={searchString}
            />
            <GameFilterTag />
          </FilterSection>
          <CategoryContent>
            {renderCards()}
          </CategoryContent>
        </CategoryContentWrapper>
      </>
    );
  };

  const renderDesktopLayout = () => {
    return (
      <DesktopWrapper>
        <HomeGameFilterTag />
        <Content>
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
        </Content>
      </DesktopWrapper>
    );
  };

  return (
    <Wrapper>
      {/* mobile layout*/}
      {isMobileSize && renderMobileLayout()}

      {/* desktop layout */}
      {isDesktopSize && renderDesktopLayout()}
      
      <Loading show={isLoading} />
    </Wrapper>
  );
};

export default NonLobbyCategory;
