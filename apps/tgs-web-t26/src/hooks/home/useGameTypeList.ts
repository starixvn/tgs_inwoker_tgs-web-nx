import { useEffect, useState } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
// import cardgame from "@/assets/t29/images/home/gameType/cardGame.svg";
// import egame from "@/assets/t29/images/home/gameType/egame.svg";
// import esports from "@/assets/t29/images/home/gameType/esports.svg";
// import fishing from "@/assets/t29/images/home/gameType/fishing.svg";
// import live from "@/assets/t29/images/home/gameType/liveCasino.svg";
// import lottery from "@/assets/t29/images/home/gameType/lottery.svg";
// import sabong from "@/assets/t29/images/home/gameType/sabong.svg";
// import slot from "@/assets/t29/images/home/gameType/slot.svg";
// import sports from "@/assets/t29/images/home/gameType/sports.svg";
import {
  SportsIcon,
  EgameIcon,
  SlotsIcon,
  LiveCasinoIcon,
  SabongIcon,
  FishIcon,
  CardGameIcon,
  LotteryIcon,
  EsportsIcon,
} from "@/components/project/GameTypeIcons";
type GameTypeItem = {
  key: string;
  iconUrl: string;
  Icon: any;
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
        Icon: SportsIcon,
        iconUrl: "",
        text: i18n.t("common.sports"),
        fontSize: "small",
        gameType: GameTypeEnum.SPORTS,
      },
      {
        key: "slots",
        Icon: SlotsIcon,
        iconUrl: "",
        text: i18n.t("common.slot"),
        fontSize: "small",
        gameType: GameTypeEnum.SLOT,
      },
      {
        key: "liveCasino",
        Icon: LiveCasinoIcon,
        iconUrl: "",
        text: i18n.t("common.live"),
        fontSize: "small",
        gameType: GameTypeEnum.LIVELOBBY,
      },
      {
        key: "sabong",
        Icon: SabongIcon,
        iconUrl: "",
        text: i18n.t("common.cockfight"),
        fontSize: "smaller",
        gameType: GameTypeEnum.COCKFIGHT,
      },
      {
        key: "egame",
        Icon: EgameIcon,
        iconUrl: "",
        text: i18n.t("common.egame"),
        fontSize: "small",
        gameType: GameTypeEnum.TABLEGAME,
      },
      {
        key: "fishing",
        Icon: FishIcon,
        iconUrl: "",
        text: i18n.t("common.fish"),
        fontSize: "smaller",
        gameType: GameTypeEnum.FISH,
      },
      {
        key: "cardGame",
        Icon: CardGameIcon,
        iconUrl: "",
        text: i18n.t("common.chess"),
        fontSize: "smaller",
        gameType: GameTypeEnum.QIPAILOBBY,
      },
      {
        key: "lottery",
        Icon: LotteryIcon,
        iconUrl: "",
        text: i18n.t("common.lottery"),
        fontSize: "small",
        gameType: GameTypeEnum.LOTTERYLOBBY,
      },
      {
        key: "esports",
        Icon: EsportsIcon,
        iconUrl: "",
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
