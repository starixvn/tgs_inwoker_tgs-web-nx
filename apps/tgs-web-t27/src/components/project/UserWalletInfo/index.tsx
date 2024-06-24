import React from "react";
import styled, { DefaultTheme, keyframes } from "styled-components";
import DynamicFont from "react-dynamic-font";
import config from "@tgs-web-nx/config";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useGameStore } from "@tgs-web-nx/core";
import { useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import refreshIcon from "@/assets/t27/images/account/icon-refresh.svg";
import Icon from "@/components/project/Icon";
import { media } from "@/theme/breakpoints";
import VipProgressBar from "@/components/account/VipProgressBar";

const rotateKeyFrame = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
`;

const Container = styled.div`
  padding: 22px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: 1px solid ${({ theme }) => theme.maskBlack20};
`;

const PlayerInfoContainer = styled.div``;

export const VIPLabel = styled.div<{ theme: DefaultTheme }>`
  color: ${({ theme }) => theme.primary};
  font-size: 1.625rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  margin-left: 10px;
  & img {
    width: 30px;
    height: 30px;
  }
`;

export const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  min-width: 400px;
`;

export const VIPInfo = styled.div`
  display: flex;
  gap: 5px;
`;

export const RefreshContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ProcessBarWrapper = styled.div`
  width: 280px;
  ${media.sm} {
    width: 370px;
  }
`;

export const ProcessBarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  width: 100%;

  & img {
    position: absolute;
    left: 0;
    top: 60%;
    width: 32px;
    height: 32px;
    z-index: 2;
  }
`;
export const PlayerName = styled.div`
  font-size: 32px;
  line-height: 3.261rem;
  font-weight: 400;
  color: ${({ theme }) => theme.white};
  ${media.sm} {
    color: ${({ theme }) => theme.white};
  }
`;

export const WalletsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.g4};
  padding: 20px;
`;

export const MainWalletContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const MainAccountLabel = styled.div<{ theme: DefaultTheme }>`
  font-size: 1.062rem;
  font-weight: 700;
  line-height: 1.245rem;
  color: ${({ theme }) => theme.white};
  white-space: nowrap;
  ${media.sm} {
    color: ${({ theme }) => theme.white};
  }
`;

export const AmountContainer = styled.div<{ theme: DefaultTheme }>`
  font-size: 2.125rem;
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 9px;

  & *:first-child {
    flex-grow: 1;
  }

  ${media.sm} {
    color: ${({ theme }) => theme.white};
  }
`;

type RefreshButtonProps = {
  $isLoading: boolean;
};

export const RefreshButton = styled(Icon)<RefreshButtonProps>`
  &:hover {
    cursor: pointer;
    animation: ${rotateKeyFrame} 1s linear 0s infinite;
  }
`;

const UserWalletInfo = () => {
  const { game } = useGameStore();
  const {
    mainSymbol,
    mainWalletBalance,
    transferWalletBalance,
    fetchMainWalletBalance,
    fetchTransferWalletBalance,
    fetchBalance,
    isMainWalletLoading,
    isTransferWalletLoading,
    info,
  } = useUserWalletInfoContext();

  return (
    <Container>
      <PlayerInfoContainer>
        <PlayerInfo>
          <PlayerName>{info.member_username}</PlayerName>
          {config.features.HaveVIPFeature && (
            <VIPLabel>
              <img
                width={"50px"}
                height={"50px"}
                src={`${import.meta.env.BASE_URL}assets/images/vip/level_${
                  info.member_level_id
                }.png`}
                alt={`level_${info.member_level_id}`}
              />
              VIP
              {info.member_level_id}
            </VIPLabel>
          )}
        </PlayerInfo>
        <VipProgressBar />
      </PlayerInfoContainer>

      <WalletsWrapper>
        <MainWalletContainer>
          <MainAccountLabel>{i18n.t("web.account.header.mainWallet")}</MainAccountLabel>
          <AmountContainer>
            {isMainWalletLoading ? (
              <span>-</span>
            ) : (
              <DynamicFont content={mainSymbol + Common.formatCurrency(mainWalletBalance)} />
            )}
            <RefreshButton
              width={"44px"}
              height={"44px"}
              iconUrl={refreshIcon}
              onClick={fetchMainWalletBalance}
              $isLoading={isMainWalletLoading}
            />
          </AmountContainer>
        </MainWalletContainer>
        {game.containTransferWallet && (
          <MainWalletContainer>
            <MainAccountLabel>{i18n.t("web.account.header.allGameWallet")}</MainAccountLabel>
            <AmountContainer>
              {isTransferWalletLoading ? (
                <span>-</span>
              ) : (
                <DynamicFont content={mainSymbol + Common.formatCurrency(transferWalletBalance)} />
              )}
              <RefreshButton
                width={"44px"}
                height={"44px"}
                iconUrl={refreshIcon}
                onClick={fetchTransferWalletBalance}
                $isLoading={isTransferWalletLoading}
              />
            </AmountContainer>
          </MainWalletContainer>
        )}
        <MainWalletContainer>
          <MainAccountLabel>{i18n.t("web.account.header.total")}</MainAccountLabel>
          <AmountContainer>
            {isMainWalletLoading && isTransferWalletLoading ? (
              <span>-</span>
            ) : (
              <DynamicFont
                content={
                  mainSymbol + Common.formatCurrency(mainWalletBalance + transferWalletBalance)
                }
              />
            )}
            <RefreshButton
              width={"44px"}
              height={"44px"}
              iconUrl={refreshIcon}
              onClick={fetchBalance}
              $isLoading={isMainWalletLoading && isTransferWalletLoading}
            />
          </AmountContainer>
        </MainWalletContainer>
      </WalletsWrapper>
    </Container>
  );
};

export default UserWalletInfo;
