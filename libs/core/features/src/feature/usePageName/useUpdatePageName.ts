import { useEffect } from "react";
import { usePageName } from './index';

export function useUpdatePageName(pageName: string) {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(pageName);
  }, []);
}
