import { useEffect, useState } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
import casinoIcon from "@/assets/t27/images/home/category/casino-icon.svg";
import sportsIcon from "@/assets/t27/images/home/category/sports-icon.svg";
import lotteryIcon from "@/assets/t27/images/home/category/lottery-icon.svg";
import slotsIcon from "@/assets/t27/images/home/category/sots-icon.svg";
import casinoImg from "@/assets/t27/images/home/category/casino-image.png";
import sportsImg from "@/assets/t27/images/home/category/sports-image.png";
import lotteryImg from "@/assets/t27/images/home/category/lottery-image.png";
import slotsImg from "@/assets/t27/images/home/category/slots-image.png";
import casinoBg from "@/assets/t27/images/home/category/casino-bg.png";
import sportsBg from "@/assets/t27/images/home/category/sports-bg.png";
import lotteryBg from "@/assets/t27/images/home/category/lottery-bg.png";
import slotsBg from "@/assets/t27/images/home/category/slots-bg.png";

type HomeCategoryItem = {
  key: string;
  text: string;
  gameType: GameTypeEnum;
  iconUrl: string;
  imageUrl: string;
  bgUrl: string;
};

export const useHomeCategoryList = () => {
  const [translatedGameTypeList, setTranslatedGameTypeList] = useState<HomeCategoryItem[]>([]);

  useEffect(() => {
    const homeCategoryList: HomeCategoryItem[] = [
      {
        key: "liveCasino",
        text: i18n.t("common.live"),
        gameType: GameTypeEnum.LIVELOBBY,
        iconUrl: casinoIcon,
        imageUrl: casinoImg,
        bgUrl: casinoBg,
      },
      {
        key: "sports",
        text: i18n.t("common.sports"),
        gameType: GameTypeEnum.SPORTS,
        iconUrl: sportsIcon,
        imageUrl: sportsImg,
        bgUrl: sportsBg,
      },
      {
        key: "lottery",
        text: i18n.t("common.lottery"),
        gameType: GameTypeEnum.LOTTERYLOBBY,
        iconUrl: lotteryIcon,
        imageUrl: lotteryImg,
        bgUrl: lotteryBg,
      },
      {
        key: "slots",
        text: i18n.t("common.slots"),
        gameType: GameTypeEnum.SLOT,
        iconUrl: slotsIcon,
        imageUrl: slotsImg,
        bgUrl: slotsBg,
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
