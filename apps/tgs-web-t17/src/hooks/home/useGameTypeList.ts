import { useEffect, useState } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
import cardgame from "@/assets/t17/images/home/homeGameType/cardGame.png";
import egame from "@/assets/t17/images/home/homeGameType/egame.png";
import esports from "@/assets/t17/images/home/homeGameType/esports.png";
import fishing from "@/assets/t17/images/home/homeGameType/fishing.png";
import live from "@/assets/t17/images/home/homeGameType/liveCasino.png";
import lottery from "@/assets/t17/images/home/homeGameType/lottery.png";
import sabong from "@/assets/t17/images/home/homeGameType/sabong.png";
import slot from "@/assets/t17/images/home/homeGameType/slot.png";
import sports from "@/assets/t17/images/home/homeGameType/sports.png";
import LiveCasino from "@/pages/home/components/TabSvgIcon/LiveCasino";
import Egame from "@/pages/home/components/TabSvgIcon/Egame";
import CardGame from "@/pages/home/components/TabSvgIcon/CardGame";
import Esports from "@/pages/home/components/TabSvgIcon/Esports";
import Fish from "@/pages/home/components/TabSvgIcon/Fish";
import Lottery from "@/pages/home/components/TabSvgIcon/Lottery";
import Sabong from "@/pages/home/components/TabSvgIcon/Sabong";
import Slot from "@/pages/home/components/TabSvgIcon/Slot";
import Sport from "@/pages/home/components/TabSvgIcon/Sport";
import { GameTypeItem } from "@tgs-web-nx/core/features";

type homeGameTypeItem = {
  key: string;
  iconUrl: string;
  text: string;
  fontSize: string;
  gameType: GameTypeEnum;
  iconComponent: React.FC<{ $color: string }>;
  title: string;
  content: string;
};

export const useGameTypeList = () => {
  const [translatedGameTypeList, setTranslatedGameTypeList] = useState<homeGameTypeItem[]>([]);

  useEffect(() => {
    const gameTypeList: homeGameTypeItem[] = [
      // {
      //   key: "home",
      //   iconUrl: "",
      //   text: i18n.t("common.home"),
      //   fontSize: "small",
      //   gameType: GameTypeEnum.NONE,
      //   iconComponent: HomeSvg,
      //   title: "",
      //   content: "",
      // },
      {
        key: "sports",
        iconUrl: sports,
        text: i18n.t("common.sports"),
        fontSize: "small",
        gameType: GameTypeEnum.SPORTS,
        iconComponent: Sport,
        title: "Sports",
        content: "Find the best odds, win securely and easily with top rated sportsbook.",
      },
      {
        key: "slots",
        iconUrl: slot,
        text: i18n.t("common.slot"),
        fontSize: "small",
        gameType: GameTypeEnum.SLOT,
        iconComponent: Slot,
        title: "Slots",
        content: "Enjoy 500+ slots games with fun features, free bonuses, and more!",
      },
      {
        key: "liveCasino",
        iconUrl: live,
        text: i18n.t("common.live"),
        fontSize: "small",
        gameType: GameTypeEnum.LIVELOBBY,
        iconComponent: LiveCasino,
        title: "Live Casino",
        content: "Play Roulette, Blackjack, Baccarat, all with Live Dealers.",
      },
      {
        key: "sabong",
        iconUrl: sabong,
        text: i18n.t("common.cockfight"),
        fontSize: "smaller",
        gameType: GameTypeEnum.COCKFIGHT,
        iconComponent: Sabong,
        title: "Sabong",
        content: "Most popular cockfight matches, why wait? Bet and win now!",
      },
      {
        key: "egame",
        iconUrl: egame,
        text: i18n.t("common.egame"),
        fontSize: "small",
        gameType: GameTypeEnum.TABLEGAME,
        iconComponent: Egame,
        title: "Egame",
        content: "The world's #1 platform for playing Egames online.",
      },
      {
        key: "fishing",
        iconUrl: fishing,
        text: i18n.t("common.fish"),
        fontSize: "smaller",
        gameType: GameTypeEnum.FISH,
        iconComponent: Fish,
        title: "Fishing",
        content: "Shoot the fish online and start winning real money!",
      },
      {
        key: "cardGame",
        iconUrl: cardgame,
        text: i18n.t("common.chess"),
        fontSize: "smaller",
        gameType: GameTypeEnum.QIPAILOBBY,
        iconComponent: CardGame,
        title: "Card Game",
        content: "Fantastic card games with endless entertainment just for you!",
      },
      {
        key: "lottery",
        iconUrl: lottery,
        text: i18n.t("common.lottery"),
        fontSize: "small",
        gameType: GameTypeEnum.LOTTERYLOBBY,
        iconComponent: Lottery,
        title: "Lottery",
        content: "Player's favorite game, with thousands winning prizes every seconds!",
      },
      {
        key: "esports",
        iconUrl: esports,
        text: i18n.t("common.esports"),
        fontSize: "smaller",
        gameType: GameTypeEnum.ESPORTS,
        iconComponent: Esports,
        title: "Esports",
        content: "Start your journey into the world of Esports and earn rewards!",
      },
    ];

    const translatedList: homeGameTypeItem[] = gameTypeList.map((gameItem) => ({
      ...gameItem,
      text: i18n.t(gameItem.text),
      iconComponent: gameItem.iconComponent,
      title: gameItem.title,
      content: gameItem.content,
    }));

    setTranslatedGameTypeList(translatedList);
  }, []);

  return translatedGameTypeList;
};

export default useGameTypeList;
