import Report from "@/components/account/Report";
import AccountPaper from "@/components/project/AccountPaper";
import MenuTabs from "@/components/project/MenuTabs";
import { PageContainer } from "@/components/styled-component/PageContainer";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";

const ReportPage = () => {
  useUpdatePageName(i18n.t("common.transactions"));

  const { isDesktopSize } = useRwd();

  return (
    <PageContainer>
      {/* {isDesktopSize && <UserWalletInfo />} */}
      {isDesktopSize && <MenuTabs />}
      <AccountPaper pageName={i18n.t("common.transactions")} iconUrl={""}>
        <Report />
      </AccountPaper>
    </PageContainer>
  );
};

export default ReportPage;
