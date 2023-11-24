import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Report from "@/components/account/Report";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconReport from "@/assets/t23/images/badge/icon-report.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { PageContainer } from "@/components/styled-component/PageContainer";

const ReportPage = () => {
  useUpdatePageName(i18n.t("affiliate.report"));

  const { alert } = useNotifications();
  const history = useHistory();
  const { isDesktopSize } = useRwd();

  return (
    <PageContainer>
      {isDesktopSize && <UserWalletInfo />}
      <AccountPaper pageName={i18n.t("affiliate.report")} iconUrl={iconReport}>
        {/*@ts-ignore*/}
        <Report alert={alert} history={history} />
      </AccountPaper>
    </PageContainer>
  );
};

export default ReportPage;
