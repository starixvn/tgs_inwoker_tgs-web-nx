import { i18n } from "@tgs-web-nx/utils";
import { useDepositPage, useRwd } from "@tgs-web-nx/core/hooks";
import DepositForm from "./components/DepositForm";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconDeposit from "@/assets/t29/images/account/navItem/icon-deposit.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";

const DepositPage = () => {
  useDepositPage();
  const { isDesktopSize } = useRwd();

  return (
    <TransferPageContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("common.deposit")} iconUrl={iconDeposit}>
        <DepositForm />
      </AccountPaper>
    </TransferPageContainer>
  );
};

export default DepositPage;
