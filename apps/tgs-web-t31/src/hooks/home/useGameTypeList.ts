import { useEffect, useState } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
import home from "@/assets/t31/images/home/Home.svg";
import cardgame from "@/assets/t31/images/home/gameType/mobile/Card.svg";
import egame from "@/assets/t31/images/home/gameType/mobile/Card.svg";
import esports from "@/assets/t31/images/home/gameType/mobile/Esports.svg";
import fishing from "@/assets/t31/images/home/gameType/mobile/Fish.svg";
import live from "@/assets/t31/images/home/gameType/mobile/Live.svg";
import lottery from "@/assets/t31/images/home/gameType/mobile/Lottery.svg";
import sabong from "@/assets/t31/images/home/gameType/mobile/Sabong.svg";
import slot from "@/assets/t31/images/home/gameType/mobile/Slot.svg";
import sports from "@/assets/t31/images/home/gameType/mobile/Sports.svg";
// active icon
import homeActive from "@/assets/t31/images/home/Home_active.svg";
import cardgameActive from "@/assets/t31/images/home/gameType/mobile/Card_active.svg";
import egameActive from "@/assets/t31/images/home/gameType/mobile/Card_active.svg";
import esportsActive from "@/assets/t31/images/home/gameType/mobile/Esports_active.svg";
import fishingActive from "@/assets/t31/images/home/gameType/mobile/Fish_active.svg";
import liveActive from "@/assets/t31/images/home/gameType/mobile/Live_active.svg";
import lotteryActive from "@/assets/t31/images/home/gameType/mobile/Lottery_active.svg";
import sabongActive from "@/assets/t31/images/home/gameType/mobile/Sabong_active.svg";
import slotActive from "@/assets/t31/images/home/gameType/mobile/Slot_active.svg";
import sportsActive from "@/assets/t31/images/home/gameType/mobile/Sports_active.svg";

type GameTypeItem = {
  key: string;
  iconUrl: string;
  activeUrl: string;
  text: string | any;
  fontSize: string;
  gameType: GameTypeEnum;
};

export const useGameTypeList = () => {
  const [translatedGameTypeList, setTranslatedGameTypeList] = useState<GameTypeItem[]>([]);

  useEffect(() => {
    const gameTypeList: GameTypeItem[] = [
      {
        key: "Home",
        iconUrl: home,
        activeUrl: homeActive,
        text: i18n.t("common.home"),
        fontSize: "small",
        gameType: GameTypeEnum.NONE,
      },
      {
        key: "sports",
        iconUrl: sports,
        activeUrl: sportsActive,
        text: i18n.t("common.sports"),
        fontSize: "small",
        gameType: GameTypeEnum.SPORTS,
      },
      {
        key: "slots",
        iconUrl: slot,
        activeUrl: slotActive,
        text: i18n.t("common.slot"),
        fontSize: "small",
        gameType: GameTypeEnum.SLOT,
      },
      {
        key: "liveCasino",
        iconUrl: live,
        activeUrl: liveActive,
        text: i18n.t("common.live"),
        fontSize: "small",
        gameType: GameTypeEnum.LIVELOBBY,
      },
      {
        key: "sabong",
        iconUrl: sabong,
        activeUrl: sabongActive,
        text: i18n.t("common.cockfight"),
        fontSize: "smaller",
        gameType: GameTypeEnum.COCKFIGHT,
      },
      {
        key: "egame",
        iconUrl: egame,
        activeUrl: egameActive,
        text: i18n.t("common.egame"),
        fontSize: "small",
        gameType: GameTypeEnum.TABLEGAME,
      },
      {
        key: "fishing",
        iconUrl: fishing,
        activeUrl: fishingActive,
        text: i18n.t("common.fish"),
        fontSize: "smaller",
        gameType: GameTypeEnum.FISH,
      },
      {
        key: "cardGame",
        iconUrl: cardgame,
        activeUrl: cardgameActive,
        text: i18n.t("common.chess"),
        fontSize: "smaller",
        gameType: GameTypeEnum.QIPAILOBBY,
      },
      {
        key: "lottery",
        iconUrl: lottery,
        activeUrl: lotteryActive,
        text: i18n.t("common.lottery"),
        fontSize: "small",
        gameType: GameTypeEnum.LOTTERYLOBBY,
      },
      {
        key: "esports",
        iconUrl: esports,
        activeUrl: esportsActive,
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
