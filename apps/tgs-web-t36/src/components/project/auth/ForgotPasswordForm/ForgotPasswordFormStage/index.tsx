import React, { useMemo } from "react";
import { useForgotPasswordFormStage } from "@tgs-web-nx/core/features";
import { forgotPasswordStageFactory } from "./stage/forgotPasswordStageFactory";

const ForgotPasswordFormStage = () => {
  const { currentStage, handleUpdateStage } = useForgotPasswordFormStage();

  const StageComponents = useMemo(() => {
    return forgotPasswordStageFactory[currentStage];
  }, [currentStage]);

  if (!StageComponents) return null;

  //@ts-ignore
  return <StageComponents handleUpdateStage={handleUpdateStage} />;
};

export default ForgotPasswordFormStage;
