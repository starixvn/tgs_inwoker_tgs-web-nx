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
  [GameTypeEnum.ARCADE]: "Arcade",
  [GameTypeEnum.ARCADELOBBY]: "Arcade",
  [GameTypeEnum.LOTTERY]: "common.lottery",
  [GameTypeEnum.LOTTERYLOBBY]: "common.lottery",
  [GameTypeEnum.SLOT]: "common.slots",
  [GameTypeEnum.TABLEGAME]: "common.egame",
  [GameTypeEnum.COCKFIGHT]: "common.cockfight",
};
export function getGameTypeName(gameType: GameTypeEnum) {
  return gameTypeNameDictionary[gameType];
}
