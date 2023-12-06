import { useContext } from "react";
import { ForgotPasswordStageContext } from "./contexts/forgotPasswordFormContext";

export const useForgotPasswordFormStage = () => useContext(ForgotPasswordStageContext);
export * from "./contexts/forgotPasswordFormContext";
