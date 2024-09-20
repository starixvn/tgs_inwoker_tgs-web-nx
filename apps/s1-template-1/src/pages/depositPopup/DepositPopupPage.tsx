/* eslint-disable import/order */
import { useLocation } from "react-router";
import styled from "styled-components";
import DepositCounter from "./components/DepositCounter";

const WhiteIframe = styled.iframe`
  background-color: white;
  width: 100%;
  height: 720px;
`

export function DepositPopupPage() {

  const search = useLocation().search;
  const expirationtimestamp = new URLSearchParams(search).get("expirationTimeStamp");

  const paymenturl = new URLSearchParams(search).get("paymenturl")
  return <>
    {isValidExpirationTimeStamp(expirationtimestamp) && <DepositCounter expirationTimeStamp={convertExpirationTimeStampToNumber(expirationtimestamp)}/>}
    <WhiteIframe title="deposit-popup" src={paymenturl ?? ""}/>
  </>
}

function isValidExpirationTimeStamp(expirationtimestamp: string | null) {
  return expirationtimestamp && !isNaN(Number.parseInt(expirationtimestamp))
}

function convertExpirationTimeStampToNumber(expirationtimestamp: string | null) {
  return expirationtimestamp ? Number.parseInt(expirationtimestamp) : 0
}
