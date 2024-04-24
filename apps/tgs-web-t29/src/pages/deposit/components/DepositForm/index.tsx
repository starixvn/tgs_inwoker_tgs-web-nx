import config, {brandConfig} from "@tgs-web-nx/config";
import { FormLayout as DefaultFormLayout, DepositFormProvider, MovnFormLayout } from "./components";

type BrandName = keyof typeof brandConfig;

/**
 * 存款表單
 */
const DepositForm = () =>{ 
  const renderLayout = () => {
    const brandName: BrandName = config.brand;
    switch (brandName) {
      case 'GPI':
      case 'MOVN2':
        return <MovnFormLayout />
    
      default:
        return <DefaultFormLayout />;
    }
  };


  return (
    <DepositFormProvider>
      {/* 對應UI */}
      {renderLayout()}
    </DepositFormProvider>
  );
}
export default DepositForm;
