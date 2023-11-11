import { useState } from "react";

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
