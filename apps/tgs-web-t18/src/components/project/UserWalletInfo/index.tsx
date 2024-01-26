import React from "react";
import styled, { css, DefaultTheme, keyframes } from "styled-components";
import DynamicFont from "react-dynamic-font";
import config from "@tgs-web-nx/config";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useGameStore } from "@tgs-web-nx/core";
import { useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import refreshIcon from "@/assets/t21/images/account/icon-refresh.svg";
import Icon from "@/components/project/Icon";
import { media } from "@/theme/breakpoints";
const rotateKeyFrame = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-359deg);
  }
`;

const Container = styled.div`
  padding: 22px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  flex-wrap: wrap;
`;

const PlayerInfoContainer = styled.div`
  ${media.md} {
    flex: 1;
    min-width: 184px;
  }
`;

const PlayerName = styled.div`
  font-size: 2rem;
  line-height: 2.343rem;
  font-weight: 500;
  color: ${({ theme }) => theme.white};
`;

const WalletsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  flex-wrap: wrap;

  ${media.lg} {
    gap: 60px;
  }
`;

const MainWalletContainer = styled.div`
  width: 128px;
`;

const MainAccountLabel = styled.div<{ theme: DefaultTheme }>`
  font-size: 1.062rem;
  font-weight: 400;
  line-height: 1.245rem;
  color: ${({ theme }) => theme.white};
`;

const AmountContainer = styled.div<{ theme: DefaultTheme }>`
  font-size: 2.125rem;
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 9px;
  padding-top: 19px;

  & *:first-child {
    flex-grow: 1;
  }
`;

const RefreshButton = styled(Icon)`
  &:hover {
    cursor: pointer;
    animation: ${rotateKeyFrame} 1s linear 0s infinite;
  }
`;

const VIPLabel = styled.div<{ theme: DefaultTheme }>`
  color: ${({ theme }) => theme.primary};
  font-size: 1.625rem;
  margin-top: 11px;
  font-weight: 400;
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
        <PlayerName>{info.member_username}</PlayerName>
        {config.features.HaveVIPFeature && (
          <VIPLabel>
            VIP
            {info.member_level_id}
          </VIPLabel>
        )}
      </PlayerInfoContainer>

      <WalletsWrapper>
        <MainWalletContainer>
          <MainAccountLabel>{i18n.t("web.account.header.mainWallet")}</MainAccountLabel>
          <AmountContainer>
            {isMainWalletLoading ? (
              <span>-</span>
            ) : (
              <DynamicFont
                content={mainSymbol + Common.formatNumberWithThousand(mainWalletBalance)}
              />
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
                <DynamicFont content={mainSymbol + transferWalletBalance.toFixed(2)} />
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
                  mainSymbol +
                  Common.formatNumberWithThousand(mainWalletBalance + transferWalletBalance)
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
