import { useEffect, useState } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
import cardgame from "@/assets/t32/images/home/gameType/cardGame.svg";
import egame from "@/assets/t32/images/home/gameType/egame.svg";
import esports from "@/assets/t32/images/home/gameType/esports.svg";
import fishing from "@/assets/t32/images/home/gameType/fishing.svg";
import live from "@/assets/t32/images/home/gameType/liveCasino.svg";
import lottery from "@/assets/t32/images/home/gameType/lottery.svg";
import sabong from "@/assets/t32/images/home/gameType/sabong.svg";
import slot from "@/assets/t32/images/home/gameType/slot.svg";
import sports from "@/assets/t32/images/home/gameType/sports.svg";
import LiveCasino from "@/pages/home/components/TabSvgIcon/LiveCasino";
import Egame from "@/pages/home/components/TabSvgIcon/Egame";
import CardGame from "@/pages/home/components/TabSvgIcon/CardGame";
import Esports from "@/pages/home/components/TabSvgIcon/Esports";
import Fish from "@/pages/home/components/TabSvgIcon/Fish";
import Lottery from "@/pages/home/components/TabSvgIcon/Lottery";
import Sabong from "@/pages/home/components/TabSvgIcon/Sabong";
import Slot from "@/pages/home/components/TabSvgIcon/Slot";
import Sport from "@/pages/home/components/TabSvgIcon/Sport";

type GameTypeItem = {
  key: string;
  iconUrl: string;
  text: string | any;
  fontSize: string;
  gameType: GameTypeEnum;
  iconComponent: React.FC<{ $color: string }>;
};

export const useGameTypeList = () => {
  const [translatedGameTypeList, setTranslatedGameTypeList] = useState<GameTypeItem[]>([]);

  useEffect(() => {
    const gameTypeList: GameTypeItem[] = [
      {
        key: "sports",
        iconUrl: sports,
        text: i18n.t("common.sports"),
        fontSize: "small",
        gameType: GameTypeEnum.SPORTS,
        iconComponent: Sport,
      },
      {
        key: "slots",
        iconUrl: slot,
        text: i18n.t("common.slot"),
        fontSize: "small",
        gameType: GameTypeEnum.SLOT,
        iconComponent: Slot,
      },
      {
        key: "liveCasino",
        iconUrl: live,
        text: i18n.t("common.live"),
        fontSize: "small",
        gameType: GameTypeEnum.LIVELOBBY,
        iconComponent: LiveCasino,
      },
      {
        key: "sabong",
        iconUrl: sabong,
        text: i18n.t("common.cockfight"),
        fontSize: "smaller",
        gameType: GameTypeEnum.COCKFIGHT,
        iconComponent: Sabong,
      },
      {
        key: "egame",
        iconUrl: egame,
        text: i18n.t("common.egame"),
        fontSize: "small",
        gameType: GameTypeEnum.TABLEGAME,
        iconComponent: Egame,
      },
      {
        key: "fishing",
        iconUrl: fishing,
        text: i18n.t("common.fish"),
        fontSize: "smaller",
        gameType: GameTypeEnum.FISH,
        iconComponent: Fish,
      },
      {
        key: "cardGame",
        iconUrl: cardgame,
        text: i18n.t("common.chess"),
        fontSize: "smaller",
        gameType: GameTypeEnum.QIPAILOBBY,
        iconComponent: CardGame,
      },
      {
        key: "lottery",
        iconUrl: lottery,
        text: i18n.t("common.lottery"),
        fontSize: "small",
        gameType: GameTypeEnum.LOTTERYLOBBY,
        iconComponent: Lottery,
      },
      {
        key: "esports",
        iconUrl: esports,
        text: i18n.t("common.esports"),
        fontSize: "smaller",
        gameType: GameTypeEnum.ESPORTS,
        iconComponent: Esports,
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
