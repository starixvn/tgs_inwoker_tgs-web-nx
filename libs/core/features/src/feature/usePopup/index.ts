import { useContext } from "react";
import { PopupContext } from "./contexts/popupContext";

export const usePopup = () => useContext(PopupContext);
export * from "./contexts/popupContext";
export * from "./hooks/index";
