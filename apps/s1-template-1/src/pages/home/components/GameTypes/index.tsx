import { media } from "@/theme/breakpoints";
import { DESKTOP_HEADER_HEIGHT, MOBILE_HEADER_HEIGHT } from "@/theme/constants";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { NavItem, useGameTypeList, useGetNavGameTypeItemList, useHomeGameContext } from "@tgs-web-nx/core/features";
import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import GameType from "./GameType";

const GameTypesEmbla = styled.section`
  &.game-types {
    position: sticky;
    top: ${MOBILE_HEADER_HEIGHT};
    z-index: 9;
    padding: 1.6rem 0;
    background-color: ${({ theme }) => theme.mainBackground};

    ${media.sm} {
      top: ${DESKTOP_HEADER_HEIGHT};
    }
  }
`;

const GameTypesEmblaContainer = styled.div`
  &.embla__container {
    --slide-height: 6rem;
    --column-size: 4;
    --slide-spacing: 0.8rem;
    --slide-size: calc(
      (100% / var(--column-size)) - ((0.8rem * (var(--column-size) - 1)) / var(--column-size))
    );

    ${media.sm} {
      --column-size: 5;
    }

    ${media.md} {
      --column-size: 6;
    }

    ${media.lg} {
      --column-size: 8;
    }
  }
`;

const GameTypes = () => {
  const { sideNavGameTypeItemList } = useGetNavGameTypeItemList();
  const [emblaGameTypeRef] = useEmblaCarousel({ dragFree: true });
  const { activeGameType, handleChangeGameType, handleChangeProvider } = useHomeGameContext();
  const scrollDemoRef = useRef(null);

  const { gameType: urlGameType } = useParams<{ gameType: string }>();
  const gameTypeList = useGameTypeList();

  const getGameTypeFromKey = (key: string) => {
    const matchingGameType = gameTypeList.find((gameTypeItem) => gameTypeItem.key === key);
    return matchingGameType ? matchingGameType.gameType : null;
  };

  useEffect(() => {
    //@ts-ignore
    if (scrollDemoRef && scrollDemoRef.current && scrollDemoRef.current.getBoundingClientRect()) {
      //@ts-ignore
      const scrollY = scrollDemoRef.current.offsetTop + scrollDemoRef.current.clientHeight / 2;
      window.scrollTo({
        top: activeGameType !== 0 ? scrollY : 0,
        behavior: "smooth",
      });
    }
  }, [activeGameType]);

  useEffect(() => {
    const gameType = getGameTypeFromKey(urlGameType);
    if (gameType) {
      handleChangeGameType(gameType);
      handleChangeProvider("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlGameType, gameTypeList]);

  const handleClickNav = (navItem: NavItem & { gameType: GameTypeEnum }) => {
    handleChangeGameType(navItem.gameType);
    if (navItem.navType !== "action") return;
    navItem.callback();
  };

  return (
    <GameTypesEmbla ref={scrollDemoRef} className="embla game-types">
      <div className="embla__viewport" ref={emblaGameTypeRef}>
        <GameTypesEmblaContainer
          className={`embla__container ${sideNavGameTypeItemList.length <= 4 ? "" : "two-rows"}`}
        >
          {sideNavGameTypeItemList &&
            sideNavGameTypeItemList.map((navItem: any, index: number) => {
              const isActive = navItem.gameType === activeGameType;
              return (
                <GameType
                  isActive={isActive}
                  key={index}
                  navItem={navItem}
                  handleClickNav={() => handleClickNav(navItem)}
                />
              );
            })}
        </GameTypesEmblaContainer>
      </div>
    </GameTypesEmbla>
  );
};

export default GameTypes;
