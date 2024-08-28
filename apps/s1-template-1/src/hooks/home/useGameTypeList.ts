import { useEffect, useState } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
import cardgame from "@/assets/t28/images/home/gameType/cardGame.svg";
import egame from "@/assets/t28/images/home/gameType/egame.svg";
import esports from "@/assets/t28/images/home/gameType/esports.svg";
import fishing from "@/assets/t28/images/home/gameType/fishing.svg";
import live from "@/assets/t28/images/home/gameType/liveCasino.svg";
import lottery from "@/assets/t28/images/home/gameType/lottery.svg";
import sabong from "@/assets/t28/images/home/gameType/sabong.svg";
import slot from "@/assets/t28/images/home/gameType/slot.svg";
import sports from "@/assets/t28/images/home/gameType/sports.svg";
//actived icon
import cardgameActive from "@/assets/t28/images/home/gameType/cardGameActive.svg";
import egameActive from "@/assets/t28/images/home/gameType/egameActive.svg";
import esportsActive from "@/assets/t28/images/home/gameType/esportsActive.svg";
import fishingActive from "@/assets/t28/images/home/gameType/fishingActive.svg";
import liveActive from "@/assets/t28/images/home/gameType/liveCasinoActive.svg";
import lotteryActive from "@/assets/t28/images/home/gameType/lotteryActive.svg";
import sabongActive from "@/assets/t28/images/home/gameType/sabongActive.svg";
import slotActive from "@/assets/t28/images/home/gameType/slotActive.svg";
import sportsActive from "@/assets/t28/images/home/gameType/sportsActive.svg";

type GameTypeItem = {
  key: string;
  iconUrl: string;
  activeIconUrl?: string;
  text: string | any;
  fontSize: string;
  gameType: GameTypeEnum;
};

export const useGameTypeList = () => {
  const [translatedGameTypeList, setTranslatedGameTypeList] = useState<GameTypeItem[]>([]);

  useEffect(() => {
    const gameTypeList: GameTypeItem[] = [
      {
        key: "sports",
        iconUrl: sports,
        activeIconUrl: sportsActive,
        text: i18n.t("common.sports"),
        fontSize: "small",
        gameType: GameTypeEnum.SPORTS,
      },
      {
        key: "slots",
        iconUrl: slot,
        activeIconUrl: slotActive,
        text: i18n.t("common.slot"),
        fontSize: "small",
        gameType: GameTypeEnum.SLOT,
      },
      {
        key: "liveCasino",
        iconUrl: live,
        activeIconUrl: liveActive,
        text: i18n.t("common.live"),
        fontSize: "small",
        gameType: GameTypeEnum.LIVELOBBY,
      },
      {
        key: "sabong",
        iconUrl: sabong,
        activeIconUrl: sabongActive,
        text: i18n.t("common.cockfight"),
        fontSize: "smaller",
        gameType: GameTypeEnum.COCKFIGHT,
      },
      {
        key: "egame",
        iconUrl: egame,
        activeIconUrl: egameActive,
        text: i18n.t("common.egame"),
        fontSize: "small",
        gameType: GameTypeEnum.TABLEGAME,
      },
      {
        key: "fishing",
        iconUrl: fishing,
        activeIconUrl: fishingActive,
        text: i18n.t("common.fish"),
        fontSize: "smaller",
        gameType: GameTypeEnum.FISH,
      },
      {
        key: "cardGame",
        iconUrl: cardgame,
        activeIconUrl: cardgameActive,
        text: i18n.t("common.chess"),
        fontSize: "smaller",
        gameType: GameTypeEnum.QIPAILOBBY,
      },
      {
        key: "lottery",
        iconUrl: lottery,
        activeIconUrl: lotteryActive,
        text: i18n.t("common.lottery"),
        fontSize: "small",
        gameType: GameTypeEnum.LOTTERYLOBBY,
      },
      {
        key: "esports",
        iconUrl: esports,
        activeIconUrl: esportsActive,
        text: i18n.t("common.esports"),
        fontSize: "smaller",
        gameType: GameTypeEnum.ESPORTS,
      },
    ];

    const translatedList: GameTypeItem[] = gameTypeList.map((gameItem) => ({
      ...gameItem,
      text: i18n.t(gameItem.text),
    }));

    setTranslatedGameTypeList(translatedList);
  }, []);

  return translatedGameTypeList;
};

export default useGameTypeList;
