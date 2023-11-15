import React, { useState } from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useGameStore, useWalletStore } from "@tgs-web-nx/core";
import { SubmitButton } from "@/components/styled-component/ProfileForms";

const CustomLabel = styled.div`
  font-size: 18px;
  font-weight: 400;
  margin-left: 3px;
  color: ${({ theme }) => theme.black};
`;

const ButtonWrapper = styled.div`
  margin: 15px 0 0 0;
  display: flex;
`;

type Props = {
  label?: string;
  buttonText?: string;
};
const WithdrawAllToMainWallet = ({ label = "", buttonText = "", ...others }: Props) => {
  const { game } = useGameStore();
  const { performWithdrawFromEveryBrand, getGameBalance } = useWalletStore();
  const [isLoading, setIsLoading] = useState(false);

  const getAllGameBalance = async () => {
    const promiseList = game.providerList
      .filter((provider) => provider.status === 0 && provider.transferwallet)
      .filter((provider) => provider.abbreviation !== "NTTF" && provider.abbreviation !== "RTTF")
      .map((provider) => {
        return getGameBalance(provider.gpcode);
      });

    await Promise.all(promiseList);
  };

  const handleClick = async () => {
    setIsLoading(true);
    await performWithdrawFromEveryBrand();
    await getAllGameBalance();
    setIsLoading(false);
  };
  return (
    <>
      {label && <CustomLabel>{label}</CustomLabel>}
      {/*一键傳輸*/}
      <ButtonWrapper {...others}>
        <SubmitButton
          variant={"contained"}
          onClick={handleClick}
          color={"primary"}
          fullWidth
          disabled={isLoading}
        >
          {buttonText || i18n.t("transfer.oneKeyTransferAll")}
        </SubmitButton>
      </ButtonWrapper>
    </>
  );
};

export default React.memo(WithdrawAllToMainWallet);
