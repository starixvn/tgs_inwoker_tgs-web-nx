import React from "react";
import styled from "styled-components";
import { useAccountStore } from "@tgs-web-nx/core";
import config from "@tgs-web-nx/config";
import { useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import {
  DepositBar,
  PlayerInfo,
  PlayerName,
  ProcessBar,
  ProcessBarContainer,
  ProcessBarWrapper,
  RefreshButton,
  RefreshContainer,
  TotalBar,
  TurnoverBar,
  VIPInfo,
  VIPLabel,
  VIPText,
  Wrapper,
} from "@/components/project/UserWalletInfo/index";
import depositIcon from "@/assets/t36/images/profile/VIPdepositIcon.png";
import turnoverIcon from "@/assets/t36/images/profile/VIPturnoverIcon.png";
import refreshIcon from "@/assets/t36/images/account/icon-refresh.svg";

const InfoCardContainer = styled.div`
  background: ${({ theme }) => theme.grey01};
  width: 100%;
  padding: 20px;
  color: ${({ theme }) => theme.text};

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;

const InfoCard = (props: React.HTMLProps<HTMLDivElement>) => {
  const { account } = useAccountStore();
  const username = account.info.member_username;
  const accountLevel = account.info.member_level_id;
  const { info } = useUserWalletInfoContext();
  const { getAccountInfo } = useAccountStore();

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
      <VIPInfo>
        <ProcessBarWrapper>
          <ProcessBarContainer>
            <VIPText>{`${i18n.t("vip.totalDeposit")} `}</VIPText>
            <VIPText>
              {`${info.accumdeposit} / ${info.fulllevel ? "－" : info.levelupaccumulatedeposit}`}
            </VIPText>
            <img src={depositIcon} alt="deposit" />
            <Wrapper>
              <ProcessBar>
                <DepositBar $width={info.accumdeposit / info.levelupaccumulatedeposit} />
              </ProcessBar>
              <TotalBar />
            </Wrapper>
          </ProcessBarContainer>

          <ProcessBarContainer>
            <VIPText>{`${i18n.t("vip.totalVaildBet")}`}</VIPText>
            <VIPText>
              {`${info.accumturnover} / ${info.fulllevel ? "－" : info.levelupaccumulatebetamount}`}
            </VIPText>
            <img src={turnoverIcon} alt="turnover" />
            <Wrapper>
              <ProcessBar>
                <TurnoverBar $width={info.accumturnover / info.levelupaccumulatebetamount} />
              </ProcessBar>
              <TotalBar />
            </Wrapper>
          </ProcessBarContainer>
        </ProcessBarWrapper>
        <RefreshContainer>
          <RefreshButton
            width={"40px"}
            height={"40px"}
            iconUrl={refreshIcon}
            onClick={getAccountInfo}
            $isLoading={false}
          />
        </RefreshContainer>
      </VIPInfo>
    </InfoCardContainer>
  );
};

export default InfoCard;
