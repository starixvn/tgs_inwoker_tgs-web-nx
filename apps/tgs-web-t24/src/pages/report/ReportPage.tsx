import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import iconReport from "@/assets/t23/images/badge/icon-report.svg";
import AccountPaper from "@/components/project/AccountPaper";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import Report from "@/components/account/Report";
import { PageContainer } from "@/components/styled-component/PageContainer";

const ReportPage = () => {
  useUpdatePageName(i18n.t("affiliate.report"));

  const { isDesktopSize } = useRwd();

  return (
    <PageContainer>
      {isDesktopSize && <UserWalletInfo />}
      <AccountPaper pageName={i18n.t("affiliate.report")} iconUrl={iconReport}>
        <Report />
      </AccountPaper>
    </PageContainer>
  );
};

export default ReportPage;
