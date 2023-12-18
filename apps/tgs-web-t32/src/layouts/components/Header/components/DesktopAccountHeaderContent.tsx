import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAccountStore, useWalletStore } from "@tgs-web-nx/core";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useAuthContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Icon from "@/components/project/Icon";
import iconAccount from "@/assets/t32/images/header/icon-account.svg";
import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";
import { RoundHeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";
import BalanceTracker from "@/components/project/BalanceTracker";

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Divider = styled.div`
  border-left: 1px solid ${({ theme }) => theme.maskBlack20};
  height: 20px;
`;

const UserInfo = styled.div`
  font-size: 0.812rem;
  color: ${({ theme }) => theme.yellow};
  cursor: pointer;
`;

const DesktopAccountHeaderContent = () => {
  const history = useHistory();
  const { wallet } = useWalletStore();
  const { handleLogout } = useAuthContext();
  const { account } = useAccountStore();
  const username = account.info.member_username;
  const { isLargeDesktopSize } = useRwd();

  const currentBalance = `${Common.formatNumberWithThousand(wallet.mainBalance)}`;

  const handleGoToProfile = () => {
    history.push("/profile");
  };

  const handleGoToTransfer = () => {
    history.push("/transfer");
  };

  const handleGoToDeposit = () => {
    history.push("/deposit");
  };

  const handleGoToWithdraw = () => {
    history.push("/withdrawal");
  };

  return (
    <ContentWrapper>
      {isLargeDesktopSize && (
        <>
          <UserInfo onClick={handleGoToProfile}>{username}</UserInfo>
          <Divider />
          <BalanceTracker />
        </>
      )}
      <HeaderLanguageSwitch />

      <RoundHeaderButton
        onClick={handleGoToTransfer}
        style={{
          background: theme.btnPri,
          border: `1px solid ${theme.btnPri}`,
        }}
      >
        {i18n.t("common.transfer")}
      </RoundHeaderButton>

      <RoundHeaderButton
        color={"primary"}
        onClick={handleGoToWithdraw}
        style={{
          color: theme.white,
          background: theme.primary,
          border: `1px solid ${theme.white}`,
        }}
      >
        {i18n.t("common.withdrawal")}
      </RoundHeaderButton>

      <RoundHeaderButton
        color={"primary"}
        onClick={handleGoToDeposit}
        style={{
          color: theme.white,
          background: theme.primary,
          border: `1px solid ${theme.white}`,
        }}
      >
        {i18n.t("common.deposit")}
      </RoundHeaderButton>

      <Divider />

      <RoundHeaderButton
        color={"primary"}
        onClick={handleLogout}
        style={{
          color: theme.white,
          background: theme.primary,
          border: `1px solid ${theme.white}`,
        }}
      >
        {i18n.t("wap.main.account.signout")}
      </RoundHeaderButton>
    </ContentWrapper>
  );
};

export default DesktopAccountHeaderContent;
