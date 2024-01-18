import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useGetHomeCategoryList } from "@tgs-web-nx/core/features";
import { BetRecord } from "@/pages/home/components/Ranking/components/BetRecordRow";
import { useAutoBettingToggle } from "@/pages/home/components/Ranking/hooks/useAutoBettingToggle";
import { mockBetRecordList } from "@/pages/home/components/Ranking/mocks/betRecordList";
import { userList } from "@/pages/home/components/Ranking/mocks/userList";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import { GameItem } from "@tgs-web-nx/types";

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

function getRandomGameName(gameList: GameItem[]) {
  const gameNameList = gameList.map(item => item.name);

  const getRandomGameNames = (gameNameList: string[], count: number) => {
    const result = [];
    const length = gameNameList.length;

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * length);
      result.push(gameNameList[randomIndex]);
    }

    return result;
  };

  return getRandomGameNames(gameNameList, 1);
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
  const { gameList } = useGetHomeCategoryList();

  const getRandomGameName = (gameList: GameItem[]) => {
    const gameNameList = gameList.map(item => item.name);
    const randomIndex = Math.floor(Math.random() * gameNameList.length);
    return gameNameList[randomIndex];
  };

  const generateSingleBetRecord = (): BetRecord => {
    const key = uuidv4();
    const gameName = getRandomGameName(gameList);
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
