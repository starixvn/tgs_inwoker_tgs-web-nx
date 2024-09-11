import { useEffect, useState } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { getGameTypeName, i18n } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import { GameTypeItem } from "../useHomeGameContext";

const gameTypeList: GameTypeItem[] = [
  {
    key: "home",
    iconUrl: "/assets/images/game-type-icons/icon-home.svg",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-home.svg",
    text: "common.home",
    fontSize: "small",
    gameType: GameTypeEnum.NONE,
    router: ""
  },
  {
    key: "sports",
    iconUrl: "/assets/images/game-type-icons/icon-sports.svg",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-sports.svg",
    text: "common.sports",
    fontSize: "small",
    gameType: GameTypeEnum.SPORTS,
    router: "sports"
  },
  {
    key: "virtualSports",
    iconUrl: "/assets/images/game-type-icons/icon-virtual-sports.svg",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-virtual-sports.svg",
    text: "common.virtualsports",
    fontSize: "smaller",
    gameType: GameTypeEnum.RNGSPORTS,
    router: "virtualSports"
  },
  {
    key: "esports",
    iconUrl: "/assets/images/game-type-icons/icon-e-sports.svg",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-e-sports.svg",
    text: "common.esports",
    fontSize: "smaller",
    gameType: GameTypeEnum.ESPORTS,
    router: "esports"
  },
  {
    key: "liveCasino",
    iconUrl: "/assets/images/game-type-icons/icon-live-casino.svg",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-live-casino.svg",
    text: "common.live",
    fontSize: "small",
    gameType: GameTypeEnum.LIVE,
    router: "liveCasino"
  },
  {
    key: "cardGame",
    iconUrl: "/assets/images/game-type-icons/icon-card-game.svg",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-card-game.svg",
    text: "common.chess",
    fontSize: "smaller",
    gameType: GameTypeEnum.QIPAI,
    router: "cardGame"
  },
  {
    key: "fishing",
    iconUrl: "/assets/images/game-type-icons/icon-fishing.svg",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-fishing.svg",
    text:"common.fish",
    fontSize: "smaller",
    gameType: GameTypeEnum.FISH,
    router: "fishing"
  },
  {
    key: "arcade",
    iconUrl: "/assets/images/game-type-icons/icon-arcade.svg",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-arcade.svg",
    text: "common.arcade",
    fontSize: "small",
    gameType: GameTypeEnum.ARCADE,
    router: "arcade"
  },
  {
    key: "lottery",
    iconUrl: "/assets/images/game-type-icons/icon-lottery.svg",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-lottery.svg",
    text: "common.lottery",
    fontSize: "small",
    gameType: GameTypeEnum.LOTTERYLOBBY,
    router: "lottery"
  },
  {
    key: "slots",
    iconUrl: "/assets/images/game-type-icons/icon-slots.svg",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-slots.svg",
    text: "common.slot",
    fontSize: "small",
    gameType: GameTypeEnum.SLOT,
    router: "slots"
  },
  {
    key: "tableGame",
    iconUrl: "/assets/images/game-type-icons/icon-table-games.svg",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-table-games.svg",
    text: "common.tableGame",
    fontSize: "smaller",
    gameType: GameTypeEnum.TABLEGAME,
    router: "tableGame"
  },
  {
    key: "cockfighting",
    iconUrl: "/assets/images/game-type-icons/icon-cock-fighting.svg",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-cock-fighting.svg",
    text: "common.cockfight",
    fontSize: "smaller",
    gameType: GameTypeEnum.COCKFIGHT,
    router: "cockfighting"
  },
  {
    key: "instantPlay",
    iconUrl: "/assets/images/game-type-icons/icon-instant-play.svg",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-instant-play.svg",
    text: "common.instantPlay",
    fontSize: "smaller",
    gameType: GameTypeEnum.INSTANTPLAY,
    router: "instantPlay"
  },
  {
    key: "casino",
    iconUrl: "/assets/images/game-type-icons/icon-casino.svg",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-casino.svg",
    text: "common.casino",
    fontSize: "smaller",
    gameType: GameTypeEnum.CASINO,
    router: "casino"
  },
  {
    key: "keno",
    iconUrl: "/assets/images/game-type-icons/icon-keno.svg",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-keno.svg",
    text: "common.keno",
    fontSize: "smaller",
    gameType: GameTypeEnum.KENO,
    router: "keno"
  },
  {
    key: "bingo",
    iconUrl: "/assets/images/game-type-icons/icon-bingo.svg",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-bingo.svg",
    text: "common.bingo",
    fontSize: "smaller",
    gameType: GameTypeEnum.BINGO,
    router: "bingo"
  },
  {
    key: "racing",
    iconUrl: "/assets/images/game-type-icons/icon-racing.svg",
    iconActiveUrl: "/assets/images/game-type-icons/active-icon-racing.svg",
    text: "common.racing",
    fontSize: "smaller",
    gameType: GameTypeEnum.RACING,
    router: "racing"
  },
];

export const useGameTypeList = () =>{
  const [translatedGameTypeList, setTranslatedGameTypeList] = useState<GameTypeItem[]>([]);
  const { offeredGameType } = config;
  useEffect(() => {
    const translatedList = offeredGameType
    .map((key:string) => gameTypeList.find(type => type.key === key))
    .filter((gameType: GameTypeItem) => gameType)
    .map((gameItem: GameTypeItem) => ({
      ...gameItem,
      text: i18n.t(getGameTypeName(gameItem.gameType)),
    }));

    setTranslatedGameTypeList(translatedList);
  }, []);

  return translatedGameTypeList;
}
