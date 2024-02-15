import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import MessageCenter from "@/components/account/MessageCenter";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconInbox from "@/assets/t26/images/account/navItem/icon-inbox.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { PageContainer } from "@/components/styled-component/PageContainer";
import PageBadge from "@/components/project/AccountPaper/components/PageBadge";

const MessageCenterPage = () => {
  useUpdatePageName(i18n.t("inbox.title"));

  const { isDesktopSize } = useRwd();

  return (
    <PageContainer>
      {isDesktopSize && <UserWalletInfo />}
      {isDesktopSize && <PageBadge iconUrl={iconInbox} text={i18n.t("inbox.title")} />}

      <AccountPaper>
        <MessageCenter />
      </AccountPaper>
    </PageContainer>
  );
};

export default MessageCenterPage;
