import { useEffect, useState } from "react";

export function useDepositPopupCounter(expirationTimeStamp: number) {
  const [ absoluteExpirationTimeInSeconds, setAbsoluteExpirationTimeInSeconds ] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      const remainingTimeInMiliseconds = expirationTimeStamp - Date.now();
      const remainingTimeInSeconds = remainingTimeInMiliseconds / 1000;
      if (remainingTimeInMiliseconds <= 0) {
        window.close();
      }
      setAbsoluteExpirationTimeInSeconds(remainingTimeInSeconds);
    }, 500)

    return () => {
      clearInterval(id);
    }
  })

  return  { absoluteExpirationTimeInSeconds }
}
