import { useAutoBet } from "@/pages/home/components/WinnerCard/hooks/useAutoBet";
import { useLeaderboard } from "@/pages/home/components/WinnerCard/hooks/useLeaderboard";

export function useBettingHistory() {
  const { betRecordList, latestBetRecord } = useAutoBet();
  const { leaderboard } = useLeaderboard(latestBetRecord);

  return {
    betRecordList,
    leaderboard,
  };
}
