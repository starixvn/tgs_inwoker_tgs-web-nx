//@ts-nocheck
import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useShowAddCardButton } from "@tgs-web-nx/core/features";
import { useRwd, useWithdrawalPage } from "@tgs-web-nx/core/hooks";
import { useSnackbar } from "notistack";
import { useWalletStore } from "@tgs-web-nx/core";
import WithdrawalPrevV2 from "@/components/account/WithdrawalPrevV2";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconWithdrawal from "@/assets/t26/images/account/navItem/icon-withdraw.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";
import PageBadge from "@/components/project/AccountPaper/components/PageBadge";

const WithdrawalPage = () => {
  useWithdrawalPage();

  const history = useHistory();
  const { alert } = useNotifications();
  const { isDesktopSize } = useRwd();
  const { enqueueSnackbar } = useSnackbar();
  const {
    wallet: { bankCardList },
  } = useWalletStore();

  const { isManageCardButtonAvailable, isShowAddCardButton } = useShowAddCardButton(bankCardList);

  return (
    <TransferPageContainer>
      {isDesktopSize && <UserWalletInfo />}
      {isDesktopSize && <PageBadge iconUrl={iconWithdrawal} text={i18n.t("common.withdrawal")} />}

      <AccountPaper>
        <WithdrawalPrevV2
          appHistory={history}
          alert={alert}
          enqueueSnackbar={enqueueSnackbar}
          isManageCardButtonAvailable={isManageCardButtonAvailable}
          isAddCardAvailable={isShowAddCardButton}
        />
      </AccountPaper>
    </TransferPageContainer>
  );
};

export default WithdrawalPage;
