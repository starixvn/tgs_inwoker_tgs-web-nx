import { useState } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";

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
