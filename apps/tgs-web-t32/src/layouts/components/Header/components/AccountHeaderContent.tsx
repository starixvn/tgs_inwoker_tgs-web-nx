import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useWalletStore } from "@tgs-web-nx/core";
import { Common, i18n } from "@tgs-web-nx/utils";
import Icon from "@/components/project/Icon";
import iconAccount from "@/assets/t32/images/header/icon-account.svg";

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
`;

const BalanceValue = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 0.75rem;
  background: ${({ theme }) => theme.maskBlack20};
  padding: 3px;
  min-width: 100px;
  text-align: center;
  border-radius: 4px;
`;

const BalanceLabel = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 0.75rem;
`;

const AccountLabel = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 0.75rem;
`;

const AccountHeaderContent = () => {
  const history = useHistory();
  const { wallet } = useWalletStore();

  const currentBalance = `${Common.formatNumberWithThousand(wallet.mainBalance)}`;

  const handleGoToAccount = () => {
    history.push("/account");
  };

  const handleGoToDeposit = () => {
    history.push("/deposit");
  };

  return (
    <ContentWrapper>
      <ButtonContainer onClick={handleGoToDeposit}>
        <BalanceValue>${currentBalance}</BalanceValue>

        <BalanceLabel>{i18n.t("wap.main.home.profile.mainAccount")}</BalanceLabel>
      </ButtonContainer>

      <ButtonContainer onClick={handleGoToAccount}>
        <Icon iconUrl={iconAccount} width={"20px"} height={"20px"} />
        <AccountLabel>{i18n.t("common.member")}</AccountLabel>
      </ButtonContainer>
    </ContentWrapper>
  );
};

export default AccountHeaderContent;
