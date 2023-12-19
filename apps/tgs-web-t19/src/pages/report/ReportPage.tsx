import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Report from "@/components/account/Report";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconReport from "@/assets/t19/images/account/navItemWhite/icon-report.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";

const ReportPage = () => {
  useUpdatePageName(i18n.t("affiliate.report"));

  const { isDesktopSize } = useRwd();

  return (
    <TransferPageContainer>
      {isDesktopSize && <UserWalletInfo />}
      <AccountPaper pageName={i18n.t("affiliate.report")} iconUrl={iconReport}>
        <Report />
      </AccountPaper>
    </TransferPageContainer>
  );
};

export default ReportPage;
