import cardgame from "@/assets/t24/images/home/gameType/cardGame.svg";
import egame from "@/assets/t24/images/home/gameType/egame.svg";
import esports from "@/assets/t24/images/home/gameType/esports.svg";
import fishing from "@/assets/t24/images/home/gameType/fishing.svg";
import home from "@/assets/t24/images/home/gameType/home.svg";
import live from "@/assets/t24/images/home/gameType/liveCasino.svg";
import lottery from "@/assets/t24/images/home/gameType/lottery.svg";
import sabong from "@/assets/t24/images/home/gameType/sabong.svg";
import slot from "@/assets/t24/images/home/gameType/slot.svg";
import sports from "@/assets/t24/images/home/gameType/sports.svg";
import { GameTypeEnum } from "@/core/types/GameTypeEnum";
import i18n from "@/utils/i18n";
import { useEffect, useState } from "react";

type GameTypeItem = {
  key: string;
  iconUrl: string;
  text: string;
  fontSize: string;
  gameType: GameTypeEnum;
};

export const useGameTypeList = () => {
  const [translatedGameTypeList, setTranslatedGameTypeList] = useState<GameTypeItem[]>([]);

  useEffect(() => {
    const gameTypeList: GameTypeItem[] = [
      // {
      //   key: "home",
      //   iconUrl: home,
      //   text: i18n.t("common.home"),
      //   fontSize: "small",
      //   gameType: GameTypeEnum.NONE,
      // },
      {
        key: "slots",
        iconUrl: slot,
        text: i18n.t("common.slot"),
        fontSize: "small",
        gameType: GameTypeEnum.SLOT,
      },
      {
        key: "liveCasino",
        iconUrl: live,
        text: i18n.t("common.live"),
        fontSize: "smaller",
        gameType: GameTypeEnum.LIVELOBBY,
      },
      {
        key: "lottery",
        iconUrl: lottery,
        text: i18n.t("common.lottery"),
        fontSize: "small",
        gameType: GameTypeEnum.LOTTERYLOBBY,
      },
      {
        key: "fishing",
        iconUrl: fishing,
        text: i18n.t("common.fish"),
        fontSize: "small",
        gameType: GameTypeEnum.FISH,
      },
      {
        key: "sports",
        iconUrl: sports,
        text: i18n.t("common.sports"),
        fontSize: "small",
        gameType: GameTypeEnum.SPORTS,
      },
      {
        key: "sabong",
        iconUrl: sabong,
        text: i18n.t("common.cockfight"),
        fontSize: "smaller",
        gameType: GameTypeEnum.COCKFIGHT,
      },
      {
        key: "egame",
        iconUrl: egame,
        text: i18n.t("common.egame"),
        fontSize: "small",
        gameType: GameTypeEnum.TABLEGAME,
      },
      {
        key: "cardGame",
        iconUrl: cardgame,
        text: i18n.t("common.chess"),
        fontSize: "smaller",
        gameType: GameTypeEnum.QIPAILOBBY,
      },
      {
        key: "esports",
        iconUrl: esports,
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
