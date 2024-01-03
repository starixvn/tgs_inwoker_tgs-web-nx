import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAccountStore, useWalletStore } from "@tgs-web-nx/core";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useAuthContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useGoToHomePage } from "@tgs-web-nx/core/hooks";
import Icon from "@/components/project/Icon";
import TransferButtonGroup from "@/layouts/components/Header/components/TransferButtonGroup";
import iconAccount from "@/assets/t26/images/header/icon-account.svg";
import iconBalance from "@/assets/t26/images/header/icon-balance.svg";
import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";
import { media } from "@/theme/breakpoints";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/layouts/components/Header/components/HeaderButton";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UsernameContainer = styled.div`
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ theme }) => theme.text};

  ${media.sm} {
    color: ${({ theme }) => theme.white};
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 36px;
  border: ${({ theme }) => `1px solid ${theme.darkGray}`};
  border-radius: 10px;
  cursor: pointer;
`;

const BalanceContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.primary};
  border: ${({ theme }) => `1px solid ${theme.darkGray}`};
  border-radius: 10px;
  padding: 10px 6px;
  font-size: 15px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  gap: 10px;
`;

const AccountHeaderContent = () => {
  const history = useHistory();
  const { account } = useAccountStore();
  const { wallet } = useWalletStore();
  const { handleLogout } = useAuthContext();
  const { isDesktopSize } = useRwd();
  const goToHomePage = useGoToHomePage();

  const currentBalance = `${Common.formatNumberWithThousand(wallet.mainBalance)}`;

  const handleGoToProfile = () => {
    history.push("/profile");
  };

  return (
    <ButtonContainer>
      <BalanceContainer>
        <Icon iconUrl={iconBalance} width={"20px"} height={"25px"} />
        <span>{currentBalance}</span>
      </BalanceContainer>
      <PrimaryButton
        onClick={() => {
          history.push("/withdrawal");
        }}
      >
        {i18n.t("common.withdrawal")}
      </PrimaryButton>
      <SecondaryButton
        onClick={() => {
          history.push("/deposit");
        }}
      >
        {i18n.t("common.deposit")}
      </SecondaryButton>
      {isDesktopSize && (
        <>
          <ProfileContainer onClick={handleGoToProfile}>
            <Icon iconUrl={iconAccount} width={"20px"} height={"25px"} />
          </ProfileContainer>
          <HeaderLanguageSwitch />
        </>
      )}
    </ButtonContainer>
  );
};

export default AccountHeaderContent;
