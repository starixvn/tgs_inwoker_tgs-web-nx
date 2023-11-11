import { useState } from "react";
import styled from "styled-components";
import { rankingTabList } from "@tgs-web-nx/constants";
import TabButton from "./TabButton";
import LatestRecordTable from "@/pages/home/components/Ranking/LatestRecordTable";
import WinningRankingTable from "@/pages/home/components/Ranking/WinningRankingTable";
import { useBettingHistory } from "@/pages/home/components/Ranking/hooks/useBettingHistory";

const RankingContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const RankingTabs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const TabPanel = () => {
  const [activeRankingTab, setActiveRankingTab] = useState(rankingTabList[0]);
  const { betRecordList, leaderboard } = useBettingHistory();

  return (
    <RankingContainer>
      <RankingTabs>
        {rankingTabList.map((text: string) => (
          <TabButton
            key={text}
            text={text}
            isActive={text === activeRankingTab}
            onClick={() => setActiveRankingTab(text)}
          />
        ))}
      </RankingTabs>

      {activeRankingTab === "Latest Record" && <LatestRecordTable betRecordList={betRecordList} />}

      {activeRankingTab === "Winning Ranking" && <WinningRankingTable leaderboard={leaderboard} />}
    </RankingContainer>
  );
};

export default TabPanel;
