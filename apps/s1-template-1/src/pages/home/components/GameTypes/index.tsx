import { media } from "@/theme/breakpoints";
import { DESKTOP_HEADER_HEIGHT, MOBILE_HEADER_HEIGHT } from "@/theme/constants";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { NavItem, TagTypeEnum, useGameTypeList, useGetNavGameTypeItemList, useHomeGameContext } from "@tgs-web-nx/core/features";
import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import GameType from "./GameType";

const GameTypesEmbla = styled.section`
  position: sticky;
  top: ${MOBILE_HEADER_HEIGHT};
  z-index: 9;
  border-radius: 0 0 ${({ theme }) => theme.blockBorderRadiusMobile}
    ${({ theme }) => theme.blockBorderRadiusMobile};
  padding: ${({ theme }) => theme.blockPaddingMobile};
  background-color: ${({ theme }) => theme.categoryAreaBackground};

  ${media.sm} {
    top: ${DESKTOP_HEADER_HEIGHT};
    padding: ${({ theme }) => theme.blockPadding};
    border-bottom-right-radius: ${({ theme }) => theme.blockBorderRadius};
    border-bottom-left-radius: ${({ theme }) => theme.blockBorderRadius};
  }

  .embla__viewport {
    margin-left: ${({ theme }) => theme.categoryAreaMargin};
    padding: ${({ theme }) => theme.categoryAreaPadding};
  }
`;

const GameTypesEmblaContainer = styled.div`
  &.embla__container {
    --slide-height: 6rem;
    --column-size: 3;
    --slide-spacing: 0.6rem;
    --slide-size: calc(
      (100% / var(--column-size)) -
        ((var(--slide-spacing) * (var(--column-size) - 1)) / var(--column-size))
    );

    ${media.xs} {
      --column-size: 4;
    }

    ${media.sm} {
      --slide-spacing: 0.8rem;
      --column-size: 5.5;
    }

    ${media.md} {
      --column-size: 6.5;
    }

    ${media.lg} {
      --column-size: 8;
    }
  }
`;

const GameTypes = () => {
  const { sideNavGameTypeItemList } = useGetNavGameTypeItemList();
  const [emblaGameTypeRef] = useEmblaCarousel({ dragFree: true });
  const {
    activeGameType,
    providerList,
    handleChangeGameType,
    handleGamesByProvider,
    handleChangeActiveTag,
  } = useHomeGameContext();
  const scrollDemoRef = useRef(null);

  const { gameType: urlGameType, sports: urlSport } = useParams<{
    gameType: string;
    sports: string;
  }>();
  const gameTypeList = useGameTypeList();

  const getGameTypeFromKey = (key: string) => {
    const matchingGameType = gameTypeList.find((gameTypeItem) => gameTypeItem.key === key);
    return matchingGameType ? matchingGameType.gameType : null;
  };

  const getProviderFromKey = (key: string) => {
    const matchingProvider = providerList.find((provider) => provider.route === key);
    return matchingProvider ? matchingProvider : null;
  };

  useEffect(() => {
    // //@ts-ignore
    // if (scrollDemoRef && scrollDemoRef.current && scrollDemoRef.current.getBoundingClientRect()) {
    //   //@ts-ignore
    //   const scrollY = scrollDemoRef.current.offsetTop + scrollDemoRef.current.clientHeight / 2;
    //   window.scrollTo({
    //     top: activeGameType !== 0 ? scrollY : 0,
    //     behavior: "smooth",
    //   });
    // }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [activeGameType]);

  useEffect(() => {
    const handleGameTypeChange = () => {
      const gameType = getGameTypeFromKey(urlGameType);

      if (gameType) {
        handleChangeGameType(gameType);
        return;
      }

      if (getGameTypeFromKey(urlSport)) {
        handleChangeGameType(GameTypeEnum.SPORTS);
        return;
      }

      const provider = getProviderFromKey(urlGameType);
      if (provider) {
        handleChangeGameType(GameTypeEnum.ALL);
        handleGamesByProvider(provider);
        return;
      }

      switch (urlGameType) {
        case "new":
          handleChangeGameType(GameTypeEnum.NEW);
          handleChangeActiveTag(TagTypeEnum.NEW);
          break;
        case "hot":
          handleChangeGameType(GameTypeEnum.HOT);
          handleChangeActiveTag(TagTypeEnum.HOT);
          break;
        default:
          break;
      }
    };

    handleGameTypeChange();
  }, [urlGameType, urlSport, gameTypeList, providerList]);

  const handleClickNav = (navItem: NavItem & { gameType: GameTypeEnum }) => {
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
                <div className="embla__slide" key={index}>
                  <GameType
                    isActive={isActive}
                    navItem={navItem}
                    handleClickNav={() => handleClickNav(navItem)}
                  />
                </div>
              );
            })}
        </GameTypesEmblaContainer>
      </div>
    </GameTypesEmbla>
  );
};

export default GameTypes;
