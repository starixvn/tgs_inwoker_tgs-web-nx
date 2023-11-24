import React from "react";
import styled from "styled-components";
import { Common } from "@tgs-web-nx/utils";
import { useAccountStore, useWalletStore } from "@tgs-web-nx/core";
import cardBackground from "@/assets/t23/images/account/infoCard/card-background.png";
import VipMedal from "@/components/project/VipMedal";
import TransferButtonGroup from "@/layouts/components/Header/components/TransferButtonGroup";
import BalanceTracker from "@/components/project/BalanceTracker";

const InfoCardContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  width: 100%;
  height: 105px;
  padding: 15.5px;
  color: ${({ theme }) => theme.gray50};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 37px;
`;

const NameContainer = styled.div`
  font-size: 1rem;
  font-weight: 400;
`;

const VipLevel = styled.div`
  background: #92581a;
  width: 75px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.white};
  font-size: 3rem;
  font-weight: 500;
  border-radius: 50%;
`;

const InfoCard = (props: React.HTMLProps<HTMLDivElement>) => {
  const { account } = useAccountStore();
  const username = account.info.member_username;
  const accountLevel = account.info.member_level_id;

  return (
    //@ts-ignore
    <InfoCardContainer {...props}>
      <VipLevel>{`V${accountLevel}`}</VipLevel>

      <NameContainer>{username}</NameContainer>

      <BalanceTracker size={"small"} />
    </InfoCardContainer>
  );
};

export default InfoCard;
