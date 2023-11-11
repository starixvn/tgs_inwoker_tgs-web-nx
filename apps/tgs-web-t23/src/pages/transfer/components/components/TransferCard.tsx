import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { FormControl as MuiFormControl, styled as muiStyled } from "@mui/material";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useGameStore, useWalletStore } from "@tgs-web-nx/core";
import { TextField } from "@/components/UI/TextField";
import WalletSelect from "@/pages/transfer/components/components/WalletSelect";

const TransferCardContainer = styled.div`
  background: ${({ theme }) => theme.tertiary};
  color: ${({ theme }) => theme.white};
  padding: 12px 15px;
  border-radius: 10px;

  & > div {
    font-size: 0.875rem !important;
    margin-bottom: 20px;
  }

  input,
  input::placeholder {
    font-size: 0.875rem !important;
    padding: 0;
  }
`;

const RowContainer = styled.div`
  min-height: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ColContainer = styled.div`
  width: 50%;
`;

const FormControl = muiStyled(MuiFormControl)(({ theme }) => ({
  borderRadius: "30px",
  border: `1px solid white`,
  width: "100%",
  fontSize: "0.937rem",
  padding: "2px 15px",
  "& fieldset": {
    border: "none",
  },
}));

const Spacing = styled.div`
  margin-bottom: 10px;
`;

export interface TransferWallet {
  abbreviation: string;
  balance: number;
}

type Props = {
  fromWallet: string;
  handleChangeFromWallet: (e: ChangeEvent) => void;
  toWallet: string;
  handleChangeToWallet: (e: ChangeEvent) => void;
  transferAmount: string;
  handleChangeTransferAmount: (e: ChangeEvent) => void;
  mainAccountId: string; // "0",
  children: React.ReactElement;
};
const TransferCard = ({
  fromWallet,
  handleChangeFromWallet,
  toWallet,
  handleChangeToWallet,
  transferAmount,
  handleChangeTransferAmount,
  mainAccountId,
  children,
}: Props) => {
  const { wallet, getGameBalance } = useWalletStore();
  const { game } = useGameStore();
  const [transferWallets, setTransferWallets] = useState<TransferWallet[]>([]);

  const getAllGameBalance = useCallback(async () => {
    if (!game.providerList.length) return;

    const newWalletBalance: TransferWallet[] = [];
    const promiseList = game.providerList
      .filter((provider) => provider.status === 0 && provider.transferwallet === true)
      .filter((provider) => provider.gpcode !== "NTTF" && provider.gpcode !== "RTTF")
      .map((provider) => {
        return getGameBalance(provider.gpcode).then((response) => {
          if (!response) {
            console.log(provider.gpcode);
          } else {
            if (response.IsSuccess) {
              newWalletBalance.push({
                abbreviation: provider.abbreviation,
                balance: response.data.balance,
              });
            }
          }
        });
      });

    await Promise.all(promiseList);
    setTransferWallets(newWalletBalance);
  }, [JSON.stringify(game.providerList)]);

  useEffect(() => {
    if (!game.providerList.length) return;

    getAllGameBalance().then();
  }, [game.providerList.length]);

  useEffect(() => {
    if (!wallet.transferResult?.IsSuccess) return;

    getAllGameBalance().then();
  }, [wallet.transferResult]);

  return (
    <TransferCardContainer>
      <RowContainer>
        <ColContainer>{i18n.t("transfer.mainAccount")}</ColContainer>

        <ColContainer>{Common.formatNumberWithCommas(wallet.mainBalance)}</ColContainer>
      </RowContainer>

      <RowContainer>
        <ColContainer>{i18n.t("transfer.transferFromWallet")}</ColContainer>
        <ColContainer>
          <WalletSelect
            value={fromWallet}
            handleChange={handleChangeFromWallet}
            walletBalance={transferWallets}
            mainAccountId={mainAccountId}
          />
        </ColContainer>
      </RowContainer>

      <RowContainer>
        <ColContainer>{i18n.t("transfer.transferToWallet")}</ColContainer>
        <ColContainer>
          <WalletSelect
            value={toWallet}
            handleChange={handleChangeToWallet}
            walletBalance={transferWallets}
            mainAccountId={mainAccountId}
          />
        </ColContainer>
      </RowContainer>

      <RowContainer>
        <ColContainer>{i18n.t("common.amount")}</ColContainer>
        <ColContainer>
          <TextField
            type={"number"}
            placeholder={i18n.t("transfer.msgEnterAmount")}
            value={transferAmount}
            onChange={handleChangeTransferAmount}
            sx={{
              border: "1px solid white",
              borderRadius: "30px",
            }}
          />
        </ColContainer>
      </RowContainer>

      <Spacing />

      {children}
    </TransferCardContainer>
  );
};

export default React.memo(TransferCard);
