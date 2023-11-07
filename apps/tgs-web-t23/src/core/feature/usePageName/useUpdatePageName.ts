import { usePageName } from "@/core/feature/usePageName";
import { useEffect } from "react";

export function useUpdatePageName(pageName: string) {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(pageName);
  }, []);
}
