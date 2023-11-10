import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import WithdrawalPrev from "@/core/components/WithdrawalPrev";
import { useNotifications } from "@/core/feature/useNotifications";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import { useRwd } from "@/core/hooks/tools/useRwd";
import iconWithdrawal from "@/assets/t23/images/badge/icon-withdrawal.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";

const Withdrawal = () => {
  useUpdatePageName(i18n.t("common.withdrawal"));

  const history = useHistory();
  const { alert } = useNotifications();
  const { isDesktopSize } = useRwd();

  return (
    <TransferPageContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("common.withdrawal")} iconUrl={iconWithdrawal}>
        <WithdrawalPrev appHistory={history} alert={alert} />
      </AccountPaper>
    </TransferPageContainer>
  );
};

export default Withdrawal;
