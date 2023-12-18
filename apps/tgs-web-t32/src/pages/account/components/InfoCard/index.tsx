import React from "react";
import styled from "styled-components";
import { useAccountStore, useWalletStore } from "@tgs-web-nx/core";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";
import VipMedal from "@/components/project/VipMedal";
import { Button } from "@/components/UI/Button";
import { theme } from "@/theme";

const InfoCardContainer = styled.div`
  background: ${({ theme }) => theme.primary};
  width: 100%;
  padding: 10px 20px 20px;
  color: ${({ theme }) => theme.white};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.maskWhite20};
`;
const UserInfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const UserLevel = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
`;
const UserName = styled.div`
  font-size: 1.125rem;
  font-weight: 510;
`;

const BalanceInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > * {
    flex: 1;
  }
`;
const BalanceRol = styled.div``;
const BalanceLabel = styled.div`
  font-size: 0.875rem;
`;
const BalanceValue = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.yellow};
  font-weight: 700;
`;

const InfoCard = (props: React.HTMLProps<HTMLDivElement>) => {
  const history = useHistory();
  const { account } = useAccountStore();
  const username = account.info.member_username;
  const accountLevel = account.info.member_level_id;

  const { wallet } = useWalletStore();
  const currentBalance = `${Common.formatNumberWithThousand(wallet.mainBalance)}`;

  const handleGoToDeposit = () => {
    history.push("/deposit");
  };
  return (
    //@ts-ignore
    <InfoCardContainer {...props}>
      <UserInfo>
        <VipMedal vipLevel={accountLevel} />

        <UserInfoCol>
          <UserLevel>VIP {accountLevel}</UserLevel>
          <UserName>{username}</UserName>
        </UserInfoCol>
      </UserInfo>

      <BalanceInfo>
        <BalanceRol>
          <BalanceLabel>{i18n.t("wap.main.home.profile.mainAccount")}</BalanceLabel>
          <BalanceValue>{currentBalance}</BalanceValue>
        </BalanceRol>

        <Button onClick={handleGoToDeposit} style={{ background: theme.btnPri }}>
          {i18n.t("common.deposit")}
        </Button>
      </BalanceInfo>
    </InfoCardContainer>
  );
};

export default InfoCard;
