import iconDeposit from "@/assets/t29/images/account/navItem/icon-deposit.svg";
import DepositPrev from "@/components/account/DepositPrev";
import AccountPaper from "@/components/project/AccountPaper";
import MenuTabs from "@/components/project/MenuTabs";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";
import { useNotifications } from "@tgs-web-nx/core/features";
import { useDepositPage, useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";

const DepositPage = () => {
  useDepositPage();
  const history = useHistory();
  const { alert } = useNotifications();
  const { isDesktopSize } = useRwd();

  return (
    <TransferPageContainer>
      {/* {isDesktopSize && <UserWalletInfo />} */}
      {isDesktopSize && <MenuTabs />}
      <AccountPaper pageName={i18n.t("common.deposit")} iconUrl={iconDeposit}>
        <DepositPrev appHistory={history} alert={alert} />
      </AccountPaper>
    </TransferPageContainer>
  );
};

export default DepositPage;
