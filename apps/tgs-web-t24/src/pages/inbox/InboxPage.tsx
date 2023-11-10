import iconInbox from "@/assets/t23/images/badge/icon-inbox.svg";
import AccountPaper from "@/components/project/AccountPaper";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import Inbox from "@/core/components/Inbox";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import { useRwd } from "@/core/hooks/tools/useRwd";
import i18n from "@/utils/i18n";
import { PageContainer } from "@/components/styled-component/PageContainer";

const InboxPage = () => {
  useUpdatePageName(i18n.t("inbox.title"));

  const { isDesktopSize } = useRwd();

  return (
    <PageContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("inbox.title")} iconUrl={iconInbox}>
        <Inbox />
      </AccountPaper>
    </PageContainer>
  );
};

export default InboxPage;
