import React from "react";
import styled from "styled-components";
import { Common } from "@tgs-web-nx/utils";
import { useAccountStore, useWalletStore } from "@tgs-web-nx/core";
import AccountTransferBtnGroup from "../AccountTransferBtnGroup";
import cardBackground from "@/assets/t19/images/account/infoCard/card-background.png";
import VipMedal from "@/components/project/VipMedal";
import { useUserWalletInfoContext } from "@tgs-web-nx/core/features";

const InfoCardContainer = styled.div`
  background: url(${cardBackground});
  background-size: cover;
  width: 100%;
  max-width: 399px;
  height: 248px;
  margin: 18px 0 24px 29px;
  padding: 46px 28px 21px;
  color: ${({ theme }) => theme.darkGray};
  border-radius: 10px 0px 0px 10px;
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
  font-weight: 700;
`;

const NameContainer = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 8.5px;
  letter-spacing: 0.8px;
`;

const BalanceContainer = styled.div`
  font-size: 1.625rem;
  font-weight: 700;

  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;

  & span {
    white-space: nowrap;
  }
`;

const InfoCard = (props: React.HTMLProps<HTMLDivElement>) => {
  const { wallet } = useWalletStore();
  const { account } = useAccountStore();
  const username = account.info.member_username;
  const accountLevel = account.info.member_level_id;
  const { mainSymbol, mainWalletBalance, transferWalletBalance } = useUserWalletInfoContext();

  const currentBalance =
    mainSymbol + "$ " + Common.formatNumberWithThousand(mainWalletBalance + transferWalletBalance);
  return (
    //@ts-ignore
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

      <AccountTransferBtnGroup />
    </InfoCardContainer>
  );
};

export default InfoCard;
