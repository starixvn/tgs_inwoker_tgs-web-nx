// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { useState } from "react";
import { useAgentCategoryTabs } from "./useAgentCategoryTabs";

export enum PlayerStatus {
  "ENABLED" = 0,
  "DISABLED" = 1,
  "INBLACKLIST" = 2,
  "REGISTERING" = 3,
}

export function useAgentPage() {
  useUpdatePageName(i18n.t("usertype.agent"));

  const { tabList } = useAgentCategoryTabs();
  const [loading, setLoading] = useState(false);

  const getStatusTranslation = (status: number) => {
    switch (status) {
      case PlayerStatus.ENABLED:
        return i18n.t("agent.enabled");
      case PlayerStatus.DISABLED:
        return i18n.t("agent.disabled");
      case PlayerStatus.INBLACKLIST:
        return i18n.t("agent.inBlacklist");
      default:
        return "";
    }
  };
  return {
    loading,
    tabList,
    getStatusTranslation,
  };
}
