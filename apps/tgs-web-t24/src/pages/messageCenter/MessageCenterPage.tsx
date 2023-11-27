import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import iconInbox from "@/assets/t23/images/badge/icon-inbox.svg";
import AccountPaper from "@/components/project/AccountPaper";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import MessageCenter from "@/components/account/MessageCenter";
import { PageContainer } from "@/components/styled-component/PageContainer";

const MessageCenterPage = () => {
  useUpdatePageName(i18n.t("inbox.title"));

  const { isDesktopSize } = useRwd();

  return (
    <PageContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("inbox.title")} iconUrl={iconInbox}>
        <MessageCenter />
      </AccountPaper>
    </PageContainer>
  );
};

export default MessageCenterPage;
