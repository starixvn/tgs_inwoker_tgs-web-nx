import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Report from "@/components/account/Report";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconReport from "@/assets/t29/images/account/navItem/icon-report.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { PageContainer } from "@/components/styled-component/PageContainer";
import MenuTabs from "@/components/project/MenuTabs";

const ReportPage = () => {
  useUpdatePageName(i18n.t("affiliate.report"));

  const { isDesktopSize } = useRwd();

  return (
    <PageContainer>
      {isDesktopSize && <UserWalletInfo />}
      {isDesktopSize && <MenuTabs />}
      <AccountPaper pageName={i18n.t("affiliate.report")} iconUrl={iconReport}>
        <Report />
      </AccountPaper>
    </PageContainer>
  );
};

export default ReportPage;
