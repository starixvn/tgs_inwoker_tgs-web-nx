/* eslint-disable import/order */
import { LabelLargeContainer } from "@/components/styled-component/ProfileForms";
import { useEffect, useState } from "react";

function useDepositPopupCounter(expirationTimeStamp: number) {
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

const DepositCounter = ({ expirationTimeStamp }: { expirationTimeStamp: number}) => {

  const { absoluteExpirationTimeInSeconds } = useDepositPopupCounter(expirationTimeStamp);

  return absoluteExpirationTimeInSeconds && <LabelLargeContainer>Expiration Time: {toMinutesDisplay(absoluteExpirationTimeInSeconds)}:{toSecondDisplay(absoluteExpirationTimeInSeconds)}</LabelLargeContainer>
}

function toMinutesDisplay(absoluteExpirationTimeInSeconds?: number) {
  const expiredTimeMinutes = (absoluteExpirationTimeInSeconds ?? 0) / 60;
  return String(Math.floor(expiredTimeMinutes)).padStart(2, '0');
}

function toSecondDisplay(absoluteExpirationTimeInSeconds: number) {
  const expiredTimeSeconds = (absoluteExpirationTimeInSeconds ?? 0) % 60;
  return String(Math.floor(expiredTimeSeconds)).padStart(2, '0');
}

export default DepositCounter;
