import { useState } from "react";
import { GameTypeEnum } from "@/constants/GameTypeEnum";

export function useGameType() {
  const [activeGameType, setActiveGameType] = useState<GameTypeEnum>(GameTypeEnum.NONE);

  const handleChangeGameType = (gameType: GameTypeEnum) => {
    setActiveGameType(gameType);
  };

  return {
    activeGameType,
    handleChangeGameType,
  };
}
