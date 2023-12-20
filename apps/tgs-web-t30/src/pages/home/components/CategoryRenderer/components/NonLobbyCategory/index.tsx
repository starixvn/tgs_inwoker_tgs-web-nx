import React from "react";
import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { Common } from "@tgs-web-nx/utils";
import { useGetNonLobbyCategoryList } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Loading from "@/components/UI/Loading";
import GameCard from "@/pages/home/components/GameCard";
import HomeGameFilterTag from "@/pages/home/components/HomeGameFilterTag";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
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
`;

const DesktopCategoryContentWrapper = styled.div`
  width: 100%;
  gap: 15px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
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
  justify-content: center;
  align-items: flex-start;
`;

const Text = styled.div`
  width: 100%;
  text-align: center;
  padding: 40px 0;
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  font-weight: 700;
`;

const NonLobbyCategory = () => {
  const { isMobileSize } = useRwd();
  const { gameList, isLoading } = useGetNonLobbyCategoryList();
  const hasMappingData = !!gameList.length;

  return (
    <Wrapper>
      {isMobileSize ? (
        <CategoryContentWrapper>
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
        </CategoryContentWrapper>
      ) : (
        <DesktopWrapper>
          <HomeGameFilterTag />
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
        </DesktopWrapper>
      )}

      <Loading show={isLoading} />
    </Wrapper>
  );
};

export default React.memo(NonLobbyCategory);
