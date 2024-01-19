import { useMemo } from "react";
import { useRwd } from "@tgs-web-nx/core/hooks";

export function useCardWidth(gap = "10px") {
  const { isLargeDesktopSize, isDesktopSize } = useRwd();

  return useMemo(() => {
    if (isLargeDesktopSize) return `calc((100% - ${gap} * 5)/6)`;

    if (isDesktopSize) return `calc((100% - ${gap} * 3)/4)`;

    return `calc((100% - ${gap} * 2)/3)`;
  }, [isLargeDesktopSize, isDesktopSize]);
}
