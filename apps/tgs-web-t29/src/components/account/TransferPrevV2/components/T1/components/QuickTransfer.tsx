import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { FormControl as MuiFormControl, styled as muiStyled } from "@mui/material";
import config from "@tgs-web-nx/config";
import styled from "styled-components";
import { useGameStore } from "@tgs-web-nx/core";
import { SelectChangeEvent } from "@mui/material";
import { Select } from "@/components/UI/Select";
import ArrowRightPNG from "@/assets/t29/images/transfer/arrow-right.png";
import { Button } from "@/components/UI/Button";
import { theme } from "@/theme";

const QuickTransferContainer = styled.div`
  display: flex;
`;
const FormControl = muiStyled(MuiFormControl)(({ theme }) => ({
  border: `1px solid ${theme.palette.gray10}`,
})) as typeof MuiFormControl;

const QuickTransferArrow = styled.div`
  display: flex;
  width: 23px;
  height: 23px;
  align-self: center;
  margin: 0 10px;
`;

const AmountInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border: ${({ theme }) => `1px solid ${theme.gray10}`};
  padding: 17px;
  margin: 0 10px;
`;

const AmountText = styled.div`
  color: ${({ theme }) => theme.gray50};
`;

const CurrencyTextFieldReplacement = styled.input`
  text-align: right;
  border: none;
  ::placeholder {
    color: ${({ theme }) => theme.gray50};
  }
`;

type Props = {
  transferFrom: string;
  handleTransferFromChange: (e: SelectChangeEvent<any>) => void;
  transferTo: string;
  handleTransferToChange: (e: SelectChangeEvent<any>) => void;
  mainAccountId: string;
  transferAmount: number;
  handleTransferAmountChange: (e: SelectChangeEvent<any>) => void;
  disabled: boolean;
  handleTranferClick: Promise<void>;
};
const QuickTransfer = ({
  transferFrom,
  handleTransferFromChange,
  transferTo,
  handleTransferToChange,
  mainAccountId,
  transferAmount,
  handleTransferAmountChange,
  disabled,
  handleTranferClick,
}: Props) => {
  const { game } = useGameStore();

  return (
    <QuickTransferContainer>
      <FormControl>
        <Select
          native
          variant="outlined"
          value={transferFrom}
          displayEmpty
          onChange={handleTransferFromChange}
        >
          <option value={mainAccountId}>{i18n.t("transfer.mainAccount")}</option>
          {game.providerList
            .filter((provider) => provider.status === 0 && provider.transferwallet === true)
            .filter((provider) => {
              if (config.features.MergeEVORTNT) {
                if (
                  !(
                    provider.gpcode === "NTTF" ||
                    provider.gpcode === "RTTF" ||
                    provider.gpcode === "BTG" ||
                    provider.gpcode === "NLC"
                  )
                ) {
                  return provider;
                }
              } else {
                return provider;
              }
            })
            .map((item, index) => (
              <option value={item.gpcode} key={index}>
                {item.name}
              </option>
            ))}
        </Select>
      </FormControl>

      <QuickTransferArrow>
        <img src={ArrowRightPNG} alt="arrow-right" />
      </QuickTransferArrow>
      <FormControl>
        <Select
          native
          variant="outlined"
          value={transferTo}
          displayEmpty
          onChange={handleTransferToChange}
        >
          <option value={mainAccountId}>{i18n.t("transfer.mainAccount")}</option>
          {game.providerList
            .filter((item) => item.status === 0 && item.transferwallet === true)
            .filter((e) => {
              if (config.features.MergeEVORTNT) {
                if (
                  !(
                    e.gpcode === "NTTF" ||
                    e.gpcode === "RTTF" ||
                    e.gpcode === "BTG" ||
                    e.gpcode === "NLC"
                  )
                ) {
                  return e;
                }
              } else {
                return e;
              }
            })
            .map((item, index) => (
              <option value={item.gpcode} key={index}>
                {item.name}
              </option>
            ))}
        </Select>
      </FormControl>

      <AmountInputContainer>
        <AmountText>{i18n.t("common.amount")}</AmountText>
        <div>
          <CurrencyTextFieldReplacement
            value={transferAmount}
            placeholder="0"
            onChange={handleTransferAmountChange}
            autoComplete="off"
            minimumValue="0"
            inputProps={{
              maxLength: 15,
            }}
          />
        </div>
      </AmountInputContainer>

      <Button
        disabled={transferFrom === "" || transferTo === "" || disabled}
        onClick={() => handleTranferClick()}
        style={{ color: theme.white, background: theme.primary }}
      >
        {i18n.t("common.submit")}
      </Button>
    </QuickTransferContainer>
  );
};

export default QuickTransfer;
