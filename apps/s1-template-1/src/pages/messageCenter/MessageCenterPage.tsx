import MessageCenter from "@/components/account/MessageCenter";
import AccountPaper from "@/components/project/AccountPaper";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import { PageContainer } from "@/components/styled-component/PageContainer";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import React from "react";

const MessageCenterPage = () => {
  useUpdatePageName(i18n.t("inbox.title"));

  const { isDesktopSize } = useRwd();

  return (
    <PageContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("inbox.title")} iconUrl={""}>
        <MessageCenter />
      </AccountPaper>
    </PageContainer>
  );
};

export default MessageCenterPage;
