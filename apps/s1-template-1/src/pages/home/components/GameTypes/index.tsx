import useGameTypeList from "@/hooks/home/useGameTypeList";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import { media } from "@/theme/breakpoints";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import GameType from "./GameType";

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
  // const { sideNavItemList } = useGetNavItemList();
  const [emblaGameTypeRef] = useEmblaCarousel({ dragFree: true });
  const { activeGameType, handleChangeGameType } = useHomeGameContext();

  const { gameType: urlGameType } = useParams<{ gameType: string }>();
  const gameTypeList = useGameTypeList();

  const getGameTypeFromKey = (key: string) => {
    const matchingGameType = gameTypeList.find((gameTypeItem) => gameTypeItem.key === key);
    return matchingGameType ? matchingGameType.gameType : null;
  };
  const tempGameTypeItems : any = [
    {
      key: "sports",
      label: "Sports",
      iconUrl: "/assets/images/common/icon-soccer.svg",
      iconActiveUrl: "",
      navType: "action",
      gameType: 1,
      router: "sports"
    },
    {
      key: "slots",
      label: "Slots",
      iconUrl: "/assets/images/common/icon-slots.svg",
      iconActiveUrl: "",
      navType: "action",
      gameType: 15,
      router: "slots"
    },
    {
      key: "liveCasino",
      label: "Live Casino",
      iconUrl: "/assets/images/common/icon-live-casino.svg",
      iconActiveUrl: "",
      navType: "action",
      gameType: 6,
      router: "liveCasino"
    },
    {
      key: "fishing",
      label: "Fishing",
      iconUrl: "/assets/images/common/icon-fishing.svg",
      iconActiveUrl: "",
      navType: "action",
      gameType: 9,
      router: "fishing"
    },
    {
      key: "TableGame",
      label: "Table Game",
      iconUrl: "/assets/images/common/icon-table-games.svg",
      iconActiveUrl: "",
      navType: "action",
      gameType: 16,
      router: "TableGame"
    },
    {
      key: "lottery",
      label: "Lottery",
      iconUrl: "/assets/images/common/icon-lottery.svg",
      iconActiveUrl: "",
      navType: "action",
      gameType: 14,
      router: "lottery"
    },
    {
      key: "sabong",
      label: "Cock Fighting",
      iconUrl: "/assets/images/common/icon-cock-fighting.svg",
      iconActiveUrl: "",
      navType: "action",
      gameType: 17,
      router: "sabong"
    },
    {
      key: "InstantPlay",
      label: "Instant Play",
      iconUrl: "/assets/images/common/icon-instant-play.svg",
      iconActiveUrl: "",
      navType: "action",
      gameType: 8,
      router: "instantplay"
    },
  ]
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
          className={`embla__container ${tempGameTypeItems.length <= 4 ? "" : "two-rows"}`}
        >
          {tempGameTypeItems &&
            tempGameTypeItems.map((navItem: any, index: number) => {
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
