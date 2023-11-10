import React from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { useNotifications } from "@/core/feature/useNotifications";
import Details from "@/core/components/WithdrawalPrev/Details";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import i18n from "@/core/utils/i18n";
import iconWithdrawal from "@/assets/t23/images/badge/icon-withdrawal.svg";
import { useRwd } from "@/core/hooks/tools/useRwd";
import AccountPaper from "@/components/project/AccountPaper";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";

const WithdrawalDetails = () => {
  const history = useHistory();
  const { alert } = useNotifications();
  const location = useLocation<{ order?: string }>();
  const order = location.state?.order || null;
  const { isDesktopSize } = useRwd();

  return (
    <TransferPageContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("common.withdrawal")} iconUrl={iconWithdrawal}>
        <Details appHistory={history} alert={alert} order={order} />
      </AccountPaper>
    </TransferPageContainer>
  );
};

export default WithdrawalDetails;
