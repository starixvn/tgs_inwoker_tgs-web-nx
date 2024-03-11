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
import Icon from "@/components/project/Icon";
import iconAccount from "@/assets/t27/images/header/icon-account.svg";
import iconDeposit from "@/assets/t27/images/header/icon-deposit.svg";
import iconPromotion from "@/assets/t27/images/header/icon-promotion.svg";
import signoutBtn from "@/assets/t27/images/header/icon-logout.svg";
import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";
import config from "@tgs-web-nx/config";
import { media } from "@/theme/breakpoints";

const ButtonContainer = styled.div`
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
  display: flex;
  height: 36px;
  padding: 4px 10px;
  align-items: center;
  gap: 5px;
  border-radius: 4px;
  background: ${({ theme }) => theme.g4};
  color: ${({ theme }) => theme.white};
  font-size: 0.875rem;
  font-weight: 700;
`;

const DepositContainer = styled.div`
  min-width: 110px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.secondaryGradient};
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 700;
  gap: 10px;
  cursor: pointer;
`;

const MobileDepositContainer = styled.div`
  min-width: 97px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.primaryGradient};
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
`;

const MobileIconContainer = styled.div`
  cursor: pointer;
  display: flex;
  width: 42px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  align-self: stretch;
  background: ${({ theme }) => theme.g4};
`;

const AccountHeaderContent = () => {
  const history = useHistory();
  const { account } = useAccountStore();
  const { wallet } = useWalletStore();
  const { handleLogout } = useAuthContext();
  const { isDesktopSize, isMobileSize } = useRwd();
  const { handleChangeGameType } = useHomeGameContext();
  const { handleToggleMenu } = useHeader();
  const { mainSymbol, mainWalletBalance, transferWalletBalance } = useUserWalletInfoContext();

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

  const handleGotoPromotion = async () => {
    handleChangeGameType(GameTypeEnum.NONE);
    history.push("/promotion-list");
  };

  const handleGotoDeposit = useCallback(() => {
    handleToggleMenu(false);
    history.push("/deposit");
  }, []);

  return (
    <ButtonContainer>
      {isDesktopSize && (
        <>
          <BalanceContainer>
            {config.currency} ${currentBalance}
          </BalanceContainer>
          <DepositContainer onClick={handleGotoDeposit}>
            <Icon iconUrl={iconDeposit} width={"24px"} height={"24px"} />
            {i18n.t("common.deposit")}
          </DepositContainer>
          <IconContainer onClick={handleClickLogout}>
            <Icon iconUrl={signoutBtn} width={"24px"} height={"24px"} />
          </IconContainer>
          <IconContainer onClick={handleGotoPromotion}>
            <Icon iconUrl={iconPromotion} width={"24px"} height={"24px"} />
          </IconContainer>
          <IconContainer onClick={handleGoToProfile}>
            <Icon iconUrl={iconAccount} width={"24px"} height={"24px"} />
          </IconContainer>
          <HeaderLanguageSwitch />
        </>
      )}

      {isMobileSize && (
        <>
          <BalanceContainer>
            {config.currency} ${currentBalance}
          </BalanceContainer>
          <MobileDepositContainer onClick={handleGotoDeposit}>
            {i18n.t("common.deposit")}
          </MobileDepositContainer>
        </>
      )}
    </ButtonContainer>
  );
};

export default AccountHeaderContent;
