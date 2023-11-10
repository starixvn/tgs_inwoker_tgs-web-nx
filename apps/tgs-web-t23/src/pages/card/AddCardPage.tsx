import React from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/core/feature/useNotifications";
import AddCardPrev from "@/core/components/CardPrev/AddCardPrev";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import i18n from "@/utils/i18n";
import iconWithdrawal from "@/assets/t23/images/badge/icon-withdrawal.svg";
import { useRwd } from "@/core/hooks/tools/useRwd";
import AccountPaper from "@/components/project/AccountPaper";
import { PageContainer } from "@/components/styled-component/PageContainer";

const AddCardPage = () => {
  const history = useHistory();
  const { alert } = useNotifications();
  const { isDesktopSize } = useRwd();

  return (
    <PageContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("common.withdrawal")} iconUrl={iconWithdrawal}>
        <AddCardPrev appHistory={history} alert={alert} />
      </AccountPaper>
    </PageContainer>
  );
};

export default AddCardPage;
