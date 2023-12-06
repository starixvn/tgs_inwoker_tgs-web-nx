import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useGetHomeCategoryList } from "@tgs-web-nx/core/features";
import { GameItem } from "@tgs-web-nx/types";
import { BetRecord } from "@/pages/home/components/WinnerCard/components/BetRecordRow";
import { useAutoBettingToggle } from "@/pages/home/components/WinnerCard/hooks/useAutoBettingToggle";
import { mockBetRecordList } from "@/pages/home/components/WinnerCard/mocks/betRecordList";
import { userList } from "@/pages/home/components/WinnerCard/mocks/userList";

function getRandomBetAmount() {
  const amountStatus = Math.floor(Math.random() * 10);
  if (amountStatus < 3) {
    return Math.floor(Math.random() * 10) || 1;
  } else if (amountStatus < 6) {
    return Math.floor(Math.random() * 30) * 5 || 1;
  } else if (amountStatus < 9) {
    return Math.floor(Math.random() * 20) * 10 || 1;
  } else {
    return Math.floor(Math.random() * 100) * 10 || 1;
  }
}

function getRandomGameName(hotGameList: GameItem[]) {
  if (!hotGameList.length) return null;
  if (hotGameList.length) {
    const randomGameName = hotGameList[Math.floor(Math.random() * hotGameList.length)];

    return randomGameName.name;
  }
}

const initialBetRecordList: BetRecord[] = (() => {
  const betRecordList = localStorage.getItem("betRecordList");

  return betRecordList ? JSON.parse(betRecordList) : mockBetRecordList;
})();

export function useAutoBet() {
  const [betRecordList, setBetRecordList] = useState<BetRecord[]>(initialBetRecordList);
  const [latestBetRecord, setLatestBetRecord] = useState(
    initialBetRecordList[initialBetRecordList.length - 1],
  );

  const { hotGameList } = useGetHomeCategoryList();

  const generateSingleBetRecord = (): BetRecord => {
    const key = uuidv4();
    const gameName = getRandomGameName(hotGameList) || '';
    const playerName = userList[Math.floor(Math.random() * userList.length)];
    const betAmount = getRandomBetAmount();

    return { gameName, playerName, betAmount, key };
  };

  const generateFakeBetHistory = () => {
    const newBetRecord = generateSingleBetRecord();
    setLatestBetRecord(newBetRecord);

    const updatedBetRecordList = [newBetRecord, ...betRecordList].slice(0, 10);
    setBetRecordList(updatedBetRecordList);

    localStorage.setItem("betRecordList", JSON.stringify(updatedBetRecordList));
  };

  // continue auto bet
  const { autoBettingToggle } = useAutoBettingToggle();
  useEffect(() => {
    generateFakeBetHistory();
  }, [autoBettingToggle]);

  return {
    betRecordList,
    latestBetRecord,
  };
}
