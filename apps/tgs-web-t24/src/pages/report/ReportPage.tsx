import { useHistory } from "react-router-dom";
import iconReport from "@/assets/t23/images/badge/icon-report.svg";
import AccountPaper from "@/components/project/AccountPaper";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import Report from "@/core/components/Report";
import { useNotifications } from "@/core/feature/useNotifications";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import { useRwd } from "@/core/hooks/tools/useRwd";
import i18n from "@/utils/i18n";
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
