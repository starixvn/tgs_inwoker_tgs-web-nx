import { useEffect, useState, useMemo } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
import sport from "@/assets/t22/images/home/home_sport.png";
import live_casino from "@/assets/t22/images/home/home_live_casino.png";
import slot from "@/assets/t22/images/home/home_slot.png";
import fishing from "@/assets/t22/images/home/home_fishing.png";
import iconSport from "@/assets/t22/images/home/icon_sport.svg";
import iconFishing from "@/assets/t22/images/home/icon_fishing.svg";
import iconSlot from "@/assets/t22/images/home/icon_slot.svg";
import iconCasino from "@/assets/t22/images/home/icon_casino.svg";

type GameTypeItem = {
  key: string;
  name: string;
  imgUrl: string;
  icon: string;
  title: string;
  subTitle: string;
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
        icon: iconSport,
        title: i18n.t("common.sports"),
        subTitle: "SPORTS GAMES",
        gameType: GameTypeEnum.SPORTS,
      },
      {
        key: "slots",
        name: "SLOTS",
        imgUrl: slot,
        icon: iconSlot,
        title: i18n.t("common.slot"),
        subTitle: "Slot GAMES",
        gameType: GameTypeEnum.SLOT,
      },
      {
        key: "fishing",
        name: "FISHING",
        imgUrl: fishing,
        icon: iconFishing,
        title: i18n.t("common.fish"),
        subTitle: "Fishing GAMES",
        gameType: GameTypeEnum.FISH,
      },
      {
        key: "liveCasino",
        name: "LIVE CASINO",
        imgUrl: live_casino,
        icon: iconCasino,
        title: i18n.t("common.live"),
        subTitle: "Live Casino",
        gameType: GameTypeEnum.LIVELOBBY,
      },
    ];

    const translatedList: GameTypeItem[] = homeCategoryList.map((gameItem) => ({
      ...gameItem,
      title: i18n.t(gameItem.title),
    }));

    setTranslatedGameTypeList(translatedList);
  }, []);

  return translatedGameTypeList;
};

export default useHomeCategoryList;
