import { useEffect, useState, useMemo } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
import sport from "@/assets/t21/images/home/home_sport.png";
import live_casino from "@/assets/t21/images/home/home_live_casino.png";
import slot from "@/assets/t21/images/home/home_slot.png";
import fishing from "@/assets/t21/images/home/home_fishing.png";

type GameTypeItem = {
  key: string;
  name: string;
  imgUrl: string;
  text: string | any;
  gameType: GameTypeEnum;
};

export const useHomeCategoryList = () => {
  const [translatedGameTypeList, setTranslatedGameTypeList] = useState<GameTypeItem[]>([]);

  useEffect(() => {
    const homeCategoryList: GameTypeItem[] = [
      {
        key: "sports",
        name: "SPORTS",
        imgUrl: sport,
        text: i18n.t("common.sports"),
        gameType: GameTypeEnum.SPORTS,
      },
      {
        key: "liveCasino",
        name: "LIVE CASINO",
        imgUrl: live_casino,
        text: i18n.t("common.live"),
        gameType: GameTypeEnum.LIVELOBBY,
      },
      {
        key: "slots",
        name: "SLOTS",
        imgUrl: slot,
        text: i18n.t("common.slot"),
        gameType: GameTypeEnum.SLOT,
      },
      {
        key: "fishing",
        name: "FISHING",
        imgUrl: fishing,
        text: i18n.t("common.fish"),
        gameType: GameTypeEnum.FISH,
      },
    ];

    const translatedList: GameTypeItem[] = homeCategoryList.map((gameItem) => ({
      ...gameItem,
      text: i18n.t(gameItem.text),
    }));

    setTranslatedGameTypeList(translatedList);
  }, []);

  return translatedGameTypeList;
};

export default useHomeCategoryList;
