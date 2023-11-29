import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { useMemo } from "react";
import { InboxCategoryKeyEnum, useInboxCategoryTabs } from "./useInboxCategoryTabs";

export function useInboxPage(inboxComponentDictionary: { [key in InboxCategoryKeyEnum]: any }) {
  useUpdatePageName(i18n.t("wap.main.account.inbox"));

  const { tabList, selectedTab, handleClickTab } = useInboxCategoryTabs();

  const InboxComponent = useMemo(() => {
    return inboxComponentDictionary[selectedTab.key] || null;
  }, [inboxComponentDictionary, selectedTab.key]);

  return {
    tabList,
    handleClickTab,
    selectedTab,
    InboxComponent,
  };
}
