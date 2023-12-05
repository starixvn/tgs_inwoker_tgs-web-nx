import React, { useMemo } from "react";
import { useForgotPasswordFormStage } from "@tgs-web-nx/core/features";
import { forgotPasswordStageFactory } from "@/components/project/auth/ForgotPasswordForm/ForgotPasswordFormStage/stage/forgotPasswordStageFactory";

const ForgotPasswordFormStage = (Props) => {
  const { currentStage, handleUpdateStage } = useForgotPasswordFormStage();

  const StageComponents = useMemo(() => {
    return forgotPasswordStageFactory[currentStage];
  }, [currentStage]);

  if (!StageComponents) return null;

  return <StageComponents handleUpdateStage={handleUpdateStage} />;
};

export default ForgotPasswordFormStage;
