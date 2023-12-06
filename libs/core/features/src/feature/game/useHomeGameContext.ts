import { useContext } from "react";
import { HomeGameContext } from "./contexts/homeGameContext";

export const useHomeGameContext = () => useContext(HomeGameContext);
export * from "./contexts/homeGameContext";
