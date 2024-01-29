import { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAccountStore, useWalletStore } from "@tgs-web-nx/core";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useAuthContext } from "@tgs-web-nx/core/features";
import config from "@tgs-web-nx/config";
import { RoundHeaderButton } from "./HeaderButton";
import { useGoToHomePage } from "@/hooks/home/useGoToHomePage";
import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";
import { theme } from "@/theme";
import VipMedal from "@/components/project/VipMedal";
import RefreshButton from "@/components/project/BalanceTracker/components/RefreshButton";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: 0em;
`;

const BalanceContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Balance = styled.div`
  color: ${({ theme }) => theme.gray80};
  font-size: 0.875rem;
  font-weight: 400;
`;

const AccountHeaderContent = () => {
  const history = useHistory();
  const { account } = useAccountStore();
  const { wallet, getBalanceList } = useWalletStore();
  const { handleLogout } = useAuthContext();
  const goToHomePage = useGoToHomePage();
  const currentBalance = `${Common.formatNumberWithThousand(wallet.mainBalance)}`;
  const username = account.info.member_username;
  const accountLevel = account.info.member_level_id;
  const handleClickLogout = async () => {
    await handleLogout();
    goToHomePage();
  };
  const handleRefreshBalance = useCallback(async () => {
    await getBalanceList();
  }, [getBalanceList]);

  return (
    <ButtonContainer>
      <VipMedal vipLevel={accountLevel} />
      <UserInfo>
        <Username>
          <span> {username}</span>
          <span> {`(${config.currency})`}</span>
        </Username>
        <BalanceContainer>
          <Balance>${currentBalance}</Balance>
          <RefreshButton handleClick={() => handleRefreshBalance()} />
        </BalanceContainer>
      </UserInfo>

      <RoundHeaderButton
        onClick={() => {
          history.push("/deposit");
        }}
        style={{
          color: theme.black,
          background: theme.white,
          border: `1px solid ${theme.gray30}`,
        }}
      >
        {i18n.t("common.deposit")}
      </RoundHeaderButton>
      <RoundHeaderButton
        onClick={handleClickLogout}
        style={{
          color: theme.white,
          background: theme.red,
        }}
      >
        {i18n.t("web.header.logout")}
      </RoundHeaderButton>
      <HeaderLanguageSwitch />
    </ButtonContainer>
  );
};

export default AccountHeaderContent;
