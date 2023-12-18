import React from "react";
import styled from "styled-components";
import { useAccountStore } from "@tgs-web-nx/core";
import BalanceTracker from "@/components/project/BalanceTracker";

const InfoCardContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  width: 100%;
  height: 105px;
  padding: 15.5px;
  color: ${({ theme }) => theme.text};

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
  /* background: #92581a; */
  /* width: 75px;
  height: 75px; */
  display: flex;
  align-items: center;
  justify-content: left;
  color: ${({ theme }) => theme.yellow};
  /* font-size: 3rem; */
  font-weight: 500;
`;

const UserInfo = styled.div`
  flex-direction: column;
  display: flex;
  text-align: left;
`;

const InfoCard = (props: React.HTMLProps<HTMLDivElement>) => {
  const { account } = useAccountStore();
  const username = account.info.member_username;
  const accountLevel = account.info.member_level_id;

  return (
    //@ts-ignore
    <InfoCardContainer {...props}>
      {/* <VipLevel>{`${accountLevel}`}</VipLevel> */}
      <UserInfo>
        <VipLevel>{`VIP ${accountLevel}`}</VipLevel>
        <NameContainer>{username}</NameContainer>
      </UserInfo>

      <BalanceTracker />
    </InfoCardContainer>
  );
};

export default InfoCard;
