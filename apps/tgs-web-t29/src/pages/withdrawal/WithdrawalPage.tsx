import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications } from "@tgs-web-nx/core/features";
import { useRwd, useWithdrawalPage } from "@tgs-web-nx/core/hooks";
import WithdrawalPrev from "@/components/account/WithdrawalPrev";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconWithdrawal from "@/assets/t29/images/account/navItem/icon-withdraw.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";

const WithdrawalPage = () => {
  useWithdrawalPage();

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

export default WithdrawalPage;
