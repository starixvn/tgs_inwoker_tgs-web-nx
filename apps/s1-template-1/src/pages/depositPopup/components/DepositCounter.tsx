/* eslint-disable import/order */
import { LabelLargeContainer } from "@/components/styled-component/ProfileForms";
import { useEffect, useState } from "react";

const DepositCounter = ({ expirationTimeStamp }: { expirationTimeStamp: number}) => {
  const [ expiredTimeInSeconds, setExpiredTimeInSeconds ] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      const remainingTimeInMiliseconds = expirationTimeStamp - Date.now();
      const remainingTimeInSeconds = remainingTimeInMiliseconds / 1000;
      if (remainingTimeInMiliseconds <= 0) {
        window.close();
      }
      setExpiredTimeInSeconds(remainingTimeInSeconds);
    }, 500)

    return () => {
      clearInterval(id);
    }
  })

  return expiredTimeInSeconds && <LabelLargeContainer>Expiration Time: {expiredTimeInSeconds.toFixed(0)}</LabelLargeContainer>
}

export default DepositCounter;
