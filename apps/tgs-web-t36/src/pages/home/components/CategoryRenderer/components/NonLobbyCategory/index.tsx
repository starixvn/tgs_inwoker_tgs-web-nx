import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { Common } from "@tgs-web-nx/utils";
import { useGetNonLobbyCategoryList } from "@tgs-web-nx/core/features";
import { useLocation } from "react-router";
import React, { useEffect, useState } from "react";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Loading from "@/components/UI/Loading";
import GameCard from "@/pages/home/components/GameCard";
import { media } from "@/theme/breakpoints";
import GameFilterTag from "@/pages/home/components/GameFilterTag";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import SideNavItem from "@/layouts/components/MenuDrawer/components/MenuDrawerList/components/SideNavItem";

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

const NonLobbyCategory = () => {
  const { gameList, isLoading } = useGetNonLobbyCategoryList();
  const { sideNavItemList } = useGetNavItemList();
  const { isMobileSize } = useRwd();
  const [currentGameType, setCurrentGameType] = useState<NavItem | null>(null);
  const hasMappingData = !!gameList.length;
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const currentRoute = pathSegments[pathSegments.length - 1];

  useEffect(() => {
    sideNavItemList.map((item) => {
      if (item.key === currentRoute) {
        setCurrentGameType(item);
      }
    });
  }, [sideNavItemList]);

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
      </CategoryMainWrapper>
      <Loading show={isLoading} />
    </>
  );
};

export default NonLobbyCategory;
