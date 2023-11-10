import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications } from "@/core/feature/useNotifications";
import Payment from "@/core/components/DepositPrev/Payment";
import { useRwd } from "@/core/hooks/tools/useRwd";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconDeposit from "@/assets/t23/images/badge/icon-deposit.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";

const DepositPaymentPage = () => {
  const { isDesktopSize } = useRwd();
  const history = useHistory();
  const { alert } = useNotifications();

  return (
    <TransferPageContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("common.deposit")} iconUrl={iconDeposit}>
        {/*@ts-ignore*/}
        <Payment appHistory={history} alert={alert} />
      </AccountPaper>
    </TransferPageContainer>
  );
};

export default DepositPaymentPage;
