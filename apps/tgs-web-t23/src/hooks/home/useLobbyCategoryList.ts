import { useEffect, useState } from "react";
import { GameTypeEnum } from "@/constants/GameTypeEnum";
import cardgame from "@/assets/t23/images/home/gameType/cardGame.svg";
import egame from "@/assets/t23/images/home/gameType/egame.svg";
import esports from "@/assets/t23/images/home/gameType/esports.svg";
import fishing from "@/assets/t23/images/home/gameType/fishing.svg";
import live from "@/assets/t23/images/home/gameType/liveCasino.svg";
import lottery from "@/assets/t23/images/home/gameType/lottery.svg";
import sabong from "@/assets/t23/images/home/gameType/sabong.svg";
import sports from "@/assets/t23/images/home/gameType/sports.svg";
import hot from "@/assets/t23/images/home/hot.svg";
import newIcon from "@/assets/t23/images/home/new.svg";
import recommend from "@/assets/t23/images/home/recommend.svg";
import i18n from "@/utils/i18n";

type LobbyCategoryIcon = {
  key: string;
  iconUrl: string;
  text: string;
  gameType: number;
};

export const useLobbyCategoryList = () => {
  const [translatedLobbyCategoryList, setTranslatedLobbyCategoryList] = useState<
    LobbyCategoryIcon[]
  >([]);

  useEffect(() => {
    const lobbyCategoryList: { [key: string]: LobbyCategoryIcon } = {
      slotsHot: {
        key: "slotsHot",
        iconUrl: hot,
        text: i18n.t("slot.hotGame"),
        gameType: GameTypeEnum.SLOT,
      },
      slotsNew: {
        key: "slotsNew",
        iconUrl: newIcon,
        text: i18n.t("slot.newGame"),
        gameType: GameTypeEnum.SLOT,
      },
      slotsRecommend: {
        key: "slotsRecommend",
        iconUrl: recommend,
        text: i18n.t("slot.recommendGame"),
        gameType: GameTypeEnum.SLOT,
      },
      liveCasino: {
        key: "liveCasino",
        iconUrl: live,
        text: i18n.t("common.live"),
        gameType: GameTypeEnum.LIVELOBBY,
      },
      lottery: {
        key: "lottery",
        iconUrl: lottery,
        text: i18n.t("common.lottery"),
        gameType: GameTypeEnum.LOTTERYLOBBY,
      },
      fishing: {
        key: "fishing",
        iconUrl: fishing,
        text: i18n.t("common.fish"),
        gameType: GameTypeEnum.FISH,
      },
      sports: {
        key: "sports",
        iconUrl: sports,
        text: i18n.t("common.sports"),
        gameType: GameTypeEnum.SPORTS,
      },
      sabong: {
        key: "sabong",
        iconUrl: sabong,
        text: i18n.t("common.cockfight"),
        gameType: GameTypeEnum.COCKFIGHT,
      },
      egame: {
        key: "egame",
        iconUrl: egame,
        text: i18n.t("common.egame"),
        gameType: GameTypeEnum.TABLEGAME,
      },
      cardGame: {
        key: "cardGame",
        iconUrl: cardgame,
        text: i18n.t("common.chess"),
        gameType: GameTypeEnum.QIPAILOBBY,
      },
      esports: {
        key: "esports",
        iconUrl: esports,
        text: i18n.t("common.esports"),
        gameType: GameTypeEnum.ESPORTS,
      },
    };
    const translatedList = Object.values(lobbyCategoryList).map((item) => ({
      ...item,
      text: i18n.t(item.text),
    }));

    setTranslatedLobbyCategoryList(translatedList);
  }, []);

  return translatedLobbyCategoryList;
};

export default useLobbyCategoryList;
