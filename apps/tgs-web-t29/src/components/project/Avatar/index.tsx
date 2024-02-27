import styled from "styled-components";
import { Common } from "@tgs-web-nx/utils";
import { useAccountStore, useWalletStore } from "@tgs-web-nx/core";
import { useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import VipMedal from "@/components/project/VipMedal";
import Icon from "@/components/project/Icon";
import iconMoney from "@/assets/t23/images/balanceTracker/icon_money.svg";

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
  const { account } = useAccountStore();
  const username = account.info.member_username;
  const accountLevel = account.info.member_level_id;
  const { mainSymbol, mainWalletBalance, transferWalletBalance } = useUserWalletInfoContext();

  const currentBalance =
    mainSymbol + "$ " + Common.formatCurrency(mainWalletBalance + transferWalletBalance);

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
