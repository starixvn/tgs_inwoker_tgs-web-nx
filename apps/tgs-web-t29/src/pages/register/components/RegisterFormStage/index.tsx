import React, { useMemo } from "react";
import { RegisterStageEnum } from "@tgs-web-nx/types";
import { registerStageFactory } from "@/pages/register/components/RegisterFormStage/stage/registerStageFactory";

const RegisterFormStage = () => {
  const currentStage = RegisterStageEnum.CreatePlayer;

  const StageComponents = useMemo(() => {
    return registerStageFactory[currentStage];
  }, [currentStage]);

  return <StageComponents />;
};

export default RegisterFormStage;
