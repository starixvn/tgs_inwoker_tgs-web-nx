import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { Common } from "@tgs-web-nx/utils";
import {
  filterTagAll,
  useGetNonLobbyCategoryList,
  useHomeGameContext,
} from "@tgs-web-nx/core/features";
import React, { useEffect, useState } from "react";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { GameItem } from "@tgs-web-nx/types";
import Loading from "@/components/UI/Loading";
import GameCard from "@/pages/home/components/GameCard";
import { media } from "@/theme/breakpoints";
import GameFilterTag from "@/pages/home/components/GameFilterTag";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import SideNavItem from "@/layouts/components/MenuDrawer/components/MenuDrawerList/components/SideNavItem";
import useGameTypeList from "@/hooks/home/useGameTypeList";

const CategoryMainWrapper = styled.div`
  width: 100%;
  padding: 12px;
  ${media.sm} {
    padding: 12px 0;
  }
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
  justify-content: center;
  width: 100%;
  align-self: stretch;
  gap: 10px;
  ${media.sm} {
    max-height: unset;
    overflow-x: unset;
  }
`;
const preLoadAmount = 30;

const NonLobbyCategory = () => {
  const { gameList, isLoading } = useGetNonLobbyCategoryList();
  const { activeGameType } = useHomeGameContext();
  const gameTypeList = useGameTypeList();

  const [gameIndex, setGameIndex] = useState(preLoadAmount);
  const [displayGameList, setDisplayGameList] = useState<GameItem[]>([]);
  const { sideNavItemList } = useGetNavItemList();
  const { isMobileSize } = useRwd();
  const [currentGameType, setCurrentGameType] = useState<NavItem | undefined>(undefined);
  const { handleChangeActiveProviderFilterTag } = useHomeGameContext();
  const hasMappingData = !!gameList.length;

  const handleOnDocumentBottom = () => {
    const arr = gameList.slice(gameIndex, gameIndex + preLoadAmount);
    setDisplayGameList(displayGameList.concat(arr));
    setGameIndex(gameIndex + preLoadAmount);
  };

  useBottomScrollListener(handleOnDocumentBottom, { offset: 200 });

  useEffect(() => {
    const currentGametype = sideNavItemList.find(
      (gameItem) => gameItem.gameType === activeGameType,
    );
    setCurrentGameType(currentGametype);
  }, [gameList, gameTypeList]);

  useEffect(() => {
    const arr = gameList.slice(0, preLoadAmount);
    setGameIndex(preLoadAmount);
    setDisplayGameList(arr);
  }, [gameList, currentGameType]);

  useEffect(() => {
    handleChangeActiveProviderFilterTag(filterTagAll);
  }, [activeGameType]);

  return (
    <>
      <CategoryMainWrapper>
        {isMobileSize && (
          <SideNavItem
            key={currentGameType?.key}
            text={currentGameType?.label}
            isActive={false}
            onClick={() => {}}
          >
            {currentGameType?.iconComponent && React.createElement(currentGameType?.iconComponent)}
          </SideNavItem>
        )}

        <GameFilterTag />
        <CategoryContentWrapper>
          <CategoryContent>
            {hasMappingData &&
              displayGameList.map((gameItem) => (
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
      </CategoryMainWrapper>
      <Loading show={isLoading} />
    </>
  );
};

export default NonLobbyCategory;
