import { useState } from "react";

export function useGameProvider() {
  const [activeGameProvider, setActiveGameProvider] = useState<string>("");

  const handleChangeProvider = (providerCode: string) => {
    setActiveGameProvider(providerCode);
  };

  return {
    activeGameProvider,
    handleChangeProvider,
  };
}
