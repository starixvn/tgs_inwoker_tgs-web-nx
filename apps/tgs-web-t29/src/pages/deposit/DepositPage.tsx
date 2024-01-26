import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useHomeGameContext, useNotifications } from "@tgs-web-nx/core/features";
import { useDepositPage, useRwd } from "@tgs-web-nx/core/hooks";
import DepositPrev from "@/components/account/DepositPrev";
import DepositPrevMOVN from "@/components/account/DepositPrevMoVN";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconDeposit from "@/assets/t29/images/account/navItem/icon-deposit.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";

const DepositPage = () => {
  useDepositPage();
  const history = useHistory();
  const { alert } = useNotifications();
  const { isDesktopSize } = useRwd();
  const { isCustomizedBrand } = useHomeGameContext();

  return (
    <TransferPageContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("common.deposit")} iconUrl={iconDeposit}>
        {isCustomizedBrand ? (
          <DepositPrevMOVN appHistory={history} alert={alert} />
        ) : (
          <DepositPrev appHistory={history} alert={alert} />
        )}
      </AccountPaper>
    </TransferPageContainer>
  );
};

export default DepositPage;
