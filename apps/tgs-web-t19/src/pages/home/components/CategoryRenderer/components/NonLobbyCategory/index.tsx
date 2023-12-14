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
import searchIcon from "@/assets/t19/images/home/search.svg";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 16px;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    padding: 20px 0px 32px 0px;
  }
`;

const CategoryContentWrapper = styled.div`
  overflow-y: auto;
  height: 100%;
  width: calc(100% - 78px);
  gap: 12px;
  padding: 12px 0px;
`;

const DesktopCategoryContentWrapper = styled.div`
  width: 100%;
  row-gap: 15px;
  column-gap: 35px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
`;

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  width: 100%;
  gap: 8px;
  padding: 14px 0px 18px 14px;
  align-self: stretch;
  border-radius: 20px;
  border: 2.5px solid #B78316;
  background-color: #332915;
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
  color: ${({ theme }) => theme.gray};
  font-size: 18px;
  font-weight: 700;
`;

const SearchInputWrapper = styled.div`
  width: 100%;
  height: 40px;
  margin: 12px 0 ;

  ${media.sm} {
    width: 300px;
    height: 100%;
    margin-left: 8px;
  }
`;

const NonLobbyCategory = () => {
  const { isDesktopSize, isMobileSize } = useRwd();
  const { gameList, isLoading } = useGetNonLobbyCategoryList();
  const hasMappingData = !!gameList.length;
  const { searchString, handleChangeSearch } = useHomeGameContext();

  return (
    <Wrapper>
      {isMobileSize && (
        <>
          <GameTypeTab />
          <CategoryContentWrapper>
            <SearchInputWrapper>
              <SearchInput
                placeholder={i18n.t("slot.search")}
                imageUrl={searchIcon}
                handleChange={handleChangeSearch}
                value={searchString}
              />
            </SearchInputWrapper>

            <CategoryContent>
              <GameFilterTag />
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
        </>
      )}

      {isDesktopSize && (
        <DesktopWrapper>
          <HomeGameFilterTag />
          <DesktopCategoryContentWrapper>
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
            {!hasMappingData && !isLoading && <Text>No data</Text>}
          </DesktopCategoryContentWrapper>
        </DesktopWrapper>
      )}
      <Loading show={isLoading} />
    </Wrapper>
  );
};

export default NonLobbyCategory;
