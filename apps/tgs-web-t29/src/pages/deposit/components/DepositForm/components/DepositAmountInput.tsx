import { i18n, Common } from "@tgs-web-nx/utils";
import { useContext, ChangeEvent } from "react";
import { LabelContainer } from "../components";
import { DepositFormContext } from "./DepositFormProvider";
import { FormControl, ItemContainer } from "@/components/styled-component/ProfileForms";
import { TextField } from "@/components/UI/TextField";


/**
 * 輸入金額 UI
 */
export const DepositAmountInput = () => {
  const {formData, setFormData} = useContext(DepositFormContext);

  /**
   * 處理輸入金額
   */
  const handleOnChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, amount: e.target.value});
  };

  return (
    <ItemContainer>
        <LabelContainer>{i18n.t("deposit.depositAmount")}</LabelContainer>
        <FormControl variant="outlined">
          <TextField
            fullWidth
            value={formData.amount}
            onChange={handleOnChangeAmount}
            type="tel"
            placeholder={
              i18n.t("deposit.msgPleaseEnter") +
              Common.formatCurrency(formData.minAmount) +
              " - " +
              Common.formatCurrency(formData.maxAmount) +
              i18n.t("deposit.dollor")
            }
          />
        </FormControl>
      </ItemContainer>
  );
};