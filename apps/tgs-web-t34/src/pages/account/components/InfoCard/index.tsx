import React, { useCallback } from "react";
import styled from "styled-components";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useAccountStore, useWalletStore } from "@tgs-web-nx/core";
import { useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import VipMedal from "@/components/project/VipMedal";
import { Button } from "@/components/UI/Button";

const InfoCardContainer = styled.div`
  background-size: cover;
  width: 100%;
  color: white;
  padding: 20px;
  background: ${({ theme }) => theme.grey00};
  border-radius: 6px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.maskWhite50};
  margin-bottom: 10px;
`;

const BalanceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InfoListContainer = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
`;

const LevelContainer = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
`;

const NameContainer = styled.div`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 8.5px;
`;

const BalanceContainer = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.yellow};
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;

  & span {
    white-space: nowrap;
  }
`;

const InfoCard = (props: React.HTMLProps<HTMLDivElement>) => {
  const { wallet, getBalanceList } = useWalletStore();
  const { account } = useAccountStore();
  const { mainSymbol, mainWalletBalance, transferWalletBalance } = useUserWalletInfoContext();

  const username = account.info.member_username;
  const accountLevel = account.info.member_level_id;
  const currentBalance =
    mainSymbol + "$ " + Common.formatNumberWithThousand(mainWalletBalance + transferWalletBalance);

  const handleRefreshBalance = useCallback(async () => {
    await getBalanceList();
  }, [getBalanceList]);

  return (
    //@ts-ignore
    <InfoCardContainer {...props}>
      <InfoWrapper>
        <VipMedal vipLevel={accountLevel} />

        <InfoListContainer>
          <LevelContainer>{`VIP ${accountLevel}`}</LevelContainer>
          <NameContainer>{username}</NameContainer>
        </InfoListContainer>
      </InfoWrapper>

      <BalanceWrapper>
        <InfoListContainer>
          {i18n.t("transfer.totalFund")}
          <BalanceContainer>
            <span>{currentBalance}</span>
          </BalanceContainer>
        </InfoListContainer>

        <Button onClick={handleRefreshBalance}>{i18n.t("transfer.refresh")}</Button>
      </BalanceWrapper>
    </InfoCardContainer>
  );
};

export default InfoCard;
