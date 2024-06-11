import { i18n, Common } from "@tgs-web-nx/utils";
import { TransferChannel } from "@tgs-web-nx/types";
import { useContext, ChangeEvent } from "react";
import config, { brandConfig, mapBrandName } from "@tgs-web-nx/config";
import styled from "styled-components";
import { DepositFormContext } from "@tgs-web-nx/core/hooks";
import { LabelContainer, CurrencyHint, WarningText } from "../components";
import { FormControl, ItemContainer } from "@/components/styled-component/ProfileForms";
import { TextField } from "@/components/UI/TextField";
import {AmountHint} from "@/components/styled-component/Deposit";

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
  const feePercentile = currentChannel?.feepercentile;
  const renderFee = () => {
    if(transferFee) {
      return (
        <WarningText style={{marginBottom: '10px'}}>{`${i18n.t("fees.deposit")}: ${transferFee} %`}</WarningText>
      )
    }

    if(feePercentile) {
      return (
        <WarningText style={{marginBottom: '10px'}}>{`${i18n.t("fees.deposit")}: ${feePercentile} %`}</WarningText>
      )
    }
    
    return null;
  }

  const isUsdt = currentChannel?.banktype === 'Usdt';
  const isShowCurrencyRate = currencyRate && !isUsdt;
  const placeHolder = `${i18n.t("deposit.msgPleaseEnter")} ${isUsdt ? i18n.t("withdrawal.usdtAmount") : ''} ${Common.formatCurrency(formData.minAmount)} - ${Common.formatCurrency(formData.maxAmount)} ${i18n.t("deposit.dollor")}`
  
  /**
   * 處理輸入金額
   */
  const handleOnChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, amount: e.target.value});
  };

  return (
    <ItemContainer style={{width: "100%"}}>
      <LabelWrapper>
        <LabelContainer>{i18n.t("deposit.depositAmount")}</LabelContainer>
        {renderFee()}
      </LabelWrapper>
      <FormControl variant="outlined">
        <TextField
          fullWidth
          value={formData.amount}
          onChange={handleOnChangeAmount}
          type="tel"
          placeholder={placeHolder}
        />
      </FormControl>

      <AmountHint>
        {isShowCurrencyRate && <CurrencyHint>
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

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;