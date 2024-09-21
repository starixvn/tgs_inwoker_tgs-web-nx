/* eslint-disable import/order */
import { LabelLargeContainer } from "@/components/styled-component/ProfileForms";
import { useDepositPopupCounter } from "@tgs-web-nx/core/hooks";
import styled from "styled-components";

const LabelCounter = styled(LabelLargeContainer)`
  position: absolute;
  top: 12.5rem;
`;

const DepositCounter = ({ expirationTimeStamp }: { expirationTimeStamp: number}) => {

  const { absoluteExpirationTimeInSeconds } = useDepositPopupCounter(expirationTimeStamp);

  return absoluteExpirationTimeInSeconds && <LabelCounter>Expiration Time: {toMinutesDisplay(absoluteExpirationTimeInSeconds)}:{toSecondDisplay(absoluteExpirationTimeInSeconds)}</LabelCounter>
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
