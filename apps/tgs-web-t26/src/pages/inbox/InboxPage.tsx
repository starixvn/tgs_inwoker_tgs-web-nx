import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { InboxCategoryKeyEnum, useInboxPage, useRwd } from "@tgs-web-nx/core/hooks";
import {
  InboxDetailContextProvider,
  InboxReplyContextProvider,
  SendDetailContextProvider,
} from "@tgs-web-nx/core/features";
import styled from "styled-components";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconInbox from "@/assets/t26/images/account/navItem/icon-inbox.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { PageContainer } from "@/components/styled-component/PageContainer";
import ComposeForm from "@/pages/inbox/components/form/ComposeForm";
import InboxList from "@/pages/inbox/components/InboxList";
import SentList from "@/pages/inbox/components/SentList";
import InboxCategoryTabs from "@/pages/inbox/components/InboxCategoryTabs";

const InboxContainer = styled.div``;

const InboxComponentDictionary = {
  [InboxCategoryKeyEnum.COMPOSE]: ComposeForm,
  [InboxCategoryKeyEnum.INBOX]: () => {
    return (
      <InboxDetailContextProvider>
        <InboxReplyContextProvider>
          <InboxList />
        </InboxReplyContextProvider>
      </InboxDetailContextProvider>
    );
  },
  [InboxCategoryKeyEnum.SENT]: () => {
    return (
      <SendDetailContextProvider>
        <SentList />
      </SendDetailContextProvider>
    );
  },
};

const MessageCenterPage = () => {
  const { tabList, handleClickTab, selectedTab, InboxComponent } =
    useInboxPage(InboxComponentDictionary);

  const { isDesktopSize } = useRwd();

  return (
    <PageContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("wap.main.account.inbox")} iconUrl={iconInbox}>
        <InboxContainer>
          <InboxCategoryTabs
            tabList={tabList}
            selectedTab={selectedTab}
            handleClickTab={handleClickTab}
          />
          <InboxComponent />
        </InboxContainer>
      </AccountPaper>
    </PageContainer>
  );
};

export default MessageCenterPage;
