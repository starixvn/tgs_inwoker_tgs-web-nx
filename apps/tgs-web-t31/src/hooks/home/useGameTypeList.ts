import { useEffect, useState } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
import cardgame from "@/assets/t31/images/home/gameType/Card.png";
import activedCardgame from "@/assets/t31/images/home/gameType/Card-1.png";
import egame from "@/assets/t31/images/home/gameType/Egame.png";
import activedEgame from "@/assets/t31/images/home/gameType/Egame-1.png";
import esports from "@/assets/t31/images/home/gameType/Esports.png";
import activeddEsports from "@/assets/t31/images/home/gameType/Esports-1.png";
import fishing from "@/assets/t31/images/home/gameType/Fish.png";
import activedFishing from "@/assets/t31/images/home/gameType/Fish-1.png";
import horse from "@/assets/t31/images/home/gameType/Horse.png";
import activedHorse from "@/assets/t31/images/home/gameType/Horse-1.png";
import live from "@/assets/t31/images/home/gameType/Live.png";
import ActivedLive from "@/assets/t31/images/home/gameType/Live-1.png";
import lottery from "@/assets/t31/images/home/gameType/Lottery.png";
import activedLottery from "@/assets/t31/images/home/gameType/Lottery-1.png";
import sabong from "@/assets/t31/images/home/gameType/Sabong.png";
import actviedSabong from "@/assets/t31/images/home/gameType/Sabong.png";
import slot from "@/assets/t31/images/home/gameType/Slot.png";
import activedSlot from "@/assets/t31/images/home/gameType/Slot-1.png";
import sports from "@/assets/t31/images/home/gameType/Sports.png";
import activedSports from "@/assets/t31/images/home/gameType/Sports-1.png";

type GameTypeItem = {
  key: string;
  iconUrl: string;
  activedIconUrl: string;
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
        activedIconUrl: activedSports,
        text: i18n.t("common.sports"),
        fontSize: "small",
        gameType: GameTypeEnum.SPORTS,
      },
      {
        key: "slots",
        iconUrl: slot,
        activedIconUrl: activedSlot,
        text: i18n.t("common.slot"),
        fontSize: "small",
        gameType: GameTypeEnum.SLOT,
      },
      {
        key: "cardGame",
        iconUrl: cardgame,
        activedIconUrl: activedCardgame,
        text: i18n.t("common.chess"),
        fontSize: "smaller",
        gameType: GameTypeEnum.QIPAILOBBY,
      },
      {
        key: "egame",
        iconUrl: egame,
        activedIconUrl: activedEgame,
        text: i18n.t("common.egame"),
        fontSize: "small",
        gameType: GameTypeEnum.TABLEGAME,
      },
      {
        key: "esports",
        iconUrl: esports,
        activedIconUrl: activeddEsports,
        text: i18n.t("common.esports"),
        fontSize: "smaller",
        gameType: GameTypeEnum.ESPORTS,
      },
      {
        key: "fishing",
        iconUrl: fishing,
        activedIconUrl: activedFishing,
        text: i18n.t("common.fish"),
        fontSize: "small",
        gameType: GameTypeEnum.FISH,
      },
      // {
      //   key: "horse",
      //   iconUrl: horse,
      //   activedIconUrl: activedHorse,
      //   text: i18n.t("common.horserace"),
      //   fontSize: "small",
      //   gameType: GameTypeEnum.NONE,
      // },
      {
        key: "liveCasino",
        iconUrl: live,
        activedIconUrl: ActivedLive,
        text: i18n.t("common.live"),
        fontSize: "smaller",
        gameType: GameTypeEnum.LIVELOBBY,
      },
      {
        key: "lottery",
        iconUrl: lottery,
        activedIconUrl: activedLottery,
        text: i18n.t("common.lottery"),
        fontSize: "small",
        gameType: GameTypeEnum.LOTTERYLOBBY,
      },
      {
        key: "sabong",
        iconUrl: sabong,
        activedIconUrl: actviedSabong,
        text: i18n.t("common.cockfight"),
        fontSize: "smaller",
        gameType: GameTypeEnum.COCKFIGHT,
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
