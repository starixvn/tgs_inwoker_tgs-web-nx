import { useState } from "react";
import { AgentCategoryKeyEnum, useAgentPage, useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";
import CategoryTab from "./components/CategoryTab";
import AgentInfo from "./components/AgentInfo";
import AgentPlayerList from "./components/AgentPlayerList";
import AgentList from "./components/AgentList";
import WinlossReport from "./components/WinlossReport";
import ProfitShareReport from "./components/ProfitShareReport";
import { AgentContextProvider } from "./components/AgentContextProvider";
import Loading from "@/components/UI/Loading";
import { PageContainer } from "@/components/styled-component/PageContainer";
import AccountPaper from "@/components/project/AccountPaper";
import iconAgent from "@/assets/t29/images/account/navItem/icon-agent.svg";
import { media } from "@/theme/breakpoints";

const AgentTabContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 0px;
  ${media.sm} {
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 20px;
  }
`;

const AgentContent = styled.div`
  margin-top: 20px;
  gap: 20px;
`;

const AgentPage = () => {
  const { loading, tabList } = useAgentPage();
  const { isDesktopSize } = useRwd();

  const [selectedTab, setSelectedTab] = useState(tabList[0]);

  if (loading) return <Loading show={true} />;

  return (
    <AgentContextProvider>
      <PageContainer>
        <AccountPaper pageName={i18n.t("usertype.agent")} iconUrl={iconAgent}>
          <AgentTabContainer>
            {tabList.map((category) => {
              return (
                <CategoryTab
                  selected={category.key === selectedTab.key}
                  category={category}
                  key={category.key}
                  handleClickTab={() => {
                    setSelectedTab(category);
                  }}
                />
              );
            })}
          </AgentTabContainer>
          <AgentContent>
            {isDesktopSize &&
              (() => {
                switch (selectedTab.key) {
                  case AgentCategoryKeyEnum.AGENTINFO:
                    return <AgentInfo />;
                  case AgentCategoryKeyEnum.PLAYERLIST:
                    return <AgentPlayerList />;
                  case AgentCategoryKeyEnum.AGENTLIST:
                    return <AgentList />;
                  case AgentCategoryKeyEnum.WINLOSSREPORT:
                    return <WinlossReport />;
                  case AgentCategoryKeyEnum.PROFITSHAREREPORT:
                    return <ProfitShareReport />;
                  default:
                    return null;
                }
              })()}
          </AgentContent>
        </AccountPaper>
      </PageContainer>
    </AgentContextProvider>
  );
};

export default AgentPage;
