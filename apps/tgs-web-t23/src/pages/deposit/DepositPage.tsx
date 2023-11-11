import React from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications } from "@/core/feature/useNotifications";
import DepositPrev from "@/core/components/DepositPrev";
import { useRwd } from "@/core/hooks/tools/useRwd";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconDeposit from "@/assets/t23/images/badge/icon-deposit.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";

const DepositPage = () => {
  useUpdatePageName(i18n.t("common.deposit"));

  const history = useHistory();
  const { alert } = useNotifications();
  const location = useLocation<{ order?: string }>();
  const { isDesktopSize } = useRwd();
  const order = location.state?.order || null;

  return (
    <TransferPageContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("common.deposit")} iconUrl={iconDeposit}>
        <DepositPrev appHistory={history} alert={alert} order={order} />
      </AccountPaper>
    </TransferPageContainer>
  );
};

export default DepositPage;
