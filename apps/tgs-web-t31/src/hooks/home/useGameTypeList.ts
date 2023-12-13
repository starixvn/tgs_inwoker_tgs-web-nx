import { useEffect, useState } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
import home from "@/assets/t31/images/home/Home.svg";
import cardgame from "@/assets/t31/images/home/gameType/mobile/Card.svg";
import egame from "@/assets/t31/images/home/gameType/mobile/Card.svg";
import esports from "@/assets/t31/images/home/gameType/mobile/Esports.svg";
import fishing from "@/assets/t31/images/home/gameType/mobile/Fish.svg";
import live from "@/assets/t31/images/home/gameType/mobile/Live.svg";
import lottery from "@/assets/t31/images/home/gameType/mobile/Lottery.svg";
import sabong from "@/assets/t31/images/home/gameType/mobile/Sabong.svg";
import slot from "@/assets/t31/images/home/gameType/mobile/Slot.svg";
import sports from "@/assets/t31/images/home/gameType/mobile/Sports.svg";
// active icon
import homeActive from "@/assets/t31/images/home/Home_active.svg";
import cardgameActive from "@/assets/t31/images/home/gameType/mobile/Card_active.svg";
import egameActive from "@/assets/t31/images/home/gameType/mobile/Card_active.svg";
import esportsActive from "@/assets/t31/images/home/gameType/mobile/Esports_active.svg";
import fishingActive from "@/assets/t31/images/home/gameType/mobile/Fish_active.svg";
import liveActive from "@/assets/t31/images/home/gameType/mobile/Live_active.svg";
import lotteryActive from "@/assets/t31/images/home/gameType/mobile/Lottery_active.svg";
import sabongActive from "@/assets/t31/images/home/gameType/mobile/Sabong_active.svg";
import slotActive from "@/assets/t31/images/home/gameType/mobile/Slot_active.svg";
import sportsActive from "@/assets/t31/images/home/gameType/mobile/Sports_active.svg";
// side menu icon
import sideMenuCardgame from "@/assets/t31/images/home/gameType/SideMenu/Card.svg";
import sideMenuEgame from "@/assets/t31/images/home/gameType/SideMenu/Egame.svg";
import sideMenuFishing from "@/assets/t31/images/home/gameType/SideMenu/Fish.svg";
import sideMenuLive from "@/assets/t31/images/home/gameType/SideMenu/Live.svg";
import sideMenuLottery from "@/assets/t31/images/home/gameType/SideMenu/Lottery.svg";
import sideMenuSabong from "@/assets/t31/images/home/gameType/SideMenu/Sabong.svg";
import sideMenuSlot from "@/assets/t31/images/home/gameType/SideMenu/Slot.svg";
import sideMenuSports from "@/assets/t31/images/home/gameType/SideMenu/Sports.svg";

type GameTypeItem = {
  key: string;
  iconUrl: string;
  activeUrl: string;
  sideMenuIconUrl: string;
  text: string | any;
  fontSize: string;
  gameType: GameTypeEnum;
};

export const useGameTypeList = () => {
  const [translatedGameTypeList, setTranslatedGameTypeList] = useState<GameTypeItem[]>([]);

  useEffect(() => {
    const gameTypeList: GameTypeItem[] = [
      {
        key: "Home",
        iconUrl: home,
        activeUrl: homeActive,
        sideMenuIconUrl: "",
        text: i18n.t("common.home"),
        fontSize: "small",
        gameType: GameTypeEnum.NONE,
      },
      {
        key: "sports",
        iconUrl: sports,
        activeUrl: sportsActive,
        sideMenuIconUrl: sideMenuSports,
        text: i18n.t("common.sports"),
        fontSize: "small",
        gameType: GameTypeEnum.SPORTS,
      },
      {
        key: "slots",
        iconUrl: slot,
        activeUrl: slotActive,
        sideMenuIconUrl: sideMenuSlot,
        text: i18n.t("common.slot"),
        fontSize: "small",
        gameType: GameTypeEnum.SLOT,
      },
      {
        key: "liveCasino",
        iconUrl: live,
        activeUrl: liveActive,
        sideMenuIconUrl: sideMenuLive,
        text: i18n.t("common.live"),
        fontSize: "small",
        gameType: GameTypeEnum.LIVELOBBY,
      },
      {
        key: "sabong",
        iconUrl: sabong,
        activeUrl: sabongActive,
        sideMenuIconUrl: sideMenuSabong,
        text: i18n.t("common.cockfight"),
        fontSize: "smaller",
        gameType: GameTypeEnum.COCKFIGHT,
      },
      {
        key: "egame",
        iconUrl: egame,
        activeUrl: egameActive,
        sideMenuIconUrl: sideMenuEgame,
        text: i18n.t("common.egame"),
        fontSize: "small",
        gameType: GameTypeEnum.TABLEGAME,
      },
      {
        key: "fishing",
        iconUrl: fishing,
        activeUrl: fishingActive,
        sideMenuIconUrl: sideMenuFishing,
        text: i18n.t("common.fish"),
        fontSize: "smaller",
        gameType: GameTypeEnum.FISH,
      },
      {
        key: "cardGame",
        iconUrl: cardgame,
        activeUrl: cardgameActive,
        sideMenuIconUrl: sideMenuCardgame,
        text: i18n.t("common.chess"),
        fontSize: "smaller",
        gameType: GameTypeEnum.QIPAILOBBY,
      },
      {
        key: "lottery",
        iconUrl: lottery,
        activeUrl: lotteryActive,
        sideMenuIconUrl: sideMenuLottery,
        text: i18n.t("common.lottery"),
        fontSize: "small",
        gameType: GameTypeEnum.LOTTERYLOBBY,
      },
      {
        key: "esports",
        iconUrl: esports,
        activeUrl: esportsActive,
        sideMenuIconUrl: sideMenuSports,
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
