import { useContext } from "react";
import { PageNameContext } from "./contexts/pageNameContext";

export const usePageName = () => useContext(PageNameContext);
export * from "./contexts/pageNameContext";
export * from "./useUpdatePageName";
