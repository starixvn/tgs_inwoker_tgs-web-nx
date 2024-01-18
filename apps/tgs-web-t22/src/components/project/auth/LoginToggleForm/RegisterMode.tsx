import { RegisterStageEnum } from "@tgs-web-nx/types";
import RegisterFormStage from "../RegisterForm/RegisterFormStage";

export const RegisterMode = () => <RegisterFormStage currentStage={RegisterStageEnum.CreatePlayer} />;  