import config from "@tgs-web-nx/config";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { getGameTypeName, i18n } from "@tgs-web-nx/utils";
import { useEffect, useState } from "react";

import { GameTypeItem } from "../useHomeGameContext";

const gameTypeList: GameTypeItem[] = [
  {
    key: "home",
    iconUrl: "/assets/images/game-type-icons/icon-home.webp",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-home.webp",
    text: "common.home",
    fontSize: "small",
    gameType: GameTypeEnum.NONE,
    router: "",
  },
  {
    key: "sports",
    iconUrl: "/assets/images/game-type-icons/icon-sports.webp",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-sports.webp",
    text: "common.sports",
    fontSize: "small",
    gameType: GameTypeEnum.SPORTS,
    router: "sports",
  },
  {
    key: "virtual-sports",
    iconUrl: "/assets/images/game-type-icons/icon-virtual-sports.webp",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-virtual-sports.webp",
    text: "common.virtualsports",
    fontSize: "smaller",
    gameType: GameTypeEnum.RNGSPORTS,
    router: "virtualSports",
  },
  {
    key: "esports",
    iconUrl: "/assets/images/game-type-icons/icon-e-sports.webp",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-e-sports.webp",
    text: "common.esports",
    fontSize: "smaller",
    gameType: GameTypeEnum.ESPORTS,
    router: "esports",
  },
  {
    key: "live-casino",
    iconUrl: "/assets/images/game-type-icons/icon-live-casino.webp",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-live-casino.webp",
    text: "common.live",
    fontSize: "small",
    gameType: GameTypeEnum.LIVE,
    router: "liveCasino",
  },
  {
    key: "card-game",
    iconUrl: "/assets/images/game-type-icons/icon-card-game.webp",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-card-game.webp",
    text: "common.chess",
    fontSize: "smaller",
    gameType: GameTypeEnum.QIPAI,
    router: "cardGame",
  },
  {
    key: "fishing",
    iconUrl: "/assets/images/game-type-icons/icon-fishing.webp",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-fishing.webp",
    text: "common.fish",
    fontSize: "smaller",
    gameType: GameTypeEnum.FISH,
    router: "fishing",
  },
  {
    key: "arcade",
    iconUrl: "/assets/images/game-type-icons/icon-arcade.webp",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-arcade.webp",
    text: "common.arcade",
    fontSize: "small",
    gameType: GameTypeEnum.ARCADE,
    router: "arcade",
  },
  {
    key: "lottery",
    iconUrl: "/assets/images/game-type-icons/icon-lottery.webp",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-lottery.webp",
    text: "common.lottery",
    fontSize: "small",
    gameType: GameTypeEnum.LOTTERY,
    router: "lottery",
  },
  {
    key: "slots",
    iconUrl: "/assets/images/game-type-icons/icon-slots.webp",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-slots.webp",
    text: "common.slot",
    fontSize: "small",
    gameType: GameTypeEnum.SLOT,
    router: "slots",
  },
  {
    key: "table-game",
    iconUrl: "/assets/images/game-type-icons/icon-table-games.webp",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-table-games.webp",
    text: "common.tableGame",
    fontSize: "smaller",
    gameType: GameTypeEnum.TABLEGAME,
    router: "tableGame",
  },
  {
    key: "cock-fighting",
    iconUrl: "/assets/images/game-type-icons/icon-cock-fighting.webp",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-cock-fighting.webp",
    text: "common.cockfight",
    fontSize: "smaller",
    gameType: GameTypeEnum.COCKFIGHT,
    router: "cockfighting",
  },
  {
    key: "instant-play",
    iconUrl: "/assets/images/game-type-icons/icon-instant-play.webp",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-instant-play.webp",
    text: "common.instantPlay",
    fontSize: "smaller",
    gameType: GameTypeEnum.INSTANTPLAY,
    router: "instantPlay",
  },
  {
    key: "casino",
    iconUrl: "/assets/images/game-type-icons/icon-casino.webp",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-casino.webp",
    text: "common.casino",
    fontSize: "smaller",
    gameType: GameTypeEnum.CASINO,
    router: "casino",
  },
  {
    key: "keno",
    iconUrl: "/assets/images/game-type-icons/icon-keno.webp",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-keno.webp",
    text: "common.keno",
    fontSize: "smaller",
    gameType: GameTypeEnum.KENO,
    router: "keno",
  },
  {
    key: "bingo",
    iconUrl: "/assets/images/game-type-icons/icon-bingo.webp",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-bingo.webp",
    text: "common.bingo",
    fontSize: "smaller",
    gameType: GameTypeEnum.BINGO,
    router: "bingo",
  },
  {
    key: "racing",
    iconUrl: "/assets/images/game-type-icons/icon-racing.webp",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-racing.webp",
    text: "common.racing",
    fontSize: "smaller",
    gameType: GameTypeEnum.RACING,
    router: "racing",
  },
];

export const useGameTypeList = () => {
  const [translatedGameTypeList, setTranslatedGameTypeList] = useState<GameTypeItem[]>([]);
  useEffect(() => {
    const offeredGameTypes = import.meta.env.VITE_OFFERED_GAME_TYPES || [];
    const translatedList = offeredGameTypes.split(",")
      .map((key: string) => gameTypeList.find((type) => type.key === key))
      .filter((gameType: GameTypeItem | undefined): gameType is GameTypeItem => gameType !== undefined)
      .map((gameItem: GameTypeItem) => ({
        ...gameItem,
        text: i18n.t(getGameTypeName(gameItem.gameType)),
      }));

    setTranslatedGameTypeList(translatedList);
  }, []);

  return translatedGameTypeList;
};
