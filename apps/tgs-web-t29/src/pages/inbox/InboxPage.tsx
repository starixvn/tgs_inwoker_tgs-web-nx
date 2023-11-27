import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import Inbox from "@/components/account/Inbox";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconInbox from "@/assets/t29/images/account/navItem/icon-inbox.svg";
import AccountPaper from "@/components/project/AccountPaper";
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
