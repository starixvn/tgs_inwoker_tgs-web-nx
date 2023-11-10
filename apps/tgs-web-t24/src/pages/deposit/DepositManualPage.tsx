import { useHistory } from "react-router-dom";
import iconDeposit from "@/assets/t23/images/badge/icon-deposit.svg";
import AccountPaper from "@/components/project/AccountPaper";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import Manual from "@/core/components/DepositPrev/Manual";
import { useNotifications } from "@/core/feature/useNotifications";
import { useRwd } from "@/core/hooks/tools/useRwd";
import i18n from "@/utils/i18n";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";

const DepositManualPage = () => {
  const { isDesktopSize } = useRwd();
  const history = useHistory();
  const { alert } = useNotifications();

  return (
    <TransferPageContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("common.deposit")} iconUrl={iconDeposit}>
        <Manual appHistory={history} alert={alert} />
      </AccountPaper>
    </TransferPageContainer>
  );
};

export default DepositManualPage;
