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
import processBG from "@/assets/t29/images/profile/processbarBG.png";

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
  background: ${({ theme }) => theme.mainBackground};
  margin-bottom: 20px;
`;

const PlayerInfoContainer = styled.div`
  ${media.md} {
    position: static;

    flex: 1;
    min-width: 184px;
  }
`;

const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
`;

const PlayerName = styled.div`
  font-size: 2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.blue60};
`;

const ProcessBar = styled.div`
  position: absolute;
  width: 361px;
  height: 12px;
  background: url(${processBG});
`;

const TotalBar = styled.div`
  width: 361px;
  height: 12px;
  background: #eaeaea;
  border-radius: 20px;
`;

const Bar = styled.div`
  position: absolute;
  height: 12px;
  background: blue;
  border-radius: 20px;
  width: 30%;
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

const Wrapper = styled.div`
  position: relative;
  width: 361px;
  height: 12px;
`;

type RefreshButtonProps = {
  $isLoading: boolean;
};

const RefreshButton = styled(Icon)<RefreshButtonProps>`
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

const VIPLabel = styled.div<{ theme: DefaultTheme }>`
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
          <Wrapper>
            <ProcessBar>
              <Bar />
            </ProcessBar>
            <TotalBar />
          </Wrapper>
        </PlayerInfo>
      </PlayerInfoContainer>

      {/* <WalletsWrapper>
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
      </WalletsWrapper> */}
    </Container>
  );
};

export default UserWalletInfo;
