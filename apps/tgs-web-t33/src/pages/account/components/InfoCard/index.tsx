import React from "react";
import styled from "styled-components";
import { useAccountStore } from "@tgs-web-nx/core";
import config from "@tgs-web-nx/config";
import { PlayerInfo, PlayerName, VIPLabel } from "@/components/project/UserWalletInfo/index";
import VipProgressBar from "@/components/account/VipProgressBar";

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

const InfoCard = (props: React.HTMLProps<HTMLDivElement>) => {
  const { account } = useAccountStore();

  const username = account.info.member_username;
  const accountLevel = account.info.member_level_id;
  return (
    //@ts-ignore
    <InfoCardContainer {...props}>
      <PlayerInfo>
        <PlayerName>{username}</PlayerName>
        {config.features.HaveVIPFeature && (
          <VIPLabel>
            <img
              width={"50px"}
              height={"50px"}
              src={`${import.meta.env.BASE_URL}assets/images/vip/level_${accountLevel}.png`}
              alt={`level_${accountLevel}`}
            />
            VIP
            {accountLevel}
          </VIPLabel>
        )}
      </PlayerInfo>
      <VipProgressBar />
    </InfoCardContainer>
  );
};

export default InfoCard;
