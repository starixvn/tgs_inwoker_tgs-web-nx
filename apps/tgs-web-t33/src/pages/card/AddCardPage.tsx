import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import AddCardPrev from "@/components/account/CardPrev/AddCardPrev";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconWithdrawal from "@/assets/t33/images/menuDrawer/icon-withdrawal.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { PageContainer } from "@/components/styled-component/PageContainer";

const AddCardPage = () => {
  useUpdatePageName(i18n.t("card.msgAddCard"));

  const history = useHistory();
  const { alert } = useNotifications();
  const { isDesktopSize } = useRwd();

  return (
    <PageContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("card.msgAddCard")} iconUrl={iconWithdrawal}>
        <AddCardPrev appHistory={history} alert={alert} />
      </AccountPaper>
    </PageContainer>
  );
};

export default AddCardPage;
