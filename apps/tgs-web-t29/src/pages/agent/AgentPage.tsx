import React, { useEffect, useState } from "react";
import { AgentCategoryKeyEnum, useAgentPage, useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";
import CategoryTab from "./components/CategoryTab"
import Loading from "@/components/UI/Loading";
import { PageContainer } from "@/components/styled-component/PageContainer";
import AccountPaper from "@/components/project/AccountPaper";
import iconAgent from "@/assets/t29/images/account/navItem/icon-agent.svg";

const AgentTabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const AgentPage = () => {
  const { loading, tabList, } = useAgentPage();
  const { isDesktopSize } = useRwd();

  const [selectedTab, setSelectedTab] = useState(tabList[0])

  if (loading) return <Loading show={true} />;
  
  return (
    <PageContainer>
      <AccountPaper pageName={i18n.t("usertype.agent")} iconUrl={iconAgent}>
        <AgentTabContainer>
          {
            tabList.map((category) => {
              return <CategoryTab
                selected={category.key === selectedTab.key}
                category={category} key={category.key}
                handleClickTab={() => {
                  setSelectedTab(category)
                }}
              />
            })
          }
        </AgentTabContainer>
        {(() => {
          switch (selectedTab.key) {
            case AgentCategoryKeyEnum.AGENTINFO:
              return null
            case AgentCategoryKeyEnum.PLAYERLIST:
              return null
            case AgentCategoryKeyEnum.AGENTLIST:
              return null
            case AgentCategoryKeyEnum.WINLOSSREPORT:
              return null
            case AgentCategoryKeyEnum.PROFITSHAREREPORT:
              return null
            default:
              return null;
          }
        })()}
      </AccountPaper>
    </PageContainer>
  );
};

export default AgentPage;
