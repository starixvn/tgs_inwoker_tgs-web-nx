import React from "react";
import styled from "styled-components";
import avatarImg from "@/assets/t18/images/account/avatar.png";
import { useAccountStore } from "@/core/stores/useAccountStore";
import VipMedal from "@/components/project/VipMedal";
import Icon from "@/components/project/Icon";
import iconMoney from "@/assets/t23/images/balanceTracker/icon_money.svg";
import RefreshButton from "@/components/project/BalanceTracker/components/RefreshButton";
import Common from "@/core/utils/Common";
import { useWalletStore } from "@/core/stores/useWalletStore";

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.tertiary};
`;

const NameContainer = styled.div`
  font-size: 1.25rem;
  font-weight: 400;
`;

const LevelContainer = styled.div`
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 16px;
`;

const BalanceContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  color: ${({ theme }) => theme.primary};
  gap: 10px;

  & span {
    white-space: nowrap;
  }
`;

type Props = {
  hideName?: boolean;
};

const Avatar = ({ hideName }: Props) => {
  const { wallet } = useWalletStore();
  const { account } = useAccountStore();
  const username = account.info.member_username;
  const accountLevel = account.info.member_level_id;
  const currentBalance = `${Common.formatNumberWithThousand(wallet.mainBalance)}`;

  return (
    <AvatarContainer>
      <VipMedal vipLevel={accountLevel} style={{ marginBottom: "6px" }} />
      {!hideName && <NameContainer>{username}</NameContainer>}
      <LevelContainer>{`VIP ${accountLevel}`}</LevelContainer>
      <BalanceContainer>
        <Icon iconUrl={iconMoney} width={"20px"} height={"20px"} />
        <span>{currentBalance}</span>
      </BalanceContainer>
    </AvatarContainer>
  );
};

export default Avatar;
