import { useState } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";

export function useNavPopupGameType() {
  const [activeNavPopupGameType, setActiveNavPopupGameType] = useState<GameTypeEnum>(GameTypeEnum.NONE);
  const [isHovered, setIsHovered] = useState(false);

  const handleChangeNavPopupGameType = (gameType: GameTypeEnum) => {
    setActiveNavPopupGameType(gameType);
  };

  return {
    activeNavPopupGameType,
    handleChangeNavPopupGameType,
    isHovered,
    setIsHovered
  };
}
