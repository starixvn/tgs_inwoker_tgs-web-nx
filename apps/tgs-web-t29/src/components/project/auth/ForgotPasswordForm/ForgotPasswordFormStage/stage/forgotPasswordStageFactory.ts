import { ForgotPasswordStageEnum } from "@tgs-web-nx/types";
import VerifyPhoneStage from "@/components/project/auth/ForgotPasswordForm/ForgotPasswordFormStage/stage/VerifyPhoneStage";
import VerifyEmailStage from "@/components/project/auth/ForgotPasswordForm/ForgotPasswordFormStage/stage/VerifyEmailStage";
import NewPasswordStage from "@/components/project/auth/ForgotPasswordForm/ForgotPasswordFormStage/stage/NewPasswordStage";

export const forgotPasswordStageFactory = {
  [ForgotPasswordStageEnum.VerifyPhone]: VerifyPhoneStage,
  [ForgotPasswordStageEnum.VerifyEmail]: VerifyEmailStage,
  [ForgotPasswordStageEnum.NewPassword]: NewPasswordStage,
};
