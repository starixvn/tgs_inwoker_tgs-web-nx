import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import { TextField } from "@/components/UI/TextField";
import WalletSelect from "@/pages/transfer/components/WalletSelect";
import { theme } from "@/theme";

const TransferCardContainer = styled.div`
  background: ${({ theme }) => theme.grey01};
  color: ${({ theme }) => theme.primary};
  padding: 12px 15px;
  border-radius: 10px;

  & > div {
    font-size: 0.875rem !important;
    margin-bottom: 6px;
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

const Spacing = styled.div`
  height: 14px;
`;

type Props = {
  fromWallet: string;
  handleChangeFromWallet: (e: ChangeEvent) => void;
  toWallet: string;
  handleChangeToWallet: (e: ChangeEvent) => void;
  transferAmount: string;
  handleChangeTransferAmount: (e: ChangeEvent) => void;
  mainAccountId: string; // "0",
  children: React.ReactNode;
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
  const { mainWalletBalance, providerList } = useUserWalletInfoContext();

  return (
    <TransferCardContainer>
      <RowContainer>
        <ColContainer>{i18n.t("transfer.mainAccount")}</ColContainer>
        <ColContainer>{Common.formatNumberWithCommas(mainWalletBalance)}</ColContainer>
      </RowContainer>

      <RowContainer>
        <ColContainer>{i18n.t("transfer.transferFromWallet")}</ColContainer>
        <ColContainer>
          <WalletSelect
            value={fromWallet}
            handleChange={handleChangeFromWallet}
            providerList={providerList}
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
            providerList={providerList}
            mainAccountId={mainAccountId}
          />
        </ColContainer>
      </RowContainer>

      <RowContainer>
        <ColContainer>{i18n.t("common.amount")}</ColContainer>
        <ColContainer>
          <TextField
            type={"number"}
            placeholder={"0"}
            value={transferAmount}
            onChange={handleChangeTransferAmount}
            sx={{
              background: theme.grey02,
              borderRadius: "4px",
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
