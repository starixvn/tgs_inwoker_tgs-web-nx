import { useState } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";

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
