import React, { useMemo } from "react";
import { RegisterStageEnum, ValueOf } from "@tgs-web-nx/types";
import { registerStageFactory } from "./stage/registerStageFactory";

type Props = {
  currentStage: ValueOf<typeof RegisterStageEnum>;
};
const RegisterFormStage = ({ currentStage }: Props) => {
  const StageComponents = useMemo(() => {
    return registerStageFactory[currentStage];
  }, [currentStage]);

  if (!StageComponents) return null;

  return <StageComponents />;
};

export default RegisterFormStage;
