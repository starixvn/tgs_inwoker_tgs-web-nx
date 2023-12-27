import { useEffect, useState } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
import cardgame from "@/assets/t19/images/home/gameType/cardGame.png";
import egame from "@/assets/t19/images/home/gameType/egame.png";
import esports from "@/assets/t19/images/home/gameType/esports.png";
import fishing from "@/assets/t19/images/home/gameType/fishing.png";
import live from "@/assets/t19/images/home/gameType/liveCasino.png";
import lottery from "@/assets/t19/images/home/gameType/lottery.png";
import sabong from "@/assets/t19/images/home/gameType/sabong.png";
import slot from "@/assets/t19/images/home/gameType/slot.png";
import sports from "@/assets/t19/images/home/gameType/sports.png";
import activeCardgame from "@/assets/t19/images/home/activeGameType/cardGame.png";
import activeEgame from "@/assets/t19/images/home/activeGameType/egame.png";
import activeEsports from "@/assets/t19/images/home/activeGameType/esports.png";
import activeFishing from "@/assets/t19/images/home/activeGameType/fishing.png";
import activeLive from "@/assets/t19/images/home/activeGameType/liveCasino.png";
import activeLottery from "@/assets/t19/images/home/activeGameType/lottery.png";
import activeSabong from "@/assets/t19/images/home/activeGameType/sabong.png";
import activeSlot from "@/assets/t19/images/home/activeGameType/slot.png";
import activeSports from "@/assets/t19/images/home/activeGameType/sports.png";

type GameTypeItem = {
  key: string;
  iconUrl: string;
  activeIconUrl: string;
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
        activeIconUrl: activeSports,
        text: i18n.t("common.sports"),
        fontSize: "small",
        gameType: GameTypeEnum.SPORTS,
      },
      {
        key: "slots",
        iconUrl: slot,
        activeIconUrl: activeSlot,
        text: i18n.t("common.slot"),
        fontSize: "small",
        gameType: GameTypeEnum.SLOT,
      },
      {
        key: "liveCasino",
        iconUrl: live,
        activeIconUrl: activeLive,
        text: i18n.t("common.live"),
        fontSize: "smaller",
        gameType: GameTypeEnum.LIVELOBBY,
      },
      {
        key: "sabong",
        iconUrl: sabong,
        activeIconUrl: activeSabong,
        text: i18n.t("common.cockfight"),
        fontSize: "smaller",
        gameType: GameTypeEnum.COCKFIGHT,
      },
      {
        key: "egame",
        iconUrl: egame,
        activeIconUrl: activeEgame,
        text: i18n.t("common.egame"),
        fontSize: "small",
        gameType: GameTypeEnum.TABLEGAME,
      },
      {
        key: "fishing",
        iconUrl: fishing,
        activeIconUrl: activeFishing,
        text: i18n.t("common.fish"),
        fontSize: "small",
        gameType: GameTypeEnum.FISH,
      },
      {
        key: "cardGame",
        iconUrl: cardgame,
        activeIconUrl: activeCardgame,
        text: i18n.t("common.chess"),
        fontSize: "smaller",
        gameType: GameTypeEnum.QIPAILOBBY,
      },
      {
        key: "lottery",
        iconUrl: lottery,
        activeIconUrl: activeLottery,
        text: i18n.t("common.lottery"),
        fontSize: "small",
        gameType: GameTypeEnum.LOTTERYLOBBY,
      },
      {
        key: "esports",
        iconUrl: esports,
        activeIconUrl: activeEsports,
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
