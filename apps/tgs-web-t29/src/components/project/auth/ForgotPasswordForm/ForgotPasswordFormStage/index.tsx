import React, { useMemo } from "react";
import { RegisterStageEnum, ValueOf } from "@tgs-web-nx/types";
import { forgotPasswordStageFactory } from "@/components/project/auth/ForgotPasswordForm/ForgotPasswordFormStage/stage/forgotPasswordStageFactory";

type Props = {
  currentStage: ValueOf<typeof RegisterStageEnum>;
};
const ForgotPasswordFormStage = ({ currentStage }: Props) => {
  const StageComponents = useMemo(() => {
    return forgotPasswordStageFactory[currentStage];
  }, [currentStage]);

  if (!StageComponents) return null;

  return <StageComponents />;
};

export default ForgotPasswordFormStage;
