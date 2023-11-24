import { useState } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";

export function useNavPopupGameType() {
  const [activeNavPopupGameType, setActiveNavPopupGameType] = useState<GameTypeEnum>(GameTypeEnum.NONE);

  const handleChangeNavPopupGameType = (gameType: GameTypeEnum) => {
    setActiveNavPopupGameType(gameType);
  };

  return {
    activeNavPopupGameType,
    handleChangeNavPopupGameType,
  };
}
