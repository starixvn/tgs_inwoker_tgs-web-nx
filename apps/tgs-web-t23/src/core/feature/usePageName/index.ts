import { useContext } from "react";
import { PageNameContext } from "@/core/feature/usePageName/contexts/pageNameContext";

export const usePageName = () => useContext(PageNameContext);
