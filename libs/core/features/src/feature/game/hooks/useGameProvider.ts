import { useState } from "react";

export function useGameProvider() {
  const [activeGameProvider, setActiveGameProvider] = useState<string>("");

  const handleChangeProvider = (provider: string) => {
    setActiveGameProvider(provider);
  };

  return {
    activeGameProvider,
    handleChangeProvider,
  };
}
