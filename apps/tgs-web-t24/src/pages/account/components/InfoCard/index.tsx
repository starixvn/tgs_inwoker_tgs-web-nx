import React from "react";
import styled from "styled-components";
import cardBackground from "@/assets/t23/images/account/infoCard/card-background.png";
import { useAccountStore } from "@/core/stores/useAccountStore";
import VipMedal from "@/components/project/VipMedal";
import TransferButtonGroup from "@/layouts/components/Header/components/TransferButtonGroup";
import { useWalletStore } from "@/core/stores/useWalletStore";
import Common from "@/core/utils/Common";

const InfoCardContainer = styled.div`
  background: url(${cardBackground});
  background-size: cover;
  width: 100%;
  height: 248px;
  margin-left: 29px;
  padding: 46px 28px 21px;
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoWrapper = styled.div`
  display: flex;
`;

const InfoListContainer = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
`;

const LevelContainer = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
`;

const NameContainer = styled.div`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 8.5px;
`;

const BalanceContainer = styled.div`
  font-size: 1.625rem;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;

  & span {
    white-space: nowrap;
  }
`;

const InfoCard = (props: any) => {
  const { wallet } = useWalletStore();
  const { account } = useAccountStore();
  const username = account.info.member_username;
  const accountLevel = account.info.member_level_id;
  const currentBalance = `${wallet.mainSymbol}$ ${Common.formatNumberWithThousand(
    wallet.mainBalance,
  )}`;
  return (
    <InfoCardContainer {...props}>
      <InfoWrapper>
        <VipMedal vipLevel={accountLevel} />

        <InfoListContainer>
          <LevelContainer>{`VIP ${accountLevel}`}</LevelContainer>
          <NameContainer>{username}</NameContainer>

          <BalanceContainer>
            <span>{currentBalance}</span>
          </BalanceContainer>
        </InfoListContainer>
      </InfoWrapper>

      <TransferButtonGroup buttonWidth={"140px"} />
    </InfoCardContainer>
  );
};

export default InfoCard;
