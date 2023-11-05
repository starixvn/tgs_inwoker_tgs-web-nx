import React from "react";
import { useHistory } from "react-router";
import { useNotifications } from "@/core/feature/useNotifications";
import i18n from "@/utils/i18n";
import Inbox from "@/core/components/Inbox";
import styled from "styled-components";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconInbox from "@/assets/t23/images/badge/icon-inbox.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

const InboxContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(1200px + 22px * 2);
  margin: auto;
`;

type Props = {};
const InboxPage = (props: Props) => {
  useUpdatePageName(i18n.t("inbox.title"));

  const { isDesktopSize } = useRwd();

  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <InboxContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("inbox.title")} iconUrl={iconInbox}>
        {/*@ts-ignore*/}
        <Inbox alert={alert} history={history} />
      </AccountPaper>
    </InboxContainer>
  );
};

export default InboxPage;
