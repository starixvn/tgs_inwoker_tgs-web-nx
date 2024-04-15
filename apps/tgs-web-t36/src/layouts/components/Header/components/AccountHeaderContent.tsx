import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAccountStore, useWalletStore } from "@tgs-web-nx/core";
import { Common, i18n } from "@tgs-web-nx/utils";
import {
  useAuthContext,
  useHeader,
  useHomeGameContext,
  useUserWalletInfoContext,
} from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";
import { media } from "@/theme/breakpoints";
import memberIcon from "@/assets/t36/images/header/icon-account.svg";
import RefreshButton from "@/components/project/RefreshButton";

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-right: 10px;

  ${media.sm} {
    gap: 10px;
  }
`;

const IconContainer = styled.div`
  cursor: pointer;
`;

const BalanceContainer = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 13.8px;
  display: flex;
  height: 36px;
  align-items: center;
  gap: 5px;
  border-radius: 4px;
  background: ${({ theme }) => theme.g4};
  color: ${({ theme }) => theme.white};
`;

const ButtonContainer = styled.div`
  padding: 10px 12px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.white};
  border: 1.5px solid white;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  text-align: center;
  cursor: pointer;
`;

const TransferButtonContainer = styled(ButtonContainer)`
  background: ${({ theme }) => theme.BTN01};
  border: unset;
`;

const UserInfoContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const GreetingText = styled.div`
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  color: ${({ theme }) => theme.white};
  justify-content: center;
  align-items: center;
  align-self: center;
`;
const BalanceText = styled(GreetingText)``;

const UserName = styled.div`
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  color: ${({ theme }) => theme.yellow};
`;
const BalanceAmount = styled(UserName)`
  margin-right: 4px;
`;

const DesktopBalanceContainer = styled.div`
  display: flex;
  margin-left: 12px;
  align-items: center;
`;

const MemberContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const AccountHeaderContent = () => {
  const history = useHistory();
  const { account } = useAccountStore();
  const { wallet, getBalanceList } = useWalletStore();
  const { handleLogout } = useAuthContext();
  const { isDesktopSize, isMobileSize } = useRwd();
  const { handleChangeGameType } = useHomeGameContext();
  const { handleToggleMenu } = useHeader();
  const { mainSymbol, mainWalletBalance, transferWalletBalance } = useUserWalletInfoContext();
  const username = account.info.member_username;

  const currentBalance =
    mainSymbol + Common.formatNumberWithThousand(mainWalletBalance + transferWalletBalance);
  const handleGoToProfile = () => {
    history.push("/profile");
  };

  const handleClickLogout = async () => {
    await handleLogout();
    handleChangeGameType(GameTypeEnum.NONE);
    history.push("/");
  };

  const handleGotoDeposit = useCallback(() => {
    handleToggleMenu(false);
    history.push("/deposit");
  }, []);

  const handleGotoWithdraw = useCallback(() => {
    handleToggleMenu(false);
    history.push("/withdrawal");
  }, []);

  const handleGotoTransfer = useCallback(() => {
    handleToggleMenu(false);
    history.push("/transfer");
  }, []);

  const handleRefreshBalance = useCallback(async () => {
    await getBalanceList();
  }, [getBalanceList]);

  return (
    <MainContainer>
      {isDesktopSize && (
        <>
          <UserInfoContainer>
            <MemberContainer onClick={handleGoToProfile}>
              <img src={memberIcon} width={25} height={25} alt="memeber" />
            </MemberContainer>
            <GreetingText>Hello,</GreetingText>
            <UserName>{username}</UserName>
            <DesktopBalanceContainer>
              <BalanceText>{i18n.t("web.account.header.total")}: </BalanceText>
              <BalanceAmount>{currentBalance}</BalanceAmount>
              <RefreshButton handleClick={() => handleRefreshBalance()} />
            </DesktopBalanceContainer>
          </UserInfoContainer>
          <HeaderLanguageSwitch />
          <TransferButtonContainer onClick={handleGotoTransfer}>
            {i18n.t("common.transfer").toLocaleUpperCase()}
          </TransferButtonContainer>
          <ButtonContainer onClick={handleGotoWithdraw}>
            {i18n.t("common.withdrawal").toLocaleUpperCase()}
          </ButtonContainer>
          <ButtonContainer onClick={handleGotoDeposit}>
            {i18n.t("common.deposit").toLocaleUpperCase()}
          </ButtonContainer>
          <ButtonContainer onClick={handleClickLogout}>
            {i18n.t("web.header.logout").toLocaleUpperCase()}
          </ButtonContainer>
        </>
      )}

      {isMobileSize && (
        <>
          <img src={memberIcon} alt="memebr" />
          <BalanceContainer>${currentBalance}</BalanceContainer>
          <HeaderLanguageSwitch />
        </>
      )}
    </MainContainer>
  );
};

export default AccountHeaderContent;
