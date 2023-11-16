import { useContext } from "react";
import { RouteContext } from "./contexts/routeContext";

export const useRoute = () => useContext(RouteContext);

export * from "./contexts/routeContext";
