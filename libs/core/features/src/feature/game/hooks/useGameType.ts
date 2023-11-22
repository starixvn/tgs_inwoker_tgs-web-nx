import { useState } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useRwd } from "@tgs-web-nx/core/hooks";

export function useGameType() {
  const { isMobileSize } = useRwd();
  const [activeGameType, setActiveGameType] = useState<GameTypeEnum>(isMobileSize ? GameTypeEnum.SPORTS : GameTypeEnum.NONE);

  const handleChangeGameType = (gameType: GameTypeEnum) => {
    setActiveGameType(gameType);
  };

  return {
    activeGameType,
    handleChangeGameType,
  };
}
