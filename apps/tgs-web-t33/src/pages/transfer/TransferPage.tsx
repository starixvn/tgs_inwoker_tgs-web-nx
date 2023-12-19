import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import {
  useAuthContext,
  useNotifications,
  useUpdatePageName,
  useUserWalletInfoContext,
} from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useSnackbar } from "notistack";
import { useGameStore } from "@tgs-web-nx/core";
import TransferPrevV2 from "@/components/account/TransferPrevV2";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconTransfer from "@/assets/t33/images/menuDrawer/icon-transfer.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { PageContainer } from "@/components/styled-component/PageContainer";

const TransferPage = () => {
  useUpdatePageName(i18n.t("transfer.title"));
  const { game } = useGameStore();
  const { isDesktopSize } = useRwd();
  const { alert } = useNotifications();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { isLogin } = useAuthContext();

  const { fetchTransferWalletBalance, fetchBalance } = useUserWalletInfoContext();

  const getAllGameBalance = () => {
    fetchTransferWalletBalance();
  };

  useEffect(() => {
    if (!isLogin) return;
    fetchBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.providerList.length, isLogin]);

  return (
    <PageContainer>
      {isDesktopSize && <UserWalletInfo />}
      <AccountPaper pageName={i18n.t("common.transfer")} iconUrl={iconTransfer}>
        <TransferPrevV2
          alert={alert}
          history={history}
          getAllGameBalance={getAllGameBalance}
          enqueueSnackbar={enqueueSnackbar}
        />
      </AccountPaper>
    </PageContainer>
  );
};

export default TransferPage;
