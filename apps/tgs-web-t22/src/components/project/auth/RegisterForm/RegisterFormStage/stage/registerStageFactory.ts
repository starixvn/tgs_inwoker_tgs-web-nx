import { RegisterStageEnum } from "@tgs-web-nx/types";
import CreatePlayerStage from "@/components/project/auth/RegisterForm/RegisterFormStage/stage/CreatePlayerStage";
import InitPhoneStage from "@/components/project/auth/RegisterForm/RegisterFormStage/stage/InitPhoneStage";
import InitEmailStage from "@/components/project/auth/RegisterForm/RegisterFormStage/stage/InitEmailStage";
import SetRealNameStage from "@/components/project/auth/RegisterForm/RegisterFormStage/stage/SetRealNameStage";

export const registerStageFactory = {
  [RegisterStageEnum.CreatePlayer]: CreatePlayerStage,
  [RegisterStageEnum.InitPhone]: InitPhoneStage,
  [RegisterStageEnum.InitEmail]: InitEmailStage,
  [RegisterStageEnum.SetRealName]: SetRealNameStage,
};
