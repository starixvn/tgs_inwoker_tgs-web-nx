import { useState } from "react";
import { GameTypeEnum } from "@/core/constants/GameTypeEnum";

export function useGpCode() {
  const [gpCode, setGpCode] = useState<string>("");

  const handleChangeGpCode = (gpCode: string) => {
    setGpCode(gpCode);
  };

  return {
    gpCode,
    handleChangeGpCode,
  };
}
