import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { SelectChangeEvent } from "@mui/material";
import config from "@tgs-web-nx/config";
import styled from "styled-components";
import { useGameStore } from "@tgs-web-nx/core";
import { Select } from "@/components/UI/Select";
import ArrowRightPNG from "@/assets/t17/images/transfer/arrow-right.svg";
import { Button } from "@/components/UI/Button";
import { theme } from "@/theme";
import { GrayInputWrapper } from "@/components/styled-component/auth/GrayInputWrapper";
import { media } from "@/theme/breakpoints";

const QuickTransferContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;

  & > div:nth-child(1),
  & > div:nth-child(3) {
    max-width: 240px;
    height: 40px;
  }

  & > div:nth-child(4) {
    max-width: 360px;
    height: 40px;
  }

  ${media.lg} {
    flex-wrap: nowrap;
  }
`;

const QuickTransferArrow = styled.div`
  flex-shrink: 0;
  display: flex;
  width: 14px;
  height: 9px;
  align-self: center;
  margin: 0 10px;
`;

const AmountWrapper = styled.div`
  padding: 10px 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;

const AmountText = styled.div`
  flex-shrink: 0;
  color: ${({ theme }) => theme.white};
`;

const CurrencyTextFieldReplacement = styled.input`
  background: none;
  text-align: right;
  border: none;
  color: ${({ theme }) => theme.white};
  ::placeholder {
    color: ${({ theme }) => theme.white};
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
  handleTransferClick: () => Promise<void>;
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
  handleTransferClick,
}: Props) => {
  const { game } = useGameStore();

  return (
    <QuickTransferContainer>
      <GrayInputWrapper>
        <Select
          native
          fullWidth
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
      </GrayInputWrapper>

      <QuickTransferArrow>
        <img src={ArrowRightPNG} alt="arrow-right" />
      </QuickTransferArrow>

      <GrayInputWrapper>
        <Select
          native
          fullWidth
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
      </GrayInputWrapper>

      <GrayInputWrapper>
        <AmountWrapper>
          <AmountText>{i18n.t("common.amount")}</AmountText>
          <div>
            <CurrencyTextFieldReplacement
              value={transferAmount}
              placeholder="0"
              onChange={handleTransferAmountChange}
              autoComplete="off"
              type={"number"}
            />
          </div>
        </AmountWrapper>
      </GrayInputWrapper>

      <Button
        disabled={transferFrom === "" || transferTo === "" || disabled}
        onClick={() => handleTransferClick().then()}
        style={{
          color: theme.black,
          background: theme.primaryGradient,
          width: "143px",
          height: "40px",
          padding: "13px",
          borderRadius: "10px",
        }}
      >
        {i18n.t("common.transfer")}
      </Button>
    </QuickTransferContainer>
  );
};

export default QuickTransfer;
