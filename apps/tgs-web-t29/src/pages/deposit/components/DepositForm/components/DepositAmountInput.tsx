import { i18n, Common } from "@tgs-web-nx/utils";
import { TransferChannel } from "@tgs-web-nx/types";
import { useContext, ChangeEvent } from "react";
import config, { brandConfig, mapBrandName } from "@tgs-web-nx/config";
import { LabelContainer, CurrencyHint, TransferHint } from "../components";
import { DepositFormContext } from "./DepositFormProvider";
import { FormControl, ItemContainer } from "@/components/styled-component/ProfileForms";
import { TextField } from "@/components/UI/TextField";
import {
  AmountHint,
  ExchangeRateContainer,
  FeeSpot,
  HintText,
  LimitAmount,
  LimitLabel,
  QRCodeImg,
  TransferLabel,
  TransferValue,
} from "@/components/styled-component/Deposit";

type Props = {
  currentChannel?: TransferChannel
}

/**
 * 輸入金額 UI
 */
export const DepositAmountInput = ({
  currentChannel
}: Props) => {
  const {formData, setFormData} = useContext(DepositFormContext);
  const currencyRate = brandConfig[mapBrandName(config.brand)].currencyRate;
  const amount = Number(formData.amount);
  const transferFee = currentChannel?.fees;
  
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

      <AmountHint>
        {!!transferFee && (
          <FeeSpot>
            {i18n.t("fees.deposit")}: <span>{`${transferFee} %`}</span>
          </FeeSpot>
        )}
        <TransferHint>
          {`${Common.formatCurrency(formData.minAmount)} - ${Common.formatCurrency(formData.maxAmount)}${i18n.t("deposit.dollor")}`}
        </TransferHint>
        {currencyRate && <CurrencyHint>
          {
            !isNaN(amount) ?
            `${Common.formatCurrency(amount * currencyRate)}` :
            '0'
          } {
            config.currency
          }
        </CurrencyHint>}
      </AmountHint>
    </ItemContainer>
  );
};