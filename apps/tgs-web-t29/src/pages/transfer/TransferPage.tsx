import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import {
  useNotifications,
  useUpdatePageName,
  useUserWalletInfoContext,
} from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import TransferPrevV2 from "@/components/account/TransferPrevV2";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconTransfer from "@/assets/t29/images/account/navItem/icon-transfer.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { PageContainer } from "@/components/styled-component/PageContainer";

const Transfer = () => {
  useUpdatePageName(i18n.t("transfer.title"));
  const { isDesktopSize } = useRwd();

  const { alert } = useNotifications();
  const history = useHistory();

  const { fetchTransferWalletBalance } = useUserWalletInfoContext();

  const getAllGameBalance = () => {
    fetchTransferWalletBalance();
  };

  return (
    <PageContainer>
      {isDesktopSize && <UserWalletInfo />}
      <AccountPaper pageName={i18n.t("common.transfer")} iconUrl={iconTransfer}>
        <TransferPrevV2 alert={alert} history={history} getAllGameBalance={getAllGameBalance} />
      </AccountPaper>
    </PageContainer>
  );
};

export default Transfer;
