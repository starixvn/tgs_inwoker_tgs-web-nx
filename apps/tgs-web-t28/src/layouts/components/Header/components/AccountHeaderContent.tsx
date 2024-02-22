import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAccountStore, useWalletStore } from "@tgs-web-nx/core";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useAuthContext, useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import iconAccount from "@/assets/t28/images/header/icon-account.svg";
import iconLogout from "@/assets/t28/images/header/icon-logout.svg";
import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";
import { useGoToHomePage } from "@/hooks/useGoToHomePage";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 200px;
`;

const BascicButton = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  height: 44px;
  padding: 10px 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 590;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  flex-shrink: 0;
`;

const BalanceContainer = styled(BascicButton)`
  background: ${({ theme }) => theme.inputBGC};
  color: ${({ theme }) => theme.text};
  cursor: unset;
`;

const WithDrawButton = styled(BascicButton)`
  background: ${({ theme }) => theme.memberSection};
  color: ${({ theme }) => theme.lightPurple};
  border: ${({ theme }) => `1px solid ${theme.lightPurple}`};
`;

const DepositButton = styled(BascicButton)`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
`;

const LogoutButton = styled(BascicButton)`
  background: ${({ theme }) => theme.inputBGC};
  color: ${({ theme }) => theme.text};
  gap: 4px;
`;

const AccountIcon = styled.div`
  cursor: pointer;
`;

const AccountHeaderContent = () => {
  const history = useHistory();
  const { wallet } = useWalletStore();
  const { handleLogout } = useAuthContext();
  const goToHomePage = useGoToHomePage();
  const { isLargeDesktopSize, isDesktopSize, isMobileSize } = useRwd();
  const { mainSymbol, mainWalletBalance, transferWalletBalance } = useUserWalletInfoContext();

  const currentBalance =
    mainSymbol + "$ " + Common.formatNumberWithThousand(mainWalletBalance + transferWalletBalance);
  const handleClickLogout = async () => {
    await handleLogout();
    goToHomePage();
  };

  return (
    <ButtonContainer>
      {isDesktopSize && <BalanceContainer>{currentBalance}</BalanceContainer>}

      <DepositButton
        onClick={() => {
          history.push("/deposit");
        }}
      >
        {i18n.t("common.deposit").toUpperCase()}
      </DepositButton>
      {isMobileSize && <HeaderLanguageSwitch />}
      {isDesktopSize && (
        <>
          <WithDrawButton
            onClick={() => {
              history.push("/withdrawal");
            }}
          >
            {i18n.t("common.withdrawal").toUpperCase()}
          </WithDrawButton>
          <AccountIcon
            onClick={() => {
              history.push("/profile");
            }}
          >
            <img src={iconAccount} alt="profile" />
          </AccountIcon>
          <LogoutButton onClick={handleClickLogout}>
            {i18n.t("web.header.logout").toLocaleUpperCase()}
            <span>
              <img src={iconLogout} alt="logout" />
            </span>
          </LogoutButton>
        </>
      )}
    </ButtonContainer>
  );
};

export default AccountHeaderContent;
