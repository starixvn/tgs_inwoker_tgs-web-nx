import React, { useCallback, useMemo, useState } from "react";
import { ValueOf } from "@tgs-web-nx/types";
import { useAuth } from "@tgs-web-nx/core/features";
import { registerStageFactory } from "@/pages/register/components/RegisterFormStage/stage/registerStageFactory";
import { RegisterStageEnum } from "@/pages/register/components/RegisterFormStage/types";

type Props = {
  initialRegisterStage: ValueOf<typeof RegisterStageEnum>;
};
const RegisterFormStage = ({ initialRegisterStage }: Props) => {
  const [currentStage, setCurrentStage] =
    useState<ValueOf<typeof RegisterStageEnum>>(initialRegisterStage);

  const updateStage = useCallback((newStage: ValueOf<typeof RegisterStageEnum>) => {
    setCurrentStage(newStage);
  }, []);

  const StageComponents = useMemo(() => {
    return registerStageFactory[currentStage];
  }, [currentStage]);

  return <StageComponents updateStage={updateStage} />;
};

export default RegisterFormStage;
