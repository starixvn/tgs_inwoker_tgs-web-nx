import { useMemo } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
import { GameTypeItem } from "@tgs-web-nx/core/features";
import cardgame from "@/assets/t30/images/home/gameType/cardGame.svg";
import egame from "@/assets/t30/images/home/gameType/egame.svg";
import esports from "@/assets/t30/images/home/gameType/esports.svg";
import fishing from "@/assets/t30/images/home/gameType/fishing.svg";
import live from "@/assets/t30/images/home/gameType/liveCasino.svg";
import lottery from "@/assets/t30/images/home/gameType/lottery.svg";
import sabong from "@/assets/t30/images/home/gameType/sabong.svg";
import slot from "@/assets/t30/images/home/gameType/slot.svg";
import sports from "@/assets/t30/images/home/gameType/sports.svg";
import sportsBg from "@/assets/t30/images/home/gameType/bg/sports-bg.png";
import esportsBg from "@/assets/t30/images/home/gameType/bg/esports-bg.png";
import fishingBg from "@/assets/t30/images/home/gameType/bg/fishing-bg.png";
import liveBg from "@/assets/t30/images/home/gameType/bg/live-bg.png";
import slotsBg from "@/assets/t30/images/home/gameType/bg/slots-bg.png";
import cardGameBg from "@/assets/t30/images/home/gameType/bg/card-game-bg.png";

export const useGameTypeList = () => {
  return useMemo(() => {
    const gameTypeList: GameTypeItem[] = [
      {
        key: "sports",
        iconUrl: sports,
        text: i18n.t("common.sports"),
        fontSize: "small",
        gameType: GameTypeEnum.SPORTS,
        bgUrl: sportsBg,
      },
      {
        key: "liveCasino",
        iconUrl: live,
        text: i18n.t("common.live"),
        fontSize: "small",
        gameType: GameTypeEnum.LIVELOBBY,
        bgUrl: liveBg,
      },
      {
        key: "slots",
        iconUrl: slot,
        text: i18n.t("common.slot"),
        fontSize: "small",
        gameType: GameTypeEnum.SLOT,
        bgUrl: slotsBg,
      },
      {
        key: "esports",
        iconUrl: esports,
        text: i18n.t("common.esports"),
        fontSize: "smaller",
        gameType: GameTypeEnum.ESPORTS,
        bgUrl: esportsBg,
      },
      {
        key: "fishing",
        iconUrl: fishing,
        text: i18n.t("common.fish"),
        fontSize: "smaller",
        gameType: GameTypeEnum.FISH,
        bgUrl: fishingBg,
      },
      {
        key: "cardGame",
        iconUrl: cardgame,
        text: i18n.t("common.chess"),
        fontSize: "smaller",
        gameType: GameTypeEnum.QIPAILOBBY,
        bgUrl: cardGameBg,
      },
      {
        key: "sabong",
        iconUrl: sabong,
        text: i18n.t("common.cockfight"),
        fontSize: "smaller",
        gameType: GameTypeEnum.COCKFIGHT,
        bgUrl: "",
      },
      {
        key: "egame",
        iconUrl: egame,
        text: i18n.t("common.egame"),
        fontSize: "small",
        gameType: GameTypeEnum.TABLEGAME,
        bgUrl: "",
      },

      {
        key: "lottery",
        iconUrl: lottery,
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
