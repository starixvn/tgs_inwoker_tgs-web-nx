import React from "react";
import styled, { css, DefaultTheme, keyframes } from "styled-components";
import DynamicFont from "react-dynamic-font";
import config from "@tgs-web-nx/config";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useGameStore } from "@tgs-web-nx/core";
import { useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import refreshIcon from "@/assets/t29/images/account/icon-refresh.svg";
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
  padding: 22px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.mainBackground};
  margin-bottom: 20px;
`;

const PlayerInfoContainer = styled.div`
  ${media.md} {
    flex: 1;
    min-width: 184px;
  }
`;

const PlayerName = styled.div`
  font-size: 2.8125rem;
  font-weight: 400;
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
  //width: 128px;
`;

const MainAccountLabel = styled.div<{ theme: DefaultTheme }>`
  font-size: 1.062rem;
  font-weight: 700;
  line-height: 1.245rem;
  color: ${({ theme }) => theme.text};
  white-space: nowrap;
`;

const AmountContainer = styled.div<{ theme: DefaultTheme }>`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.blue60};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 9px;
  padding-top: 19px;

  & *:first-child {
    flex-grow: 1;
  }
`;

type RefreshButtonProps = {
  $isLoading: boolean;
};

const RefreshButton = styled(Icon) <RefreshButtonProps>`
  cursor: pointer;

  animation: ${({ $isLoading }: RefreshButtonProps) =>
    $isLoading
      ? css`
          ${rotateKeyFrame} 1s linear 0s infinite
        `
      : "none"};

  &:hover {
    animation: ${rotateKeyFrame} 1s linear 0s infinite;
  }
`;

const AmountText = styled.div`
  color: ${({ theme }) => theme.white};
`;

const VIPLabel = styled.div<{ theme: DefaultTheme }>`
  color: ${({ theme }) => theme.activeNav};
  font-size: 1.857rem;
  margin-top: 6px;
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
              <AmountText>
                <DynamicFont
                  content={mainSymbol + Common.formatNumberWithThousand(mainWalletBalance)}
                />
              </AmountText>
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
                <AmountText>
                  <DynamicFont content={mainSymbol + transferWalletBalance.toFixed(2)} />
                </AmountText>
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
              <AmountText>
                <DynamicFont
                  content={
                    mainSymbol +
                    Common.formatNumberWithThousand(mainWalletBalance + transferWalletBalance)
                  }
                />
              </AmountText>
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
