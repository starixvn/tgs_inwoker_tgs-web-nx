import React, { ChangeEvent } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { Select, SelectChangeEvent } from "@mui/material";
import config from "@tgs-web-nx/config";
import styled from "styled-components";
import { useGameStore } from "@tgs-web-nx/core";
// import { Select } from "@/components/UI/Select";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // 默认图标
import ArrowRightImg from "@/assets/t31/images/transfer/arrow-right.svg";
import { Button } from "@/components/UI/Button";
import { theme } from "@/theme";
import { GrayInputWrapper } from "@/components/styled-component/auth/GrayInputWrapper";
import { media } from "@/theme/breakpoints";

const QuickTransferContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  /* & > * {
    height: 50px;
    max-width: 200px;
  } */

  ${media.lg} {
    flex-wrap: nowrap;
  }
`;

const QuickTransferArrow = styled.div`
  flex-shrink: 0;
  display: flex;
  width: 14px;
  height: 14px;
  align-self: center;
  margin: 0 10px;
`;

const AmountWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  background: #12281e;
  padding: 17px 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AmountText = styled.div`
  flex-shrink: 0;
  color: ${({ theme }) => theme.white50};
`;

const CurrencyTextFieldReplacement = styled.input`
  width: 100%;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  ::placeholder {
    color: ${({ theme }) => theme.white50};
  }
`;

type Props = {
  transferFrom: string;
  handleTransferFromChange: (e: SelectChangeEvent<any>) => void;
  transferTo: string;
  handleTransferToChange: (e: SelectChangeEvent<any>) => void;
  mainAccountId: string;
  transferAmount: string;
  handleTransferAmountChange: (e: ChangeEvent<any>) => void;
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
      <Select
        native
        fullWidth
        variant="outlined"
        value={transferFrom}
        displayEmpty
        onChange={handleTransferFromChange}
        sx={{
          maxWidth: "200px",
          color: theme.text,
          background: "#12281E",
          ".MuiSvgIcon-root ": {
            fill: "white !important",
          },
        }}
      >
        <option style={{ background: theme.black }} value={mainAccountId}>
          {i18n.t("transfer.mainAccount")}
        </option>
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
            <option style={{ background: theme.black }} value={item.gpcode} key={index}>
              {item.name}
            </option>
          ))}
      </Select>

      <QuickTransferArrow>
        <img src={ArrowRightImg} alt="arrow-right" />
      </QuickTransferArrow>

      <Select
        native
        fullWidth
        variant="outlined"
        value={transferTo}
        displayEmpty
        onChange={handleTransferToChange}
        sx={{
          maxWidth: "200px",
          color: theme.text,
          background: "#12281E",
          ".MuiSvgIcon-root ": {
            fill: "white !important",
          },
        }}
      >
        <option style={{ background: theme.black }} value={mainAccountId}>
          {i18n.t("transfer.mainAccount")}
        </option>
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
            <option style={{ background: theme.black }} value={item.gpcode} key={index}>
              {item.name}
            </option>
          ))}
      </Select>

      <AmountWrapper>
        <AmountText>{i18n.t("common.amount")}</AmountText>
        <CurrencyTextFieldReplacement
          value={transferAmount}
          placeholder="0"
          onChange={handleTransferAmountChange}
          autoComplete="off"
          type={"number"}
        />
      </AmountWrapper>

      <Button
        disabled={transferFrom === "" || transferTo === "" || disabled}
        onClick={() => handleTransferClick().then()}
        style={{
          color: theme.text,
          background: theme.primaryGradient,
          height: "50px",
          minWidth: "212px",
          padding: "13px",
        }}
      >
        {i18n.t("common.submit")}
      </Button>
    </QuickTransferContainer>
  );
};

export default QuickTransfer;
