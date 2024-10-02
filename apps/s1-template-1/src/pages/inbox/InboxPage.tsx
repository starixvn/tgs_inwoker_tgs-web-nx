import AccountPaper from "@/components/project/AccountPaper";
import MenuTabs from "@/components/project/MenuTabs";
import { PageContainer } from "@/components/styled-component/PageContainer";
import ComposeForm from "@/pages/inbox/components/form/ComposeForm";
import InboxCategoryTabs from "@/pages/inbox/components/InboxCategoryTabs";
import InboxList from "@/pages/inbox/components/InboxList";
import SentList from "@/pages/inbox/components/SentList";
import { InboxDetailContextProvider, InboxReplyContextProvider, SendDetailContextProvider } from "@tgs-web-nx/core/features";
import { InboxCategoryKeyEnum, useInboxPage, useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";

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
      {/* {isDesktopSize && <UserWalletInfo />} */}
      {isDesktopSize && <MenuTabs />}
      <AccountPaper pageName={i18n.t("wap.main.account.inbox")} iconUrl={""}>
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
