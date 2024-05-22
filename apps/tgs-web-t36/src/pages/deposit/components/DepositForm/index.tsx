import { DepositFormProvider, FormLayout } from "./components";


/**
 * 存款表單
 */
const DepositForm = () => { 
  return (
    <DepositFormProvider>
      <FormLayout />
    </DepositFormProvider>
  );
}
export default DepositForm;
