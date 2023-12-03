import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import styled from "styled-components";
import { useGameStore } from "@tgs-web-nx/core";
import { SelectChangeEvent } from "@mui/material";
import { Select } from "@/components/UI/Select";
import { FormControl } from "@/components/styled-component/ProfileForms";
import ArrowRightPNG from "@/assets/t29/images/transfer/arrow-right.png";
import { Button } from "@/components/UI/Button";

const QuickTransferContainer = styled.div`
  display: flex;
`;
const QuickTransferArrow = styled.div`
  width: 23px;
  height: 18px;
  float: left;
  background: url(${ArrowRightPNG}) no-repeat;
  margin: 10px 10px 0 8px;
`;
const QuickTransferLabel = styled.div`
  float: left;

  font-size: 16px;
  margin: 8px 10px 0 18px;
  color: #818181;
`;

const CurrencyTextFieldReplacement = styled.input`
  height: 35px;
  width: 154px;
  border-radius: 4px;
  border: solid 1px #b6b6b6;
  padding: 0px 10px;

  ::placeholder {
    color: #818181;
  }

  :focus {
    outline: none;
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

      <QuickTransferArrow />
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

      <QuickTransferLabel>{i18n.t("common.amount")}</QuickTransferLabel>
      <CurrencyTextFieldReplacement
        value={transferAmount}
        placeholder="0.00"
        onChange={handleTransferAmountChange}
        autoComplete="off"
        minimumValue="0"
        inputProps={{
          maxLength: 15,
        }}
      />
      <Button
        disabled={transferFrom === "" || transferTo === "" || disabled}
        onClick={() => handleTranferClick()}
      >
        {i18n.t("transfer.transfer")}
      </Button>
    </QuickTransferContainer>
  );
};

export default QuickTransfer;
