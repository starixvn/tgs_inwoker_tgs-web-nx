import { GameTypeEnum } from "@tgs-web-nx/constants";

const gameTypeNameDictionary = {
  [GameTypeEnum.NONE]: "common.home",
  [GameTypeEnum.SPORTS]: "common.sports",
  [GameTypeEnum.RNGSPORTS]: "common.sports",
  [GameTypeEnum.RNGSPORTSLOBBY]: "common.sports",
  [GameTypeEnum.ESPORTS]: "common.esports",
  [GameTypeEnum.LIVE]: "common.live",
  [GameTypeEnum.LIVELOBBY]: "common.live",
  [GameTypeEnum.QIPAI]: "common.chess",
  [GameTypeEnum.QIPAILOBBY]: "common.chess",
  [GameTypeEnum.FISH]: "common.fish",
  [GameTypeEnum.FISHLOBBY]: "common.fish",
  [GameTypeEnum.ARCADE]: "common.arcade",
  [GameTypeEnum.ARCADELOBBY]: "common.arcade",
  [GameTypeEnum.LOTTERY]: "common.lottery",
  [GameTypeEnum.LOTTERYLOBBY]: "common.lottery",
  [GameTypeEnum.SLOT]: "common.slots",
  [GameTypeEnum.TABLEGAME]: "common.tableGame",
  [GameTypeEnum.COCKFIGHT]: "common.cockfight",
  [GameTypeEnum.INSTANTPLAY]: "common.instantPlay",
  [GameTypeEnum.CASINO]: "common.casino",
  [GameTypeEnum.KENO]: "common.keno",
  [GameTypeEnum.BINGO]: "common.bingo",
  [GameTypeEnum.RACING]: "common.racing",
  [GameTypeEnum.ALL]: "Provider",
  [GameTypeEnum.HOT_GAMES]: "Hot Games",
  [GameTypeEnum.NEW_GAMES]: "New Games",
};
export function getGameTypeName(gameType: GameTypeEnum) {
  return gameTypeNameDictionary[gameType];
}
