import { useMemo, useState } from "react";
import { i18n } from "@tgs-web-nx/utils";

export enum AgentCategoryKeyEnum {
  "AGENTINFO",
  "PLAYERLIST",
  "AGENTLIST",
  "WINLOSSREPORT",
  "PROFITSHAREREPORT"
}
export type AgentCategoryTab = {
  key: AgentCategoryKeyEnum;
  label: string
}

export function useAgentCategoryTabs() {
  const tabList = useMemo<AgentCategoryTab[]>(() => {
    return [
      {
        key: AgentCategoryKeyEnum.AGENTINFO,
        label: i18n.t("agent.agentInfo"),
      },
      {
        key: AgentCategoryKeyEnum.PLAYERLIST,
        label: i18n.t("agent.playerList"),
      },
      {
        key: AgentCategoryKeyEnum.AGENTLIST,
        label: i18n.t("agent.agentList"),
      },
      {
        key: AgentCategoryKeyEnum.WINLOSSREPORT,
        label: i18n.t("agent.winlossReport"),
      },
      {
        key: AgentCategoryKeyEnum.PROFITSHAREREPORT,
        label: i18n.t("agent.profitShareReport"),
      },
    ]
  }, []);

  return {
    tabList
  };
}
