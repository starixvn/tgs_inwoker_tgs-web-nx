import { RegisterStageEnum } from "@tgs-web-nx/types";
import CreatePlayerStage from "@/components/project/auth/RegisterForm/RegisterFormStage/stage/CreatePlayerStage";
import CreatePlayerStageWithSMSVerifyStage from "@/components/project/auth/RegisterForm/RegisterFormStage/stage/CreatePlayerStageWithSMSVerify";
import InitPhoneStage from "@/components/project/auth/RegisterForm/RegisterFormStage/stage/InitPhoneStage";
import InitEmailStage from "@/components/project/auth/RegisterForm/RegisterFormStage/stage/InitEmailStage";
import SetRealNameStage from "@/components/project/auth/RegisterForm/RegisterFormStage/stage/SetRealNameStage";

export const registerStageFactory = {
  [RegisterStageEnum.CreatePlayer]: CreatePlayerStage,
  [RegisterStageEnum.CreatePlayeWithSMSVerify]: CreatePlayerStageWithSMSVerifyStage,
  [RegisterStageEnum.InitPhone]: InitPhoneStage,
  [RegisterStageEnum.InitEmail]: InitEmailStage,
  [RegisterStageEnum.SetRealName]: SetRealNameStage,
};
