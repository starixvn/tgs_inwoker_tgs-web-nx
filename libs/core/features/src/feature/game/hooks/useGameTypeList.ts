import config from "@tgs-web-nx/config";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { getGameTypeName, i18n } from "@tgs-web-nx/utils";
import { useEffect, useState } from "react";

import { GameTypeItem } from "../useHomeGameContext";

const gameTypeList: GameTypeItem[] = [
  {
    key: "home",
    iconUrl: "/assets/images/game-type-icons/icon-home.png",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-home.png",
    text: "common.home",
    fontSize: "small",
    gameType: GameTypeEnum.NONE,
    router: "",
  },
  {
    key: "sports",
    iconUrl: "/assets/images/game-type-icons/icon-sports.png",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-sports.png",
    text: "common.sports",
    fontSize: "small",
    gameType: GameTypeEnum.SPORTS,
    router: "sports",
  },
  {
    key: "virtual-sports",
    iconUrl: "/assets/images/game-type-icons/icon-virtual-sports.png",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-virtual-sports.png",
    text: "common.virtualsports",
    fontSize: "smaller",
    gameType: GameTypeEnum.RNGSPORTS,
    router: "virtualSports",
  },
  {
    key: "esports",
    iconUrl: "/assets/images/game-type-icons/icon-e-sports.png",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-e-sports.png",
    text: "common.esports",
    fontSize: "smaller",
    gameType: GameTypeEnum.ESPORTS,
    router: "esports",
  },
  {
    key: "live-casino",
    iconUrl: "/assets/images/game-type-icons/icon-live-casino.png",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-live-casino.png",
    text: "common.live",
    fontSize: "small",
    gameType: GameTypeEnum.LIVE,
    router: "liveCasino",
  },
  {
    key: "card-game",
    iconUrl: "/assets/images/game-type-icons/icon-card-game.png",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-card-game.png",
    text: "common.chess",
    fontSize: "smaller",
    gameType: GameTypeEnum.QIPAI,
    router: "cardGame",
  },
  {
    key: "fishing",
    iconUrl: "/assets/images/game-type-icons/icon-fishing.png",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-fishing.png",
    text: "common.fish",
    fontSize: "smaller",
    gameType: GameTypeEnum.FISH,
    router: "fishing",
  },
  {
    key: "arcade",
    iconUrl: "/assets/images/game-type-icons/icon-arcade.png",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-arcade.png",
    text: "common.arcade",
    fontSize: "small",
    gameType: GameTypeEnum.ARCADE,
    router: "arcade",
  },
  {
    key: "lottery",
    iconUrl: "/assets/images/game-type-icons/icon-lottery.png",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-lottery.png",
    text: "common.lottery",
    fontSize: "small",
    gameType: GameTypeEnum.LOTTERYLOBBY,
    router: "lottery",
  },
  {
    key: "slots",
    iconUrl: "/assets/images/game-type-icons/icon-slots.png",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-slots.png",
    text: "common.slot",
    fontSize: "small",
    gameType: GameTypeEnum.SLOT,
    router: "slots",
  },
  {
    key: "table-game",
    iconUrl: "/assets/images/game-type-icons/icon-table-games.png",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-table-games.png",
    text: "common.tableGame",
    fontSize: "smaller",
    gameType: GameTypeEnum.TABLEGAME,
    router: "tableGame",
  },
  {
    key: "cock-fighting",
    iconUrl: "/assets/images/game-type-icons/icon-cock-fighting.png",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-cock-fighting.png",
    text: "common.cockfight",
    fontSize: "smaller",
    gameType: GameTypeEnum.COCKFIGHT,
    router: "cockfighting",
  },
  {
    key: "instant-play",
    iconUrl: "/assets/images/game-type-icons/icon-instant-play.png",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-instant-play.png",
    text: "common.instantPlay",
    fontSize: "smaller",
    gameType: GameTypeEnum.INSTANTPLAY,
    router: "instantPlay",
  },
  {
    key: "casino",
    iconUrl: "/assets/images/game-type-icons/icon-casino.png",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-casino.png",
    text: "common.casino",
    fontSize: "smaller",
    gameType: GameTypeEnum.CASINO,
    router: "casino",
  },
  {
    key: "keno",
    iconUrl: "/assets/images/game-type-icons/icon-keno.png",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-keno.png",
    text: "common.keno",
    fontSize: "smaller",
    gameType: GameTypeEnum.KENO,
    router: "keno",
  },
  {
    key: "bingo",
    iconUrl: "/assets/images/game-type-icons/icon-bingo.png",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-bingo.png",
    text: "common.bingo",
    fontSize: "smaller",
    gameType: GameTypeEnum.BINGO,
    router: "bingo",
  },
  {
    key: "racing",
    iconUrl: "/assets/images/game-type-icons/icon-racing.png",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-racing.png",
    text: "common.racing",
    fontSize: "smaller",
    gameType: GameTypeEnum.RACING,
    router: "racing",
  },
];

export const useGameTypeList = () => {
  const [translatedGameTypeList, setTranslatedGameTypeList] = useState<GameTypeItem[]>([]);
  const { offeredGameType } = config;
  useEffect(() => {
    const translatedList = offeredGameType
      .map((key: string) => gameTypeList.find((type) => type.key === key))
      .filter((gameType: GameTypeItem) => gameType)
      .map((gameItem: GameTypeItem) => ({
        ...gameItem,
        text: i18n.t(getGameTypeName(gameItem.gameType)),
      }));

    setTranslatedGameTypeList(translatedList);
  }, []);

  return translatedGameTypeList;
};
