import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { Common } from "@tgs-web-nx/utils";
import { useGetNonLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Loading from "@/components/UI/Loading";
import GameCard from "@/pages/home/components/GameCard";
import HomeGameFilterTag from "@/pages/home/components/HomeGameFilterTag";
import { media } from "@/theme/breakpoints";
import GameFilterTag from "@/pages/home/components/GameFilterTag";
import GameTypeTab from "@/pages/home/components/GameTypeTab";

const CategoryMainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  gap: 20px;
`;

const CategoryContent = styled.div`
  width: 100%;
  flex: 1;
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  gap: 10px;
  padding: 0px 10px;

  ${media.sm} {
    gap: 20px;
    padding: 0px 0px;
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
  const { isMobileSize, isDesktopSize } = useRwd();

  return (
    <>
      {isMobileSize && <GameTypeTab />}
      <CategoryMainWrapper>
        {isDesktopSize && <HomeGameFilterTag />}
        {isMobileSize && <GameFilterTag />}

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
      </CategoryMainWrapper>
      <Loading show={isLoading} />
    </>
  );
};

export default NonLobbyCategory;
