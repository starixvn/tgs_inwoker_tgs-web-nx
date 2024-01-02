import React from "react";
import styled from "styled-components";
import { useAccountStore, useWalletStore } from "@tgs-web-nx/core";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import BalanceTracker from "@/components/project/BalanceTracker";
import VipMedal from "@/components/project/VipMedal";

const InfoCardContainer = styled.div`
  background: ${({ theme }) => theme.NavBGC};
  width: 100%;
  /* max-width: 399px;
  height: 248px; */
  /* margin-left: 29px; */
  padding: 46px 28px 21px;
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoWrapper = styled.div`
  display: flex;
  padding-bottom: 10px;
  border-bottom: ${({ theme }) => `1px solid ${theme.gray20}`};
`;

const InfoListContainer = styled.div`
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 4px;
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
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const BalanceContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  & span {
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: left;
  }
`;
const BalanceAmount = styled.div`
  color: ${({ theme }) => theme.yellow};
`;

const UpdateBalanceButton = styled.div`
  text-align: center;
  align-self: center;
  background: ${({ theme }) => theme.primary};
  width: 130px;
  height: 30px;
  padding: 10px 12px;
  border-radius: 8px;
`;

const InfoCard = (props: React.HTMLProps<HTMLDivElement>) => {
  const { account } = useAccountStore();
  const { wallet } = useWalletStore();
  const username = account.info.member_username;
  const accountLevel = account.info.member_level_id;
  const currentBalance = `${wallet.mainSymbol}$ ${Common.formatNumberWithThousand(
    wallet.mainBalance,
  )}`;
  const { fetchBalance } = useUserWalletInfoContext();
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
      <BalanceContainer>
        <BalanceContent>
          <span>{i18n.t("web.account.header.total")}</span>
          <BalanceAmount>{currentBalance}</BalanceAmount>
        </BalanceContent>
        <UpdateBalanceButton onClick={fetchBalance}>
          {i18n.t("transfer.refresh").toLocaleUpperCase()}{" "}
        </UpdateBalanceButton>
      </BalanceContainer>
      {/* <AccountTransferBtnGroup /> */}
    </InfoCardContainer>
  );
};

export default InfoCard;
