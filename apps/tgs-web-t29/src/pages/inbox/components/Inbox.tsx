import React, { useMemo } from "react";
import styled from "styled-components";
import InboxCategoryTabs from "@/pages/inbox/components/InboxCategoryTabs";
import {
  useInboxCategoryTabs,
  InboxCategoryKeyEnum,
} from "@/pages/inbox/hooks/useInboxCategoryTabs";
import ComposeForm from "@/pages/inbox/components/ComposeForm";
import InboxTable from "@/pages/inbox/components/InboxTable";
import SentTable from "@/pages/inbox/components/SentTable";

const InboxContainer = styled.div``;

const inboxComponentCategory: { [key in InboxCategoryKeyEnum]: () => JSX.Element } = {
  [InboxCategoryKeyEnum.COMPOSE]: ComposeForm,
  [InboxCategoryKeyEnum.INBOX]: InboxTable,
  [InboxCategoryKeyEnum.SENT]: SentTable,
};

const Inbox = () => {
  const { tabList, selectedTab, handleClickTab } = useInboxCategoryTabs();

  const InboxComponent = useMemo(() => {
    return inboxComponentCategory[selectedTab.key] || null;
  }, [selectedTab.key]);

  return (
    <InboxContainer>
      <InboxCategoryTabs
        tabList={tabList}
        selectedTab={selectedTab}
        handleClickTab={handleClickTab}
      />

      <InboxComponent />
    </InboxContainer>
  );
};

export default React.memo(Inbox);
