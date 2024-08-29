import DepositNotificationDialog from "../DepositNotificationDialog";
import { DepositFormProvider, FormLayout } from "./components";

/**
 * 存款表單
 */
const DepositForm = () => {
  return (
    <DepositFormProvider>
      <DepositNotificationDialog />
      <FormLayout />
    </DepositFormProvider>
  );
};
export default DepositForm;
