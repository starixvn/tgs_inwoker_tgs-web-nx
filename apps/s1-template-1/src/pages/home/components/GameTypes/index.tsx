import { GameTypeEnum } from "@tgs-web-nx/constants";
import { NavItem, useGameTypeList, useGetNavGameTypeItemList, useHomeGameContext } from "@tgs-web-nx/core/features";
import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import GameType from "./GameType";
import { media } from "@/theme/breakpoints";

const GameTypeEmbla = styled.section`
  &.embla__container {
    --slide-height: 6rem;
    --column-size: 4;
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
  const {sideNavGameTypeItemList} = useGetNavGameTypeItemList()
  const [emblaGameTypeRef] = useEmblaCarousel({ dragFree: true });
  const { activeGameType, handleChangeGameType } = useHomeGameContext();

  const { gameType: urlGameType } = useParams<{ gameType: string }>();
  const gameTypeList = useGameTypeList();

  const getGameTypeFromKey = (key: string) => {
    const matchingGameType = gameTypeList.find((gameTypeItem) => gameTypeItem.key === key);
    return matchingGameType ? matchingGameType.gameType : null;
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [activeGameType]);

  useEffect(() => {
    const gameType = getGameTypeFromKey(urlGameType);
    if (gameType) {
      handleChangeGameType(gameType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlGameType, gameTypeList]);

  const handleClickNav = (navItem: NavItem & { gameType: GameTypeEnum }) => {
    handleChangeGameType(navItem.gameType);
    if (navItem.navType !== "action") return;
    navItem.callback();
  };

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaGameTypeRef}>
        <GameTypeEmbla
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
        </GameTypeEmbla>
      </div>
    </section>
  );
};

export default GameTypes;
