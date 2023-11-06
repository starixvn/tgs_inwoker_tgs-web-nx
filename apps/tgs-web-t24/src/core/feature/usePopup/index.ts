import { useContext } from "react";
import { PopupContext } from "@/core/feature/usePopup/contexts/popupContext";

export const usePopup = () => useContext(PopupContext);
