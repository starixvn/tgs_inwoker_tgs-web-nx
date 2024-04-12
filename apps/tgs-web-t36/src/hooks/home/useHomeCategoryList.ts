import { useEffect, useState } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
import slotsBg from "@/assets/t36/images/home/category/slots-bg.png";
import liveBg from "@/assets/t36/images/home/category/live-bg.png";
import lotteryBg from "@/assets/t36/images/home/category/lottery-bg.png";
import cardGameBg from "@/assets/t36/images/home/category/cardGame-bg.png";
import sportBg from "@/assets/t36/images/home/category/sport-bg.png";
import egameBg from "@/assets/t36/images/home/category/egame-bg.png";
import esportBg from "@/assets/t36/images/home/category/esport-bg.png";
import fishingBg from "@/assets/t36/images/home/category/fishing-bg.png";

import slotsBgDesktop from "@/assets/t36/images/home/category/slots-bg-desktop.png";
import liveBgDesktop from "@/assets/t36/images/home/category/live-bg-desktop.png";
import lotteryBgDesktop from "@/assets/t36/images/home/category/lottery-bg-desktop.png";
import cardGameBgDesktop from "@/assets/t36/images/home/category/cardGame-bg-desktop.png";
import sportBgDesktop from "@/assets/t36/images/home/category/sport-bg-desktop.png";
import egameBgDesktop from "@/assets/t36/images/home/category/egame-bg-desktop.png";
import esportBgDesktop from "@/assets/t36/images/home/category/esport-bg-desktop.png";
import fishingBgDesktop from "@/assets/t36/images/home/category/fishing-bg-desktop.png";

type HomeCategoryItem = {
  key: string;
  text: string;
  gameType: GameTypeEnum;
  // iconUrl: string;
  // imageUrl: string;
  bgUrl: string;
  desktopBgUrl: string;
  introduction: string;
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
        desktopBgUrl: slotsBgDesktop,
        introduction: "Enjoy 500+ slots games with fun features, free bonuses, and more!",
      },
      {
        key: "liveCasino",
        text: i18n.t("common.live"),
        gameType: GameTypeEnum.LIVELOBBY,
        bgUrl: liveBg,
        desktopBgUrl: liveBgDesktop,
        introduction: "Play Roulette, Blackjack, Baccarat, all with Live Dealers.",
      },
      {
        key: "lottery",
        text: i18n.t("common.lottery"),
        gameType: GameTypeEnum.LOTTERYLOBBY,
        bgUrl: lotteryBg,
        desktopBgUrl: lotteryBgDesktop,
        introduction: "Player's favorite game, with thousands winning prizes every seconds!",
      },
      {
        key: "cardGame",
        text: i18n.t("common.chess"),
        gameType: GameTypeEnum.QIPAILOBBY,
        bgUrl: cardGameBg,
        desktopBgUrl: cardGameBgDesktop,
        introduction: "Fantastic card games with endless entertainment just for you!",
      },
      {
        key: "sports",
        text: i18n.t("common.sports"),
        gameType: GameTypeEnum.SPORTS,
        bgUrl: sportBg,
        desktopBgUrl: sportBgDesktop,
        introduction: "Find the best odds, win securely and easily with top rated sportsbook.",
      },
      {
        key: "egame",
        text: i18n.t("common.egame"),
        gameType: GameTypeEnum.TABLEGAME,
        bgUrl: egameBg,
        desktopBgUrl: egameBgDesktop,
        introduction: "The world's #1 platform for playing Egames online.",
      },
      {
        key: "esports",
        text: i18n.t("common.esports"),
        gameType: GameTypeEnum.ESPORTS,
        bgUrl: esportBg,
        desktopBgUrl: esportBgDesktop,
        introduction: "Start your journey into the world of Esports and earn rewards!",
      },
      {
        key: "fishing",
        text: i18n.t("common.fish"),
        gameType: GameTypeEnum.FISH,
        bgUrl: fishingBg,
        desktopBgUrl: fishingBgDesktop,
        introduction: "Shoot the fish online and start winning real money!",
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
