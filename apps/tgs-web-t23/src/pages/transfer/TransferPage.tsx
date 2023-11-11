import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import TransferPrev from "@/core/components/TransferPrev";
import { useNotifications } from "@/core/feature/useNotifications";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconTransfer from "@/assets/t23/images/badge/icon-transfer.svg";
import { useRwd } from "@/core/hooks/tools/useRwd";
import AccountPaper from "@/components/project/AccountPaper";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import { PageContainer } from "@/components/styled-component/PageContainer";

const Transfer = () => {
  useUpdatePageName(i18n.t("transfer.title"));
  const { isDesktopSize } = useRwd();

  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <PageContainer>
      {isDesktopSize && <UserWalletInfo />}
      <AccountPaper pageName={i18n.t("common.transfer")} iconUrl={iconTransfer}>
        <TransferPrev alert={alert} history={history} />
      </AccountPaper>
    </PageContainer>
  );
};

export default Transfer;
