import React from "react";
import i18n from "@/utils/i18n";
import Inbox from "@/core/components/Inbox";
import styled from "styled-components";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconInbox from "@/assets/t23/images/badge/icon-inbox.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

const InboxContainer = styled.div`
  padding: 0 22px;
  max-width: calc(1072px + 22px * 2);
  margin: auto;
`;

const InboxPage = () => {
  useUpdatePageName(i18n.t("inbox.title"));

  const { isDesktopSize } = useRwd();

  return (
    <InboxContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("inbox.title")} iconUrl={iconInbox}>
        <Inbox />
      </AccountPaper>
    </InboxContainer>
  );
};

export default InboxPage;
