import React from "react";
import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { Common, getGameTypeName, i18n } from "@tgs-web-nx/utils";
import { useGetNonLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Loading from "@/components/UI/Loading";
import GameCard from "@/pages/home/components/GameCard";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import GameFilterToolBox from "@/pages/home/GameFilterToolBox";
import { useCardWidth } from "@/hooks/home/useCardWidth";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 6px;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
  }
`;

const CategoryContentWrapper = styled.div`
  overflow-y: auto;
  height: 100%;
  width: 100%;
  flex-shrink: 0;
`;

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  width: 100%;
  gap: 14px;
  align-self: stretch;

  ${media.sm} {
    padding: 0 0 20px;
  }
`;

const CategoryTitle = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.black};
  margin-bottom: 10px;

  display: none;

  ${media.sm} {
    display: block;
  }
`;

const NonLobbyCategory = () => {
  const { activeGameType } = useHomeGameContext();
  const { gameList, isLoading } = useGetNonLobbyCategoryList();
  const hasMappingData = !!gameList.length;
  const cardWidth = useCardWidth("14px");
  const { isDesktopSize } = useRwd();

  return (
    <Wrapper>
      <CategoryContentWrapper>
        {!isDesktopSize && <CategoryTitle>{i18n.t(getGameTypeName(activeGameType))}</CategoryTitle>}
        <GameFilterToolBox />

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
                style={{
                  width: cardWidth,
                  flexShrink: 0,
                }}
              />
            ))}
          {!hasMappingData && !isLoading && <div>No data</div>}
        </CategoryContent>
      </CategoryContentWrapper>
      <Loading show={isLoading} />
    </Wrapper>
  );
};

export default React.memo(NonLobbyCategory);
