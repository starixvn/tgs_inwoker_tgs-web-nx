import React from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/core/feature/useNotifications";
import Details from "@/core/components/DepositPrev/Details";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import { useRwd } from "@/core/hooks/tools/useRwd";
import i18n from "@/utils/i18n";
import iconDeposit from "@/assets/t23/images/badge/icon-deposit.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";

const DepositDetailsPage = () => {
  const history = useHistory();
  const { alert } = useNotifications();
  const { isDesktopSize } = useRwd();

  return (
    <TransferPageContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("common.deposit")} iconUrl={iconDeposit}>
        {/*@ts-ignore*/}
        <Details appHistory={history} alert={alert} />
      </AccountPaper>
    </TransferPageContainer>
  );
};

export default DepositDetailsPage;
