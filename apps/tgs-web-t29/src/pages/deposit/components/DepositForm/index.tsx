import config, { brandConfig } from "@tgs-web-nx/config";
import { FormLayout as DefaultFormLayout, DepositFormProvider, MovnFormLayout } from "./components";
import DepositNotificationDialog from "../DepositNotificationDialog";

type BrandName = keyof typeof brandConfig;

/**
 * 存款表單
 */
const DepositForm = () => {
  const renderLayout = () => {
    const brandName: BrandName = config.brand;
    switch (brandName) {
      case "MOMOVN":
      case "MOVN2":
        return <MovnFormLayout />;

      default:
        return <DefaultFormLayout />;
    }
  };

  return (
    <DepositFormProvider>
      <DepositNotificationDialog />
      {/* 對應UI */}
      {renderLayout()}
    </DepositFormProvider>
  );
};
export default DepositForm;
