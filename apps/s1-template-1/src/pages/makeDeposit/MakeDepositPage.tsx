import { HintText } from "@/components/styled-component/Deposit";
import { LabelContainer } from "@/components/styled-component/ProfileForms";
import { useWalletStore } from "@tgs-web-nx/core";
import { i18n } from "@tgs-web-nx/utils";
import { useEffect } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";

const ErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.4rem;
  align-items:center;
`;

const getDepositInfoFromUrlSearchParams = (search: string) => {
  const amount = new URLSearchParams(search).get("amount") ?? "";
  const payment_id = new URLSearchParams(search).get("payment_id") ?? "";
  const promotionid = new URLSearchParams(search).get("promotionid") ?? "";
  const paymentcode = new URLSearchParams(search).get("paymentcode") ?? "";
  const type = new URLSearchParams(search).get("type") ?? "";

  return {
    amount,
    payment_id,
    promotionid,
    paymentcode,
    type
  }
}

function redirect(url: string) {
  window.location.href = url;
}

function handleOpenDepositRedirect(paymenturl: string, expirationtime = "") {
  const expirationTimeStamp = Date.now() + Number.parseInt(expirationtime) * 60 * 1000;
  if (isNaN(expirationTimeStamp)) return redirect(paymenturl);
  const queryParams = new URLSearchParams({
    paymenturl,
    expirationTimeStamp: expirationTimeStamp.toString()
  });
  const url = `${window.location.origin}/deposit/popup?${queryParams}`;
  return redirect(url);
}

const RedirectingMessage = () => {
  return <LabelContainer>
    Redirecting to Payment Gateway
  </LabelContainer>
}

const ErrorMessage = ({ errmsgid = i18n.t("SystemError") }: { errmsgid?: string}) => {
  return <ErrorMessageContainer>
    <LabelContainer>
      Unable to connect to the payment gateway. Please try again or contact support.
    </LabelContainer>
    <HintText>
      Error: {i18n.t(errmsgid)}
    </HintText>
  </ErrorMessageContainer>
}

const MakeDepositPage = () => {

  const search = useLocation().search;
  const {amount, payment_id, promotionid, paymentcode, type} = getDepositInfoFromUrlSearchParams(search);

  const { wallet, performDeposit } = useWalletStore();

  const isDepositFailed = () => {
      if (wallet.depositResult && !wallet.depositResult.IsSuccess) {
        return true;
      }

      return false;
  }

  const getErrMsgId = () => {
    if (!wallet.depositResult) return i18n.t("SystemError");
    return wallet.depositResult.data.errmsgid;
  }

  useEffect(() => {
    if (!wallet.depositResult)
      performDeposit(amount, payment_id, promotionid, paymentcode, type);
    else {
      // TypeScript typing is currently broken, so temporarily get value with square brackets
      console.log(wallet.depositResult)
      if (wallet.depositResult.IsSuccess) {
        const response = wallet.depositResult;
        const data = response.data;
        const url = data ? data.paymenturl : "";
        if (url) {
          const expirationTime = data.expirationtime;
          handleOpenDepositRedirect(url, expirationTime)
        }
      }
    }
  }, [wallet.depositResult, amount, payment_id, promotionid, paymentcode, type, performDeposit])

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>
    {
      isDepositFailed()
      ? <ErrorMessage errmsgid={getErrMsgId()}/>
      : <RedirectingMessage/>
    }
  </>
}

export default MakeDepositPage;
