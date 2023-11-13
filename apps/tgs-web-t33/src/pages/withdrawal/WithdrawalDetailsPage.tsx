import React from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Details from "@/components/account/WithdrawalPrev/Details";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconWithdrawal from "@/assets/t23/images/badge/icon-withdrawal.svg";
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
