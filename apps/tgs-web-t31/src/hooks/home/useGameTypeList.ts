import { useEffect, useState } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
import home from "@/assets/t31/images/home/Home.svg";
import cardgame from "@/assets/t31/images/home/gameType/mobile/Card.svg";
import egame from "@/assets/t31/images/home/gameType/mobile/Card.svg";
import esports from "@/assets/t31/images/home/gameType/mobile/Esports.svg";
// import fishing from "@/assets/t31/images/home/gameType/mobile/Fish.svg";
import live from "@/assets/t31/images/home/gameType/mobile/Live.svg";
import lottery from "@/assets/t31/images/home/gameType/mobile/Lottery.svg";
// import sabong from "@/assets/t31/images/home/gameType/mobile/Sabong.svg";
import slot from "@/assets/t31/images/home/gameType/mobile/Slot.svg";
import sports from "@/assets/t31/images/home/gameType/mobile/Sports.svg";
// active icon
import homeActive from "@/assets/t31/images/home/Home_active.svg";
import cardgameActive from "@/assets/t31/images/home/gameType/mobile/Card_active.svg";
import egameActive from "@/assets/t31/images/home/gameType/mobile/Card_active.svg";
import esportsActive from "@/assets/t31/images/home/gameType/mobile/Esports_active.svg";
// import fishingActive from "@/assets/t31/images/home/gameType/mobile/Fish_active.svg";
import liveActive from "@/assets/t31/images/home/gameType/mobile/Live_active.svg";
import lotteryActive from "@/assets/t31/images/home/gameType/mobile/Lottery_active.svg";
// import sabongActive from "@/assets/t31/images/home/gameType/mobile/Sabong_active.svg";
import slotActive from "@/assets/t31/images/home/gameType/mobile/Slot_active.svg";
import sportsActive from "@/assets/t31/images/home/gameType/mobile/Sports_active.svg";
// side menu icon
import sideMenuCardgame from "@/assets/t31/images/home/gameType/SideMenu/Card.svg";
import sideMenuEgame from "@/assets/t31/images/home/gameType/SideMenu/Egame.svg";
// import sideMenuFishing from "@/assets/t31/images/home/gameType/SideMenu/Fish.svg";
import sideMenuLive from "@/assets/t31/images/home/gameType/SideMenu/Live.svg";
import sideMenuLottery from "@/assets/t31/images/home/gameType/SideMenu/Lottery.svg";
// import sideMenuSabong from "@/assets/t31/images/home/gameType/SideMenu/Sabong.svg";
import sideMenuSlot from "@/assets/t31/images/home/gameType/SideMenu/Slot.svg";
import sideMenuSports from "@/assets/t31/images/home/gameType/SideMenu/Sports.svg";
// desktop header icon
import headerCardgame from "@/assets/t31/images/home/gameType/desktop/Card.svg";
import headerEgame from "@/assets/t31/images/home/gameType/desktop/Egame.svg";
// import headerFishing from "@/assets/t31/images/home/gameType/desktop/Fish.svg";
import headerLive from "@/assets/t31/images/home/gameType/desktop/Live.svg";
import headerLottery from "@/assets/t31/images/home/gameType/desktop/Lottery.svg";
// import headerSabong from "@/assets/t31/images/home/gameType/desktop/Sabong.svg";
import headerSlot from "@/assets/t31/images/home/gameType/desktop/Slot.svg";
import headerSports from "@/assets/t31/images/home/gameType/desktop/Sports.svg";

export type GameTypeItem = {
  key: string;
  iconUrl: string;
  activeUrl?: string;
  sideMenuIconUrl?: string;
  headerIconUrl: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  text: string | any;
  fontSize: string;
  gameType: GameTypeEnum;
  routePath?: string;
};

export const useGameTypeList = () => {
  const [translatedGameTypeList, setTranslatedGameTypeList] = useState<GameTypeItem[]>([]);

  useEffect(() => {
    const gameTypeList: GameTypeItem[] = [
      {
        key: "Home",
        iconUrl: home,
        activeUrl: homeActive,
        headerIconUrl: "",
        text: i18n.t("common.home"),
        fontSize: "small",
        gameType: GameTypeEnum.NONE,
        routePath: "/",
      },
      {
        key: "sports",
        iconUrl: sports,
        activeUrl: sportsActive,
        sideMenuIconUrl: sideMenuSports,
        headerIconUrl: headerSports,
        text: i18n.t("common.sports"),
        fontSize: "small",
        gameType: GameTypeEnum.SPORTS,
        routePath: "/",
      },
      {
        key: "slots",
        iconUrl: slot,
        activeUrl: slotActive,
        sideMenuIconUrl: sideMenuSlot,
        headerIconUrl: headerSlot,
        text: i18n.t("common.slot"),
        fontSize: "small",
        gameType: GameTypeEnum.SLOT,
      },
      {
        key: "liveCasino",
        iconUrl: live,
        activeUrl: liveActive,
        sideMenuIconUrl: sideMenuLive,
        headerIconUrl: headerLive,
        text: i18n.t("common.live"),
        fontSize: "small",
        gameType: GameTypeEnum.LIVELOBBY,
      },
      // {
      //   key: "sabong",
      //   iconUrl: sabong,
      //   activeUrl: sabongActive,
      //   sideMenuIconUrl: sideMenuSabong,
      //   headerIconUrl: headerSabong,
      //   text: i18n.t("common.cockfight"),
      //   fontSize: "smaller",
      //   gameType: GameTypeEnum.COCKFIGHT,
      // },
      {
        key: "egame",
        iconUrl: egame,
        activeUrl: egameActive,
        sideMenuIconUrl: sideMenuEgame,
        headerIconUrl: headerEgame,
        text: i18n.t("common.egame"),
        fontSize: "small",
        gameType: GameTypeEnum.TABLEGAME,
      },
      // {
      //   key: "fishing",
      //   iconUrl: fishing,
      //   activeUrl: fishingActive,
      //   sideMenuIconUrl: sideMenuFishing,
      //   headerIconUrl: headerFishing,
      //   text: i18n.t("common.fish"),
      //   fontSize: "smaller",
      //   gameType: GameTypeEnum.FISH,
      // },
      {
        key: "cardGame",
        iconUrl: cardgame,
        activeUrl: cardgameActive,
        sideMenuIconUrl: sideMenuCardgame,
        headerIconUrl: headerCardgame,
        text: i18n.t("common.chess"),
        fontSize: "smaller",
        gameType: GameTypeEnum.QIPAILOBBY,
      },
      {
        key: "lottery",
        iconUrl: lottery,
        activeUrl: lotteryActive,
        sideMenuIconUrl: sideMenuLottery,
        headerIconUrl: headerLottery,
        text: i18n.t("common.lottery"),
        fontSize: "small",
        gameType: GameTypeEnum.LOTTERYLOBBY,
      },
      {
        key: "esports",
        iconUrl: esports,
        activeUrl: esportsActive,
        sideMenuIconUrl: sideMenuSports,
        headerIconUrl: headerSports,
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
