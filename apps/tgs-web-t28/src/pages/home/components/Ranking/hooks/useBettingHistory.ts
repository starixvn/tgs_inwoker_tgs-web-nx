import { useAutoBet } from "@/pages/home/components/Ranking/hooks/useAutoBet";
import { useLeaderboard } from "@/pages/home/components/Ranking/hooks/useLeaderboard";

export function useBettingHistory() {
  const { betRecordList, latestBetRecord } = useAutoBet();
  const { leaderboard } = useLeaderboard(latestBetRecord);

  return {
    betRecordList,
    leaderboard,
  };
}
