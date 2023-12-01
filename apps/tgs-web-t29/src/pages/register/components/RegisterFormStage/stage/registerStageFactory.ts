import CreatePlayerStage from "@/pages/register/components/RegisterFormStage/stage/CreatePlayerStage";
import InitPhoneStage from "@/pages/register/components/RegisterFormStage/stage/InitPhoneStage";
import InitEmailStage from "@/pages/register/components/RegisterFormStage/stage/InitEmailStage";
import { RegisterStageEnum } from "@/pages/register/components/RegisterFormStage/types";

export const registerStageFactory = {
  [RegisterStageEnum.CreatePlayer]: CreatePlayerStage,
  [RegisterStageEnum.InitPhone]: InitPhoneStage,
  [RegisterStageEnum.InitEmail]: InitEmailStage,
};
