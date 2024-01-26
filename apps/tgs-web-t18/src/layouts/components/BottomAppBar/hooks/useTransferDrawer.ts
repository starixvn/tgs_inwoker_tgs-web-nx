import { useEffect, useState } from "react";
import { useRwd } from "@tgs-web-nx/core/hooks";

export function useTransferDrawer() {
  const [isTransferDrawerOpen, setIsTransferDrawerOpen] = useState(false);
  const { isDesktopSize } = useRwd();

  const handleTransferDrawerToggle = (isOpen?: boolean) => {
    if (typeof isOpen === "boolean") {
      return setIsTransferDrawerOpen(isOpen);
    }

    setIsTransferDrawerOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (isDesktopSize) {
      return handleTransferDrawerToggle(false);
    }
  }, [isDesktopSize]);

  return {
    isTransferDrawerOpen,
    handleTransferDrawerToggle,
  };
}
