import React, { createContext, useCallback, useMemo, useState } from "react";
import { ForgotPasswordStageEnum, ValueOf } from "@tgs-web-nx/types";

const initialState: {
  currentStage: ValueOf<typeof ForgotPasswordStageEnum>;
  handleUpdateStage: (nextStage: ValueOf<typeof ForgotPasswordStageEnum>, payload: any) => void;
  code: string;
  securityKey: string;
} = {
  currentStage: ForgotPasswordStageEnum.VerifyPhone,
  handleUpdateStage: () => {},
  code: "",
  securityKey: "",
};

export const ForgotPasswordStageContext = createContext({
  ...initialState,
});

type ProviderProps = {
  children: React.ReactNode;
};

export const ForgotPasswordStageContextProvider = ({ children }: ProviderProps) => {
  const initialStage = useMemo(() => {
    // return ForgotPasswordStageEnum.VerifyPhone;
    return ForgotPasswordStageEnum.NewPassword;
  }, []);
  const [currentStage, setCurrentStage] = useState(initialStage);

  const [code, setCode] = useState("");
  const [securityKey, setSecurityKey] = useState("");

  const handleUpdateStage = useCallback(
    (nextStage: ValueOf<typeof ForgotPasswordStageEnum>, payload: any) => {
      setCode(payload.code);
      setSecurityKey(payload.securityKey);

      setCurrentStage(nextStage);
    },
    [],
  );

  return (
    <ForgotPasswordStageContext.Provider
      value={{
        currentStage,
        handleUpdateStage,
        code,
        securityKey,
      }}
    >
      {children}
    </ForgotPasswordStageContext.Provider>
  );
};
