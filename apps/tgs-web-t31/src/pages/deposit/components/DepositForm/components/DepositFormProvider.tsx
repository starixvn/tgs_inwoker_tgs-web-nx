import { ReactNode, useState } from "react"
import { defaultState, DepositFormContext } from "@tgs-web-nx/core/hooks";

type Props = {
  children: ReactNode,
}

/**
 * 存款表單共用狀態 Provider
 */
export const DepositFormProvider = ({
  children
}: Props) => {
  const [formData, setFormData] = useState(defaultState);
  
  return (
    <DepositFormContext.Provider value={{formData, setFormData}}>
      {children}
    </DepositFormContext.Provider>
  );
};
