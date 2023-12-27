import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAccountStore, useWalletStore } from "@tgs-web-nx/core";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useAuthContext, useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import Icon from "@/components/project/Icon";
import iconAccount from "@/assets/t19/images/header/icon-account.svg";
import iconBalance from "@/assets/t19/images/header/icon-balance.svg";
import iconDeposit from "@/assets/t19/images/header/icon-deposit.svg";
import accountBtn from "@/assets/t19/images/header/account-btn.svg";
import liveChatBtn from "@/assets/t19/images/header/live-chat-btn.svg";
import signoutBtn from "@/assets/t19/images/header/sign-out.svg";
import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";
import { theme } from "@/theme";
import { HeaderButton } from "@/layouts/components/Header/components/HeaderButton";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 10px;
`;

const UsernameContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.white};
  gap: 16px;
`;

const IconContainer = styled.div`
  cursor: pointer;
`;

const BalanceContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.primary};
  font-size: 1rem;
  font-weight: 400;
  gap: 16px;
`;

const DepositContainer = styled.div`
  height: 35px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.black};
  background: ${({ theme }) => theme.primaryGradient};
  font-size: 1rem;
  font-weight: 400;
  gap: 12px;
  border-radius: 10px;
  cursor: pointer;
`;

const SignoutContainer = styled.div`
  height: 34px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.black};
  background: ${({ theme }) => theme.silverGradient};
  font-size: 1rem;
  font-weight: 400;
  gap: 12px;
  border-radius: 10px;
  cursor: pointer;
`;

const AccountHeaderContent = () => {
  const history = useHistory();
  const { account } = useAccountStore();
  const { wallet } = useWalletStore();
  const { handleLogout } = useAuthContext();
  const { isDesktopSize, isMobileSize } = useRwd();
  const { handleChangeGameType } = useHomeGameContext();
  const { handleToggleMenu } = useHeader();

  const currentBalance = `${Common.formatNumberWithThousand(wallet.mainBalance)}`;
  const username = account.info.member_username;

  const handleGoToProfile = () => {
    history.push("/profile");
  };

  const handleClickLogout = async () => {
    await handleLogout();
    handleChangeGameType(GameTypeEnum.NONE);
    history.push("/");
  };

  const handleGotoWithdrawal = useCallback(() => {
    handleToggleMenu(false);
    history.push("/withdrawal");
  }, []);

  const handleGotoDeposit = useCallback(() => {
    handleToggleMenu(false);
    history.push("/deposit");
  }, []);

  return (
    <ButtonContainer>
      {isDesktopSize &&
        <>
          <UsernameContainer onClick={() => history.push("/account")}>
            <Icon
              iconUrl={iconAccount}
              width={"24px"}
              height={"24px"}
            />
            {username}
          </UsernameContainer>
          <BalanceContainer>
            <Icon
              iconUrl={iconBalance}
              width={"24px"}
              height={"24px"}
            />
            ${currentBalance}
          </BalanceContainer>
          <DepositContainer onClick={handleGotoDeposit}>
            <Icon
              iconUrl={iconDeposit}
              width={"19px"}
              height={"22px"}
            />
            {i18n.t("common.deposit")}
          </DepositContainer>
          <IconContainer onClick={handleGoToProfile}>
            <Icon
              iconUrl={accountBtn}
              width={"35px"}
              height={"35px"}
            />
          </IconContainer>
          <IconContainer>
            <Icon
              iconUrl={liveChatBtn}
              width={"35px"}
              height={"35px"}
            />
          </IconContainer>
          <SignoutContainer onClick={handleClickLogout}>
            <Icon
              iconUrl={signoutBtn}
              width={"18px"}
              height={"18px"}
            />
            {i18n.t("web.header.logout")}
          </SignoutContainer>
          <HeaderLanguageSwitch />
        </>}

      {isMobileSize && <>
        <HeaderButton
          onClick={handleGotoWithdrawal}
          style={{
            color: theme.black,
            background: theme.silverGradient,
          }}
        >
          {i18n.t("common.withdrawal")}
        </HeaderButton>
        <HeaderButton
          color={"primary"}
          onClick={handleGotoDeposit}
          style={{
            color: theme.black,
            background: theme.goldGradient,
          }}
        >
          {i18n.t("common.deposit")}
        </HeaderButton>
      </>}
    </ButtonContainer>
  );
};

export default AccountHeaderContent;
