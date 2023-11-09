import { useEffect } from "react";
import { usePageName } from "@/core/feature/usePageName";

export function useUpdatePageName(pageName: string) {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(pageName);
  }, []);
}
