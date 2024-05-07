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
  //因修改密碼流程重構,不再有VerifyPhone這個stage https://raypro.atlassian.net/browse/TGS-4619
  //避免影響舊有的修改密碼流程code,在各個templete決定顯示哪個Stage(VerifyPhone.tsx這個檔案)
  //如果沒有在useEffect呼叫handleUpdateStage(ex:t36),預設會是VerifyPhone
  //todo:全templete修改至新的修改密碼流程
  const initialStage = useMemo(() => {
    return ForgotPasswordStageEnum.VerifyPhone;
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
