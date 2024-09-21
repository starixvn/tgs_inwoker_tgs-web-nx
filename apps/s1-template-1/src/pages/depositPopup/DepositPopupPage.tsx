/* eslint-disable import/order */
import { useLocation } from "react-router";
import styled from "styled-components";
import DepositCounter from "./components/DepositCounter";

const WhiteIframe = styled.iframe`
  background-color: white;
  width: 100%;
  min-height: 80rem;
`
const PopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
`;

export function DepositPopupPage() {

  const search = useLocation().search;
  const expirationtimestamp = new URLSearchParams(search).get("expirationTimeStamp");

  const paymenturl = new URLSearchParams(search).get("paymenturl")
  return (
    <PopupWrapper>
      <img
                src={"/assets/images/transfer/payment-provider.png"}
                width={"224px"}
                height={"168px"}
                alt="counter"
              />
      {isValidExpirationTimeStamp(expirationtimestamp) && <DepositCounter expirationTimeStamp={convertExpirationTimeStampToNumber(expirationtimestamp)}/>}
      <WhiteIframe title="deposit-popup" src={paymenturl ?? ""}/>
    </PopupWrapper>
  )
    
}

function isValidExpirationTimeStamp(expirationtimestamp: string | null) {
  return expirationtimestamp && !isNaN(Number.parseInt(expirationtimestamp))
}

function convertExpirationTimeStampToNumber(expirationtimestamp: string | null) {
  return expirationtimestamp ? Number.parseInt(expirationtimestamp) : 0
}
