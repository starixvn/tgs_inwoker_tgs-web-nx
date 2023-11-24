import {GameTypeEnum} from "@tgs-web-nx/constants";
import {i18n} from "@tgs-web-nx/utils";
import cardgame from "@/assets/t23/images/home/gameType/cardGame.svg";
import egame from "@/assets/t23/images/home/gameType/egame.svg";
import esports from "@/assets/t23/images/home/gameType/esports.svg";
import fishing from "@/assets/t23/images/home/gameType/fishing.svg";
import home from "@/assets/t23/images/home/gameType/home.svg";
import live from "@/assets/t23/images/home/gameType/liveCasino.svg";
import lottery from "@/assets/t23/images/home/gameType/lottery.svg";
import sabong from "@/assets/t23/images/home/gameType/sabong.svg";
import slot from "@/assets/t23/images/home/gameType/slot.svg";
import sports from "@/assets/t23/images/home/gameType/sports.svg";
import hot from "@/assets/t23/images/home/hot.svg";
import newIcon from "@/assets/t23/images/home/new.svg";
// Note : Horse belongs to SPORTS: 1,

type TabIcon = {
  key: string;
  iconUrl: string;
  text: string;
  fontSize: string;
  gameType: number;
};

type LobbyCategoryIcon = {
  key: string;
  iconUrl: string;
  text: string;
  gameType: number;
};

export const gameTypeList: TabIcon[] = [
  {
    key: "home",
    iconUrl: home,
    text: i18n.t("common.home"),
    fontSize: "small",
    gameType: 0,
  },
  {
    key: "slots",
    iconUrl: slot,
    text: i18n.t("common.slot"),
    fontSize: "small",
    gameType: GameTypeEnum.SLOT,
  },
  {
    key: "liveCasino",
    iconUrl: live,
    text: i18n.t("common.live"),
    fontSize: "smaller",
    gameType: GameTypeEnum.LIVELOBBY,
  },
  {
    key: "lottery",
    iconUrl: lottery,
    text: i18n.t("common.lottery"),
    fontSize: "small",
    gameType: GameTypeEnum.LOTTERYLOBBY,
  },
  {
    key: "fishing",
    iconUrl: fishing,
    text: i18n.t("common.fish"),
    fontSize: "small",
    gameType: GameTypeEnum.FISH,
  },
  {
    key: "sports",
    iconUrl: sports,
    text: i18n.t("common.sports"),
    fontSize: "small",
    gameType: GameTypeEnum.SPORTS,
  },
  {
    key: "sabong",
    iconUrl: sabong,
    text: i18n.t("common.cockfight"),
    fontSize: "small",
    gameType: GameTypeEnum.COCKFIGHT,
  },
  {
    key: "egame",
    iconUrl: egame,
    text: i18n.t("common.eGame"),
    fontSize: "small",
    gameType: GameTypeEnum.TABLEGAME,
  },
  {
    key: "cardGame",
    iconUrl: cardgame,
    text: i18n.t("common.cardGame"),
    fontSize: "smaller",
    gameType: GameTypeEnum.QIPAILOBBY,
  },
  {
    key: "esports",
    iconUrl: esports,
    text: i18n.t("common.esports"),
    fontSize: "smaller",
    gameType: GameTypeEnum.ESPORTS,
  },
];

export const lobbyCategoryList: { [key: string]: LobbyCategoryIcon } = {
  slotsHot: {
    key: "slotsHot",
    iconUrl: hot,
    text: i18n.t("common.slot.hotGame"),
    gameType: GameTypeEnum.SLOT,
  },
  slotsNew: {
    key: "slotsNew",
    iconUrl: newIcon,
    text: i18n.t("common.slot.newGame"),
    gameType: GameTypeEnum.SLOT,
  },
  slotsRecommend: {
    key: "slotsRecommend",
    iconUrl: "",
    text: i18n.t("common.slot.recommendGame"),
    gameType: GameTypeEnum.SLOT,
  },
  liveCasino: {
    key: "liveCasino",
    iconUrl: live,
    text: i18n.t("common.live"),
    gameType: GameTypeEnum.LIVELOBBY,
  },
  lottery: {
    key: "lottery",
    iconUrl: lottery,
    text: i18n.t("common.lottery"),
    gameType: GameTypeEnum.LOTTERYLOBBY,
  },
  fishing: {
    key: "fishing",
    iconUrl: fishing,
    text: i18n.t("common.fish"),
    gameType: GameTypeEnum.FISH,
  },
  sports: {
    key: "sports",
    iconUrl: sports,
    text: i18n.t("common.sports"),
    gameType: GameTypeEnum.SPORTS,
  },
  sabong: {
    key: "sabong",
    iconUrl: sabong,
    text: i18n.t("common.cockfight"),
    gameType: GameTypeEnum.COCKFIGHT,
  },
  egame: {
    key: "egame",
    iconUrl: egame,
    text: i18n.t("common.eGame"),
    gameType: GameTypeEnum.TABLEGAME,
  },
  cardGame: {
    key: "cardGame",
    iconUrl: cardgame,
    text: i18n.t("common.cardGame"),
    gameType: GameTypeEnum.QIPAILOBBY,
  },
  esports: {
    key: "esports",
    iconUrl: esports,
    text: i18n.t("common.esports"),
    gameType: GameTypeEnum.ESPORTS,
  },
};
