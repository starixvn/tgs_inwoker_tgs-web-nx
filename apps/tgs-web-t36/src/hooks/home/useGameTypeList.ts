import { useEffect, useState } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
import cardgame from "@/assets/t36/images/home/gameType/cardGame.svg";
import egame from "@/assets/t36/images/home/gameType/egame.svg";
import esports from "@/assets/t36/images/home/gameType/esports.svg";
import fishing from "@/assets/t36/images/home/gameType/fishing.svg";
import live from "@/assets/t36/images/home/gameType/liveCasino.svg";
import lottery from "@/assets/t36/images/home/gameType/lottery.svg";
import sabong from "@/assets/t36/images/home/gameType/sabong.svg";
import slot from "@/assets/t36/images/home/gameType/slot.svg";
import sports from "@/assets/t36/images/home/gameType/sports.svg";
import LiveCasino from "@/pages/home/components/TabSvgIcon/LiveCasino";
import Egame from "@/pages/home/components/TabSvgIcon/Egame";
import CardGame from "@/pages/home/components/TabSvgIcon/CardGame";
import Esports from "@/pages/home/components/TabSvgIcon/Esports";
import Fish from "@/pages/home/components/TabSvgIcon/Fish";
import Lottery from "@/pages/home/components/TabSvgIcon/Lottery";
import Sabong from "@/pages/home/components/TabSvgIcon/Sabong";
import Slot from "@/pages/home/components/TabSvgIcon/Slot";
import Sport from "@/pages/home/components/TabSvgIcon/Sport";
import HomeSvg from "@/pages/home/components/TabSvgIcon/Home";

type GameTypeItem = {
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
  const [translatedGameTypeList, setTranslatedGameTypeList] = useState<GameTypeItem[]>([]);

  useEffect(() => {
    const gameTypeList: GameTypeItem[] = [
      {
        key: "home",
        iconUrl: "",
        text: i18n.t("common.home"),
        fontSize: "small",
        gameType: GameTypeEnum.NONE,
        iconComponent: HomeSvg,
        title: "",
        content: "",
      },
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

    const translatedList: GameTypeItem[] = gameTypeList.map((gameItem) => ({
      ...gameItem,
      text: i18n.t(gameItem.text),
    }));

    setTranslatedGameTypeList(translatedList);
  }, []);

  return translatedGameTypeList;
};

export default useGameTypeList;
