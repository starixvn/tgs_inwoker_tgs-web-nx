import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import { useWalletStore } from "@tgs-web-nx/core";
import { useState, useContext } from "react";
import { SelectChangeEvent } from "@mui/material";
import { DepositFormContext } from "./DepositFormProvider";
import {
  FormControl,
  ItemContainer,
  LabelContainer
} from "@/components/styled-component/ProfileForms";
import { Select } from "@/components/UI/Select";
import {DepositBankType} from '@/pages/deposit/components/DepositForm/types';

const defaultValue = '';
const {
  Deposit_RemoveAccount,
  Deposit_AddCard,
  Deposit_ManualApplePayHideBankAcc,
  Deposit_OriginAccount
} = config.features;

type Props = {
  banktype: DepositBankType | null
}

export const DepositSelectBankName = ({
  banktype
}: Props) => {
  const {wallet: {bankCardList}} = useWalletStore();
  const {formData, setFormData} = useContext(DepositFormContext);
  const [selectedBankCard, setSelectedBankCard] = useState(defaultValue);
  const isVisible = !(Deposit_RemoveAccount || Deposit_AddCard || Deposit_ManualApplePayHideBankAcc);
  const label = i18n.t("idr1.msgPlsSelectAccount");

  /**
   * 處理銀行名稱切換選項
   */
  const handleSelectAccountChange = (e: SelectChangeEvent<any>) => {
    setSelectedBankCard(e.target.value);
    setFormData({...formData, account: e.target.value});
  };

  if(isVisible) {
    return (
      <ItemContainer>

        {/* 標題 */}
        <LabelContainer>
          {label}
        </LabelContainer>

        {/* Select */}
        <FormControl variant="outlined">
          <Select
            native
            id="customSelect"
            value={selectedBankCard}
            onChange={handleSelectAccountChange}
          >
            <option value={defaultValue} disabled>
              {label}
            </option>

            {bankCardList
              .filter((item) => {
                if(banktype) {
                  return item.banktype === banktype
                }
                return item.banktype === 'ThirdParty' || item.banktype === 'Bank';
              })
              .map((item, index) => {
              const {detail: {bankAccount, address, phone}} = item;
              const value = bankAccount || address || phone;
              return (
                <option value={value} key={index}>
                  {value} {item.banktype}
                </option>
              );
            })}
          </Select>
        </FormControl>

      </ItemContainer>
    )
  }

  return null;
}
