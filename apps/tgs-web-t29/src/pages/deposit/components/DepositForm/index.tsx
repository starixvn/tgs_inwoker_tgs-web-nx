import { FormLayout, DepositFormProvider } from "./components";

/**
 * 存款表單
 */
const DepositForm = () => (
  <DepositFormProvider>
    {/* 對應UI */}
    <FormLayout />
  </DepositFormProvider>
);

export default DepositForm;
