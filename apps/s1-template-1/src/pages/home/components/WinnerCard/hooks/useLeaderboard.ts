import { useEffect, useState } from "react";
import { RankItem } from "@/pages/home/components/WinnerCard/components/WinnerRankRow";
import { mockUserBetDictionary } from "@/pages/home/components/WinnerCard/mocks/userBetDictionary";
import { BetRecord } from "@/pages/home/components/WinnerCard/components/BetRecordRow";
import { mockLeaderboard } from "@/pages/home/components/WinnerCard/mocks/leaderboard";

// this dictionary is used for calculate rank
const userBetDictionary: { [key in string]: RankItem } = (function () {
  const storedUserBetDictionary = localStorage.getItem("userBetDictionary");
  return storedUserBetDictionary ? JSON.parse(storedUserBetDictionary) : mockUserBetDictionary;
})();

const initialLeaderboard: RankItem[] = (function () {
  const storedLeaderBoard = localStorage.getItem("leaderboard");

  return storedLeaderBoard ? JSON.parse(storedLeaderBoard) : mockLeaderboard;
})();

export function useLeaderboard(latestBetRecord: BetRecord) {
  // leader board
  const [overallLeaderboard, setOverallLeaderboard] = useState<RankItem[]>(initialLeaderboard);

  const updateLeaderboard = () => {
    // userBetDictionary stores about 30 rankItems
    // if new betRecord belongs one of them, then add up its betAmount
    // or just skip update leaderboard
    if (!userBetDictionary[latestBetRecord?.playerName]) return;

    Object.values(userBetDictionary).forEach((rankItem) => {
      if (rankItem.playerName === latestBetRecord.playerName) {
        rankItem.betAmount += latestBetRecord.betAmount;
        rankItem.gameName = latestBetRecord.gameName || "";
      }
    });

    const sortedLeaderboardList = Object.values(userBetDictionary) as RankItem[];

    sortedLeaderboardList.sort((a, b) => b.betAmount - a.betAmount);

    setOverallLeaderboard(sortedLeaderboardList.slice(0, 5));

    localStorage.setItem("leaderboard", JSON.stringify(sortedLeaderboardList));
    localStorage.setItem("userBetDictionary", JSON.stringify(userBetDictionary));
    setOverallLeaderboard(sortedLeaderboardList.slice(0, 5));

    localStorage.setItem("leaderboard", JSON.stringify(sortedLeaderboardList));
    localStorage.setItem("userBetDictionary", JSON.stringify(userBetDictionary));
  };

  useEffect(() => {
    updateLeaderboard();
  }, [latestBetRecord]);

  const displayedLeaderboard = overallLeaderboard.slice(0, 5);
  return { leaderboard: displayedLeaderboard };
}
