/* eslint-disable import/order */
import { LabelLargeContainer } from "@/components/styled-component/ProfileForms";
import { useDepositPopupCounter } from "@tgs-web-nx/core/hooks";

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
