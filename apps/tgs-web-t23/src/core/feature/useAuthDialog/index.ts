import { useContext } from "react";
import { AuthDialogContext } from "@/core/feature/useAuthDialog/contexts/authDialogContext";

export const useAuthDialog = () => useContext(AuthDialogContext);
