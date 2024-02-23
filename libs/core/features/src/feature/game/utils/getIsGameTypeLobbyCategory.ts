import { GameTypeEnum } from "@tgs-web-nx/constants";

const lobbyCategoryGameTypeList = [
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.ARCADELOBBY,
  GameTypeEnum.SPORTS,
  GameTypeEnum.COCKFIGHT,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.QIPAILOBBY,
  GameTypeEnum.LOTTERYLOBBY,
];

export function getIsGameTypeLobbyCategory(gameType: GameTypeEnum) {
  return lobbyCategoryGameTypeList.includes(gameType);
}
