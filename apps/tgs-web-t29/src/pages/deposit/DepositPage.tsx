import { i18n } from "@tgs-web-nx/utils";
import { useDepositPage, useRwd } from "@tgs-web-nx/core/hooks";
import { useNotifications } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router-dom";
import DepositForm from "./components/DepositForm";
import DepositPrev from "@/components/account/DepositPrev";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconDeposit from "@/assets/t29/images/account/navItem/icon-deposit.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";



const DepositPage = () => {
  useDepositPage();
  
  const history = useHistory();
  const { alert } = useNotifications();
  const { isDesktopSize } = useRwd();
  
  
  
  return (
    <TransferPageContainer>
      {isDesktopSize && <UserWalletInfo />}
      <AccountPaper pageName={i18n.t("common.deposit")} iconUrl={iconDeposit}>
        <DepositPrev appHistory={history} alert={alert} />
        <DepositForm />
      </AccountPaper>
    </TransferPageContainer>
  );
};

export default DepositPage;
