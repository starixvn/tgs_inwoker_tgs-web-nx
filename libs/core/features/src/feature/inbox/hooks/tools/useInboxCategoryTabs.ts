import { useMemo, useState } from "react";
import { i18n } from "@tgs-web-nx/utils";

export enum InboxCategoryKeyEnum {
  "COMPOSE",
  "INBOX",
  "SENT",
}
export interface InboxCategoryTab {
  label: string | any;
  key: InboxCategoryKeyEnum;
}

export function useInboxCategoryTabs() {
  const tabList = useMemo<InboxCategoryTab[]>(() => {
    return [
      {
        label: i18n.t("compose"),
        key: InboxCategoryKeyEnum.COMPOSE,
      },
      {
        label: i18n.t("memoinbox"),
        key: InboxCategoryKeyEnum.INBOX,
      },
      {
        label: i18n.t("sent"),
        key: InboxCategoryKeyEnum.SENT,
      },
    ];
  }, []);

  const [selectedTab, setSelectedTab] = useState(tabList[0]);

  const handleClickTab = (newTab: InboxCategoryTab) => {
    setSelectedTab(newTab);
  };

  return {
    tabList,
    selectedTab,
    handleClickTab,
  };
}
