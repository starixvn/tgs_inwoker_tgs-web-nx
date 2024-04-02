import { ReactNode, createContext, useState } from "react"
import { DepositFormData } from "../types";

type Props = {
  children: ReactNode,
}

type DispatchFormData = (value: FormState) => void
type Amount = {
  maxAmount: number;
  minAmount: number;
}


export type FormState = DepositFormData & Amount
type DepositFormContextState = {formData: FormState, setFormData: DispatchFormData}

const defaultState: FormState = {
  amount: '',
  paymentid: '',
  promotionid: '',
  paymentcode: '',
  type: '',
  maxAmount: 0,
  minAmount: 0,
  id: '',
  account: '',
  name: '',
  files: null,
  phone: '',
  eMoneyName: '',
  realname: '',
  address: '',
}

export const DepositFormContext = createContext<DepositFormContextState>({
  formData: defaultState,
  setFormData: () => {},
});

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
