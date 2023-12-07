import { useEffect, useState } from "react";
import {
  getIntervalTimeInMs,
  getNewAmount,
  getInitialJackpotAmount,
  saveJackpotAmountToLocalStorage,
} from "../utils";
const initialJackpotAmount = getInitialJackpotAmount();

export function useJackpot() {
  const [jackpotAmount, setJackpotAmount] = useState<number>(initialJackpotAmount);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    function startJackpotGenerate() {
      const intervalTimeInMs = getIntervalTimeInMs();
      const newAmount = getNewAmount();

      timeout = setTimeout(() => {
        const newJackpotAmount = jackpotAmount + newAmount;

        setJackpotAmount(newJackpotAmount);
        saveJackpotAmountToLocalStorage(newJackpotAmount);

        startJackpotGenerate();
      }, intervalTimeInMs);
    }

    startJackpotGenerate();

    return () => {
      if (!timeout) return;
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    jackpotAmount,
  };
}
