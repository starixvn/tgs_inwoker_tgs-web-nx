import { RegisterStageEnum } from "@tgs-web-nx/types";
import CreatePlayerStageWithSMSVerifyStage from "./CreatePlayerStageWithSMSVerify";
import CreatePlayerStage from "@/components/project/auth/RegisterForm/RegisterFormStage/stage/CreatePlayerStage";
import InitPhoneStage from "@/components/project/auth/RegisterForm/RegisterFormStage/stage/InitPhoneStage";
import InitEmailStage from "@/components/project/auth/RegisterForm/RegisterFormStage/stage/InitEmailStage";

export const registerStageFactory = {
  [RegisterStageEnum.CreatePlayer]: CreatePlayerStage,
  [RegisterStageEnum.CreatePlayeWithSMSVerify]: CreatePlayerStageWithSMSVerifyStage,
  [RegisterStageEnum.InitPhone]: InitPhoneStage,
  [RegisterStageEnum.InitEmail]: InitEmailStage,
};
