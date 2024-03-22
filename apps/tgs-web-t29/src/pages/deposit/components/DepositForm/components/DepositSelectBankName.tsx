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

const defaultValue = '';
const {
  Deposit_RemoveAccount,
  Deposit_AddCard,
  Deposit_ManualApplePayHideBankAcc,
  Deposit_OriginAccount
} = config.features;

type Props = {
  banktype?: string
}

export const DepositSelectBankName = ({
  banktype
}: Props) => {
  const {wallet: {bankCardList}} = useWalletStore();
  const {formData, setFormData} = useContext(DepositFormContext);
  const [selectedBankCard, setSelectedBankCard] = useState(defaultValue);
  const isVisible = !(Deposit_RemoveAccount || Deposit_AddCard || Deposit_ManualApplePayHideBankAcc);
  const label = i18n.t(Deposit_OriginAccount ? "idr1.pleaseEnterAccountName" : "common.pleaseEnterAccountName");

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
              .filter(item => item.banktype === banktype)
              .map((item, index) => {
              const {detail} = item;
              return (
                <option value={detail.bankAccount || detail.address || detail.phone} key={index}>
                  {detail.bankAccount || detail.address || detail.phone} {banktype}
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