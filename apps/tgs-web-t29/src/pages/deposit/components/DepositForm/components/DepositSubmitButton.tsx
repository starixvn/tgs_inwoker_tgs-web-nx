import { i18n, Common } from "@tgs-web-nx/utils";
import { useContext } from "react";
import { useWalletStore, } from "@tgs-web-nx/core";
import { DepositFormContext } from "../components";
import { SubmitButton } from "@/components/styled-component/ProfileForms";

/**
 * 存款表單送出按鈕
 */
export const DepositSubmitButton = () => {
  const {performDeposit} = useWalletStore();
  const {formData} = useContext(DepositFormContext);
  const isDisabled = Common.validateDepositAndWithdrawAmount(formData.amount, formData.maxAmount, formData.minAmount);
  
  /**
   * 送出表單
   */
  const handleOnSubmit = () => {
    const {amount, paymentid, promotionid, paymentcode, type, manualBankName} = formData;
    performDeposit(Number(amount), paymentid, promotionid, paymentcode, type);
  }

  return (
    <SubmitButton
        onClick={handleOnSubmit}
        variant="contained"
        color="primary"
        fullWidth
        disabled={isDisabled}
      >
          {i18n.t("common.submit")}
      </SubmitButton>
  )
}