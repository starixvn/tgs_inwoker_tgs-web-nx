import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import { FormControl as MuiFormControl } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import { TextField } from "@/components/UI/TextField";
import WalletSelect from "@/pages/transfer/components/WalletSelect";
import { theme } from "@/theme";

const TransferCardContainer = styled.div`
  background: ${({ theme }) => theme.primaryLight};
  color: ${({ theme }) => theme.white};
  padding: 12px;
  & * {
    font-size: 15px !important;
  }

  input,
  input::placeholder {
    font-size: 15px !important;
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
  borderRadius: "5px",
  border: `1px solid ${theme.palette.tertiary.main}`,
  width: "100%",
  fontSize: "0.937rem",
  "& fieldset": {
    border: "none",
  },
}));

const Spacing = styled.div`
  margin-bottom: 10px;
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
              border: `1px solid ${theme.gray01}`,
              borderRadius: "5px",
              "& input": {
                padding: "6.5px 8px",
              },
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
