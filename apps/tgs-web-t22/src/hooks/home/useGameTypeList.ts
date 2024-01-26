import { useEffect, useState } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
import card from "@/assets/t22/images/home/gameType/card.svg";
import egame from "@/assets/t22/images/home/gameType/egame.svg";
import esports from "@/assets/t22/images/home/gameType/esports.svg";
import fishing from "@/assets/t22/images/home/gameType/fish.svg";
import live from "@/assets/t22/images/home/gameType/live.svg";
import lottery from "@/assets/t22/images/home/gameType/lottery.svg";
import sabong from "@/assets/t22/images/home/gameType/sabong.svg";
import slot from "@/assets/t22/images/home/gameType/slot.svg";
import sports from "@/assets/t22/images/home/gameType/sports.svg";
import cardActive from "@/assets/t22/images/home/gameType/cardActive.svg";
import egameActive from "@/assets/t22/images/home/gameType/egameActive.svg";
import esportsActive from "@/assets/t22/images/home/gameType/esportsActive.svg";
import fishingActive from "@/assets/t22/images/home/gameType/fishActive.svg";
import liveActive from "@/assets/t22/images/home/gameType/liveActive.svg";
import lotteryActive from "@/assets/t22/images/home/gameType/lotteryActive.svg";
import sabongActive from "@/assets/t22/images/home/gameType/sabongActive.svg";
import slotActive from "@/assets/t22/images/home/gameType/slotActive.svg";
import sportsActive from "@/assets/t22/images/home/gameType/sportsActive.svg";



type GameTypeItem = {
  key: string;
  iconUrl: string;
  iconActiveUrl: string;
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
        iconActiveUrl: sportsActive,
        text: i18n.t("common.sports"),
        fontSize: "small",
        gameType: GameTypeEnum.SPORTS,
      },
      {
        key: "slots",
        iconUrl: slot,
        iconActiveUrl: slotActive,
        text: i18n.t("common.slot"),
        fontSize: "small",
        gameType: GameTypeEnum.SLOT,
      },
      {
        key: "liveCasino",
        iconUrl: live,
        iconActiveUrl: liveActive,
        text: i18n.t("common.live"),
        fontSize: "small",
        gameType: GameTypeEnum.LIVELOBBY,
      },
      {
        key: "sabong",
        iconUrl: sabong,
        iconActiveUrl: sabongActive,
        text: i18n.t("common.cockfight"),
        fontSize: "smaller",
        gameType: GameTypeEnum.COCKFIGHT,
      },
      {
        key: "egame",
        iconUrl: egame,
        iconActiveUrl: egameActive,
        text: i18n.t("common.egame"),
        fontSize: "small",
        gameType: GameTypeEnum.TABLEGAME,
      },
      {
        key: "fishing",
        iconUrl: fishing,
        iconActiveUrl: fishingActive,
        text: i18n.t("common.fish"),
        fontSize: "smaller",
        gameType: GameTypeEnum.FISH,
      },
      {
        key: "cardGame",
        iconUrl: card,
        iconActiveUrl: cardActive,
        text: i18n.t("common.chess"),
        fontSize: "smaller",
        gameType: GameTypeEnum.QIPAILOBBY,
      },
      {
        key: "lottery",
        iconUrl: lottery,
        iconActiveUrl: lotteryActive,
        text: i18n.t("common.lottery"),
        fontSize: "small",
        gameType: GameTypeEnum.LOTTERYLOBBY,
      },
      {
        key: "esports",
        iconUrl: esports,
        iconActiveUrl: esportsActive,
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
