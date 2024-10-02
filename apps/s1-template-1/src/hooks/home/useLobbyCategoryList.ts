import { GameTypeEnum } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
import { useEffect, useState } from "react";

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
        iconUrl: "",
        text: i18n.t("slot.hotGame"),
        gameType: GameTypeEnum.SLOT,
      },
      slotsNew: {
        key: "slotsNew",
        iconUrl: "",
        text: i18n.t("slot.newGame"),
        gameType: GameTypeEnum.SLOT,
      },
      slotsRecommend: {
        key: "slotsRecommend",
        iconUrl: "",
        text: i18n.t("slot.recommendGame"),
        gameType: GameTypeEnum.SLOT,
      },
      liveCasino: {
        key: "liveCasino",
        iconUrl: "",
        text: i18n.t("common.live"),
        gameType: GameTypeEnum.LIVELOBBY,
      },
      lottery: {
        key: "lottery",
        iconUrl: "",
        text: i18n.t("common.lottery"),
        gameType: GameTypeEnum.LOTTERYLOBBY,
      },
      fishing: {
        key: "fishing",
        iconUrl: "",
        text: i18n.t("common.fish"),
        gameType: GameTypeEnum.FISH,
      },
      sports: {
        key: "sports",
        iconUrl: "",
        text: i18n.t("common.sports"),
        gameType: GameTypeEnum.SPORTS,
      },
      sabong: {
        key: "sabong",
        iconUrl: "",
        text: i18n.t("common.cockfight"),
        gameType: GameTypeEnum.COCKFIGHT,
      },
      egame: {
        key: "egame",
        iconUrl: "",
        text: i18n.t("common.egame"),
        gameType: GameTypeEnum.TABLEGAME,
      },
      cardGame: {
        key: "cardGame",
        iconUrl: "",
        text: i18n.t("common.chess"),
        gameType: GameTypeEnum.QIPAILOBBY,
      },
      esports: {
        key: "esports",
        iconUrl: "",
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
