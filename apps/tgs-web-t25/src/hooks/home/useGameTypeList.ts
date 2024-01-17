import { useMemo } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
import { GameTypeItem } from "@tgs-web-nx/core/features";
import home from "@/assets/t34/images/home/gameType/all.svg";
import cardgame from "@/assets/t34/images/home/gameType/cardGame.svg";
import egame from "@/assets/t34/images/home/gameType/egame.svg";
import esports from "@/assets/t34/images/home/gameType/esports.svg";
import fishing from "@/assets/t34/images/home/gameType/fishing.svg";
import live from "@/assets/t34/images/home/gameType/liveCasino.svg";
import lottery from "@/assets/t34/images/home/gameType/lottery.svg";
import sabong from "@/assets/t34/images/home/gameType/sabong.svg";
import slot from "@/assets/t34/images/home/gameType/slot.svg";
import sports from "@/assets/t34/images/home/gameType/sports.svg";
import homeActive from "@/assets/t34/images/home/gameType/active/all.svg";
import cardgameActive from "@/assets/t34/images/home/gameType/active/cardGame.svg";
import egameActive from "@/assets/t34/images/home/gameType/active/egame.svg";
import esportsActive from "@/assets/t34/images/home/gameType/active/esports.svg";
import fishingActive from "@/assets/t34/images/home/gameType/active/fishing.svg";
import liveActive from "@/assets/t34/images/home/gameType/active/liveCasino.svg";
import lotteryActive from "@/assets/t34/images/home/gameType/active/lottery.svg";
import sabongActive from "@/assets/t34/images/home/gameType/active/sabong.svg";
import slotActive from "@/assets/t34/images/home/gameType/active/slot.svg";
import sportsActive from "@/assets/t34/images/home/gameType/active/sports.svg";

import sportsBg from "@/assets/t34/images/home/gameType/bg/sports-bg.png";
import esportsBg from "@/assets/t34/images/home/gameType/bg/esports-bg.png";
import fishingBg from "@/assets/t34/images/home/gameType/bg/fishing-bg.png";
import liveBg from "@/assets/t34/images/home/gameType/bg/live-bg.png";
import slotsBg from "@/assets/t34/images/home/gameType/bg/slots-bg.png";
import cardGameBg from "@/assets/t34/images/home/gameType/bg/card-game-bg.png";

export const useGameTypeList = () => {
  return useMemo(() => {
    const gameTypeList: GameTypeItem[] = [
      {
        key: "all",
        iconUrl: home,
        iconActiveUrl: homeActive,
        text: i18n.t("common.home"),
        fontSize: "small",
        gameType: GameTypeEnum.NONE,
        bgUrl: sportsBg,
      },
      {
        key: "sports",
        iconUrl: sports,
        iconActiveUrl: sportsActive,
        text: i18n.t("common.sports"),
        fontSize: "small",
        gameType: GameTypeEnum.SPORTS,
        bgUrl: sportsBg,
      },
      {
        key: "liveCasino",
        iconUrl: live,
        iconActiveUrl: liveActive,
        text: i18n.t("common.live"),
        fontSize: "small",
        gameType: GameTypeEnum.LIVELOBBY,
        bgUrl: liveBg,
      },
      {
        key: "slots",
        iconUrl: slot,
        iconActiveUrl: slotActive,
        text: i18n.t("common.slot"),
        fontSize: "small",
        gameType: GameTypeEnum.SLOT,
        bgUrl: slotsBg,
      },
      {
        key: "esports",
        iconUrl: esports,
        iconActiveUrl: esportsActive,
        text: i18n.t("common.esports"),
        fontSize: "smaller",
        gameType: GameTypeEnum.ESPORTS,
        bgUrl: esportsBg,
      },
      {
        key: "fishing",
        iconUrl: fishing,
        iconActiveUrl: fishingActive,
        text: i18n.t("common.fish"),
        fontSize: "smaller",
        gameType: GameTypeEnum.FISH,
        bgUrl: fishingBg,
      },
      {
        key: "cardGame",
        iconUrl: cardgame,
        iconActiveUrl: cardgameActive,
        text: i18n.t("common.chess"),
        fontSize: "smaller",
        gameType: GameTypeEnum.QIPAILOBBY,
        bgUrl: cardGameBg,
      },
      {
        key: "sabong",
        iconUrl: sabong,
        iconActiveUrl: sabongActive,
        text: i18n.t("common.cockfight"),
        fontSize: "smaller",
        gameType: GameTypeEnum.COCKFIGHT,
        bgUrl: "",
      },
      {
        key: "egame",
        iconUrl: egame,
        iconActiveUrl: egameActive,
        text: i18n.t("common.egame"),
        fontSize: "small",
        gameType: GameTypeEnum.TABLEGAME,
        bgUrl: "",
      },

      {
        key: "lottery",
        iconUrl: lottery,
        iconActiveUrl: lotteryActive,
        text: i18n.t("common.lottery"),
        fontSize: "small",
        gameType: GameTypeEnum.LOTTERYLOBBY,
        bgUrl: "",
      },
    ];

    const translatedList: GameTypeItem[] = gameTypeList.map((gameItem) => ({
      ...gameItem,
      text: i18n.t(gameItem.text),
    }));

    return translatedList;
  }, []);
};

export default useGameTypeList;
