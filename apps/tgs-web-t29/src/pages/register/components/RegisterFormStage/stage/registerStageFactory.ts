import { RegisterStageEnum } from "@tgs-web-nx/types";
import CreatePlayerStage from "@/pages/register/components/RegisterFormStage/stage/CreatePlayerStage";
import InitPhoneStage from "@/pages/register/components/RegisterFormStage/stage/InitPhoneStage";
import InitEmailStage from "@/pages/register/components/RegisterFormStage/stage/InitEmailStage";

export const registerStageFactory = {
  [RegisterStageEnum.CreatePlayer]: CreatePlayerStage,
  [RegisterStageEnum.InitPhone]: InitPhoneStage,
  [RegisterStageEnum.InitEmail]: InitEmailStage,
};
