import { useContext } from "react";
import { HomeGameContext } from "@/core/feature/game/contexts/homeGameContext";

export const useHomeGameContext = () => useContext(HomeGameContext);
