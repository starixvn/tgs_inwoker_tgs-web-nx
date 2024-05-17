// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { useState } from "react";
import { useAgentCategoryTabs } from "./useAgentCategoryTabs";

export function useAgentPage() {
  useUpdatePageName(i18n.t("usertype.agent"));

  const { tabList } = useAgentCategoryTabs();
  const [loading, setLoading] = useState(false);

  return {
    loading,
    tabList,
  };
}
