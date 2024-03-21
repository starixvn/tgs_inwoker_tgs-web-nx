import { useEffect, useState } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
import slotsBg from "@/assets/t36/images/home/category/slots-bg.png";
import lotteryBg from "@/assets/t36/images/home/category/lottery-bg.png";
import cardGameBg from "@/assets/t36/images/home/category/cardGame-bg.png";
import sportBg from "@/assets/t36/images/home/category/sport-bg.png";
import egameBg from "@/assets/t36/images/home/category/egame-bg.png";
import esportBg from "@/assets/t36/images/home/category/esport-bg.png";
import fishingBg from "@/assets/t36/images/home/category/fishing-bg.png";

type HomeCategoryItem = {
  key: string;
  text: string;
  gameType: GameTypeEnum;
  // iconUrl: string;
  // imageUrl: string;
  bgUrl: string;
};

export const useHomeCategoryList = () => {
  const [translatedGameTypeList, setTranslatedGameTypeList] = useState<HomeCategoryItem[]>([]);
  useEffect(() => {
    const homeCategoryList: HomeCategoryItem[] = [
      {
        key: "slots",
        text: i18n.t("common.slots"),
        gameType: GameTypeEnum.SLOT,
        bgUrl: slotsBg,
      },
      {
        key: "lottery",
        text: i18n.t("common.lottery"),
        gameType: GameTypeEnum.LOTTERYLOBBY,
        bgUrl: lotteryBg,
      },
      {
        key: "cardGame",
        text: i18n.t("common.chess"),
        gameType: GameTypeEnum.QIPAILOBBY,
        bgUrl: cardGameBg,
      },
      {
        key: "sports",
        text: i18n.t("common.sports"),
        gameType: GameTypeEnum.SPORTS,
        bgUrl: sportBg,
      },
      {
        key: "egame",
        text: i18n.t("common.egame"),
        gameType: GameTypeEnum.TABLEGAME,
        bgUrl: egameBg,
      },
      {
        key: "esports",
        text: i18n.t("common.esports"),
        gameType: GameTypeEnum.ESPORTS,
        bgUrl: esportBg,
      },
      {
        key: "fishing",
        text: i18n.t("common.fish"),
        gameType: GameTypeEnum.FISH,
        bgUrl: fishingBg,
      },
    ];

    const translatedList: HomeCategoryItem[] = homeCategoryList.map((gameItem) => ({
      ...gameItem,
      text: i18n.t(gameItem.text),
    }));

    setTranslatedGameTypeList(translatedList);
  }, []);

  return translatedGameTypeList;
};

export default useHomeCategoryList;
