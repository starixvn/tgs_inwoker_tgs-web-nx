//@ts-nocheck
import WithdrawalPrevV2 from "@/components/account/WithdrawalPrevV2";
import AccountPaper from "@/components/project/AccountPaper";
import MenuTabs from "@/components/project/MenuTabs";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";
import { useWalletStore } from "@tgs-web-nx/core";
import { useNotifications, useShowAddCardButton } from "@tgs-web-nx/core/features";
import { useRwd, useWithdrawalPage } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

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
      {/* {isDesktopSize && <UserWalletInfo />} */}
      {isDesktopSize && <MenuTabs />}
      <AccountPaper pageName={i18n.t("common.withdrawal")} iconUrl={""}>
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
