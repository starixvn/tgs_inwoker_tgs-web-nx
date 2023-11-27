import { useContext } from "react";
import { AuthDialogContext } from "./contexts/authDialogContext";

export const useAuthDialog = () => useContext(AuthDialogContext);
export * from "./contexts/authDialogContext";
export * from "./hooks/useRedirectToRegisterHint";
export * from "./hooks/useRedirectToLoginHint";
