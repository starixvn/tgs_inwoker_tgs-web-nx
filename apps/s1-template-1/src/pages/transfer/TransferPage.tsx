import iconTransfer from "@/assets/t29/images/account/navItem/icon-transfer.svg";
import TransferPrevV2 from "@/components/account/TransferPrevV2";
import AccountPaper from "@/components/project/AccountPaper";
import MenuTabs from "@/components/project/MenuTabs";
import { PageContainer } from "@/components/styled-component/PageContainer";
import { useNotifications } from "@tgs-web-nx/core/features";
import { useRwd, useTransferPage } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

const TransferPage = () => {
  const { getAllGameBalance } = useTransferPage();

  const { isDesktopSize } = useRwd();
  const { alert } = useNotifications();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <PageContainer>
      {/* {isDesktopSize && <UserWalletInfo />} */}
      {isDesktopSize && <MenuTabs />}
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
