import { i18n } from "@tgs-web-nx/utils";
import { useDepositPage, useRwd } from "@tgs-web-nx/core/hooks";
import DepositForm from "./components/DepositForm";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconDeposit from "@/assets/t18/images/account/badge/icon-deposit.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";
import TransferTabs from "@/pages/deposit/components/TransferTabs";

const DepositPage = () => {
  useDepositPage();
  const { isDesktopSize } = useRwd();

  return (
    <TransferPageContainer>
      {isDesktopSize && <UserWalletInfo />}
      {!isDesktopSize && <TransferTabs />}

      <AccountPaper pageName={i18n.t("common.deposit")} iconUrl={iconDeposit}>
        <DepositForm />
      </AccountPaper>
    </TransferPageContainer>
  );
};

export default DepositPage;
