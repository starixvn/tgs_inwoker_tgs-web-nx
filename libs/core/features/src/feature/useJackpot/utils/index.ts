const KEY_IN_LOCAL_STORAGE = "j";
const RESTART_JACKPOT_AMOUNT = 2135679.6;
const MAX_JACKPOT_AMOUNT = 400000 * 764.72; // 1 TWD = 764.72 VND
const TIME_INTERVAL_RANGE = 10; // 1~10s increase interval
const AMOUNT_RANGE = 1000; // 0.1~1000 per increase

export function getIntervalTimeInMs() {
  return Math.floor(Math.random() * TIME_INTERVAL_RANGE) * 1000;
}

export function getNewAmount() {
  return Math.floor(Math.random() * AMOUNT_RANGE * 10) / 10;
}

export function getInitialJackpotAmount() {
  const storedDataString = localStorage.getItem(KEY_IN_LOCAL_STORAGE);
  if (!storedDataString) {
    return RESTART_JACKPOT_AMOUNT;
  }

  const { amount, timestamp } = JSON.parse(storedDataString);
  const timeDiff = Date.now() - timestamp;

  const intervalTime = getIntervalTimeInMs();

  const increaseCount = Math.floor(Math.random() * 50) + 1;
  let newJackpotAmount = amount;
  for (let i = 0; i < increaseCount; i++) {
    const newAmount = getNewAmount();
    // prevent overflow
    if (newJackpotAmount > Number.MAX_SAFE_INTEGER - newAmount) {
      return RESTART_JACKPOT_AMOUNT;
    }

    newJackpotAmount += newAmount;
  }

  if (newJackpotAmount > MAX_JACKPOT_AMOUNT) {
    return RESTART_JACKPOT_AMOUNT;
  }

  return newJackpotAmount;
}

export function saveJackpotAmountToLocalStorage(amount: number) {
  localStorage.setItem(
    KEY_IN_LOCAL_STORAGE,
    JSON.stringify({
      amount,
      timestamp: Date.now(),
    }),
  );
}
