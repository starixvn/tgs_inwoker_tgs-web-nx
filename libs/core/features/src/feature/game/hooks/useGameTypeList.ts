import { GameTypeEnum, Theme } from "@tgs-web-nx/constants";
import { getGameTypeName, i18n } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import { useEffect, useState } from "react";

import { GameTypeItem } from "../useHomeGameContext";

const gameTypeList: GameTypeItem[] = [
  {
    key: "home",
    iconUrl: `/assets/images/game-type-icons/${Theme}/icon-home.webp`,
    iconActiveUrl: `/assets/images/game-type-icons/${Theme}/active-icon-home.webp`,
    text: "common.home",
    fontSize: "small",
    gameType: GameTypeEnum.NONE,
    router: "",
  },
  {
    key: "sports",
    iconUrl: `/assets/images/game-type-icons/${Theme}/icon-sports.webp`,
    iconActiveUrl: `/assets/images/game-type-icons/${Theme}/active-icon-sports.webp`,
    text: "common.sports",
    fontSize: "small",
    gameType: GameTypeEnum.SPORTS,
    router: "sports",
  },
  {
    key: "virtual-sports",
    iconUrl: `/assets/images/game-type-icons/${Theme}/icon-virtual-sports.webp`,
    iconActiveUrl: `/assets/images/game-type-icons/${Theme}/active-icon-virtual-sports.webp`,
    text: "common.virtualsports",
    fontSize: "smaller",
    gameType: GameTypeEnum.RNGSPORTS,
    router: "virtualSports",
  },
  {
    key: "esports",
    iconUrl: `/assets/images/game-type-icons/${Theme}/icon-e-sports.webp`,
    iconActiveUrl: `/assets/images/game-type-icons/${Theme}/active-icon-e-sports.webp`,
    text: "common.esports",
    fontSize: "smaller",
    gameType: GameTypeEnum.ESPORTS,
    router: "esports",
  },
  {
    key: "live-casino",
    iconUrl: `/assets/images/game-type-icons/${Theme}/icon-live-casino.webp`,
    iconActiveUrl: `/assets/images/game-type-icons/${Theme}/active-icon-live-casino.webp`,
    text: "common.live",
    fontSize: "small",
    gameType: GameTypeEnum.LIVE,
    router: "liveCasino",
  },
  {
    key: "card-game",
    iconUrl: `/assets/images/game-type-icons/${Theme}/icon-card-game.webp`,
    iconActiveUrl: `/assets/images/game-type-icons/${Theme}/active-icon-card-game.webp`,
    text: "common.chess",
    fontSize: "smaller",
    gameType: GameTypeEnum.QIPAI,
    router: "cardGame",
  },
  {
    key: "fishing",
    iconUrl: `/assets/images/game-type-icons/${Theme}/icon-fishing.webp`,
    iconActiveUrl: `/assets/images/game-type-icons/${Theme}/active-icon-fishing.webp`,
    text: "common.fish",
    fontSize: "smaller",
    gameType: GameTypeEnum.FISH,
    router: "fishing",
  },
  {
    key: "arcade",
    iconUrl: `/assets/images/game-type-icons/${Theme}/icon-arcade.webp`,
    iconActiveUrl: `/assets/images/game-type-icons/${Theme}/active-icon-arcade.webp`,
    text: "common.arcade",
    fontSize: "small",
    gameType: GameTypeEnum.ARCADE,
    router: "arcade",
  },
  {
    key: "lottery",
    iconUrl: `/assets/images/game-type-icons/${Theme}/icon-lottery.webp`,
    iconActiveUrl: `/assets/images/game-type-icons/${Theme}/active-icon-lottery.webp`,
    text: "common.lottery",
    fontSize: "small",
    gameType: GameTypeEnum.LOTTERY,
    router: "lottery",
  },
  {
    key: "slots",
    iconUrl: `/assets/images/game-type-icons/${Theme}/icon-slots.webp`,
    iconActiveUrl: `/assets/images/game-type-icons/${Theme}/active-icon-slots.webp`,
    text: "common.slot",
    fontSize: "small",
    gameType: GameTypeEnum.SLOT,
    router: "slots",
  },
  {
    key: "table-game",
    iconUrl: `/assets/images/game-type-icons/${Theme}/icon-table-games.webp`,
    iconActiveUrl: `/assets/images/game-type-icons/${Theme}/active-icon-table-games.webp`,
    text: "common.tableGame",
    fontSize: "smaller",
    gameType: GameTypeEnum.TABLEGAME,
    router: "tableGame",
  },
  {
    key: "cock-fighting",
    iconUrl: `/assets/images/game-type-icons/${Theme}/icon-cock-fighting.webp`,
    iconActiveUrl: `/assets/images/game-type-icons/${Theme}/active-icon-cock-fighting.webp`,
    text: "common.cockfight",
    fontSize: "smaller",
    gameType: GameTypeEnum.COCKFIGHT,
    router: "cockfighting",
  },
  {
    key: "instant-play",
    iconUrl: `/assets/images/game-type-icons/${Theme}/icon-instant-play.webp`,
    iconActiveUrl: `/assets/images/game-type-icons/${Theme}/active-icon-instant-play.webp`,
    text: "common.instantPlay",
    fontSize: "smaller",
    gameType: GameTypeEnum.INSTANTPLAY,
    router: "instantPlay",
  },
  {
    key: "casino",
    iconUrl: `/assets/images/game-type-icons/${Theme}/icon-casino.webp`,
    iconActiveUrl: `/assets/images/game-type-icons/${Theme}/active-icon-casino.webp`,
    text: "common.casino",
    fontSize: "smaller",
    gameType: GameTypeEnum.CASINO,
    router: "casino",
  },
  {
    key: "keno",
    iconUrl: `/assets/images/game-type-icons/${Theme}/icon-keno.webp`,
    iconActiveUrl: `/assets/images/game-type-icons/${Theme}/active-icon-keno.webp`,
    text: "common.keno",
    fontSize: "smaller",
    gameType: GameTypeEnum.KENO,
    router: "keno",
  },
  {
    key: "bingo",
    iconUrl: `/assets/images/game-type-icons/${Theme}/icon-bingo.webp`,
    iconActiveUrl: `/assets/images/game-type-icons/${Theme}/active-icon-bingo.webp`,
    text: "common.bingo",
    fontSize: "smaller",
    gameType: GameTypeEnum.BINGO,
    router: "bingo",
  },
  {
    key: "racing",
    iconUrl: `/assets/images/game-type-icons/${Theme}/icon-racing.webp`,
    iconActiveUrl: `/assets/images/game-type-icons/${Theme}/active-icon-racing.webp`,
    text: "common.racing",
    fontSize: "smaller",
    gameType: GameTypeEnum.RACING,
    router: "racing",
  },
];

export const useGameTypeList = () => {
  const [translatedGameTypeList, setTranslatedGameTypeList] = useState<GameTypeItem[]>([]);
  useEffect(() => {
    const offeredGameTypes = config.offeredGameTypes || [];
    const translatedList = offeredGameTypes
      .split(",")
      .map((key: string) => gameTypeList.find((type) => type.key === key))
      .filter(
        (gameType: GameTypeItem | undefined): gameType is GameTypeItem => gameType !== undefined,
      )
      .map((gameItem: GameTypeItem) => ({
        ...gameItem,
        text: i18n.t(getGameTypeName(gameItem.gameType)),
      }));

    setTranslatedGameTypeList(translatedList);
  }, []);

  return translatedGameTypeList;
};
