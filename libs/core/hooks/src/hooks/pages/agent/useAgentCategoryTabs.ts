import { useMemo } from "react";
import { i18n } from "@tgs-web-nx/utils";

export enum AgentCategoryKeyEnum {
  "AGENTINFO",
  "PLAYERLIST",
  "AGENTLIST",
  "WINLOSSREPORT",
  "PROFITSHAREREPORT",
  "AGENTCONTRIBUTION"
}
export type AgentCategoryTab = {
  key: AgentCategoryKeyEnum;
  label: string;
  path: string;
};

export function useAgentCategoryTabs() {
  const tabList = useMemo<AgentCategoryTab[]>(() => {
    return [
      {
        key: AgentCategoryKeyEnum.AGENTINFO,
        label: i18n.t("agent.agentInfo"),
        path: "/agent/agentInfo",
      },
      {
        key: AgentCategoryKeyEnum.PLAYERLIST,
        label: i18n.t("agent.playerList"),
        path: "/agent/playerList",
      },
      {
        key: AgentCategoryKeyEnum.AGENTLIST,
        label: i18n.t("agent.agentList"),
        path: "/agent/agentList",
      },
      {
        key: AgentCategoryKeyEnum.WINLOSSREPORT,
        label: i18n.t("agent.winlossReport"),
        path: "/agent/winlossReport",
      },
      {
        key: AgentCategoryKeyEnum.PROFITSHAREREPORT,
        label: i18n.t("agent.profitShareReport"),
        path: "/agent/profitShareReport",
      },
      {
        key: AgentCategoryKeyEnum.AGENTCONTRIBUTION,
        label: "代理貢獻",
        path: "/agent/contribution",
      },
    ];
  }, []);

  return {
    tabList,
  };
}
