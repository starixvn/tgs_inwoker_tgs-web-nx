import { GameTypeEnum } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
import { useEffect, useState } from "react";

type GameTypeItem = {
  key: string;
  iconUrl: string;
  activeIconUrl?: string;
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
        iconUrl: "/assets/images/common/icon-soccer.svg",
        activeIconUrl: "",
        text: i18n.t("common.sports"),
        fontSize: "small",
        gameType: GameTypeEnum.SPORTS,
      },
      {
        key: "slots",
        iconUrl: "/assets/images/common/icon-slots.svg",
        activeIconUrl: "",
        text: i18n.t("common.slot"),
        fontSize: "small",
        gameType: GameTypeEnum.SLOT,
      },
      {
        key: "liveCasino",
        iconUrl: "/assets/images/common/icon-live-casino.svg",
        activeIconUrl: "",
        text: i18n.t("common.live"),
        fontSize: "small",
        gameType: GameTypeEnum.LIVE,
      },
      {
        key: "sabong",
        iconUrl: "/assets/images/common/icon-cock-fighting.svg",
        activeIconUrl: "",
        text: i18n.t("common.cockfight"),
        fontSize: "smaller",
        gameType: GameTypeEnum.COCKFIGHT,
      },
      {
        key: "tableGame",
        iconUrl: "/assets/images/common/icon-table-game-group.svg",
        activeIconUrl: "",
        text: i18n.t("common.tablegame"),
        fontSize: "small",
        gameType: GameTypeEnum.TABLEGAME,
      },
      {
        key: "fishing",
        iconUrl: "/assets/images/common/icon-fishing.svg",
        activeIconUrl: "",
        text: i18n.t("common.fish"),
        fontSize: "smaller",
        gameType: GameTypeEnum.FISH,
      },
      {
        key: "cardGame",
        iconUrl: "/assets/images/common/icon-card-game.svg",
        activeIconUrl: "",
        text: i18n.t("common.chess"),
        fontSize: "smaller",
        gameType: GameTypeEnum.QIPAI,
      },
      {
        key: "lottery",
        iconUrl: "/assets/images/common/icon-lottery.svg",
        activeIconUrl: "",
        text: i18n.t("common.lottery"),
        fontSize: "small",
        gameType: GameTypeEnum.LOTTERY,
      },
      {
        key: "esports",
        iconUrl: "/assets/images/common/icon-e-sports.svg",
        activeIconUrl: "",
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
