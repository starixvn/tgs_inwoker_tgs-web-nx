import styled, { css, DefaultTheme, keyframes } from "styled-components";
import DynamicFont from "react-dynamic-font";
import config from "@tgs-web-nx/config";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useAccountStore, useGameStore } from "@tgs-web-nx/core";
import { useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import refreshIcon from "@/assets/t29/images/account/icon-refresh.svg";
import Icon from "@/components/project/Icon";
import { media } from "@/theme/breakpoints";
import processBG from "@/assets/t29/images/profile/processbarBG.png";
import depositIcon from "@/assets/t29/images/profile/VIPdepositIcon.png";
import turnoverIcon from "@/assets/t29/images/profile/VIPturnoverIcon.png";
import depositBarImg from "@/assets/t29/images/profile/depositBar.png";
import turnoverBarImg from "@/assets/t29/images/profile/turnoverBar.png";

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
  gap: 60px;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.mainBackground};
  margin-bottom: 20px;
`;

const PlayerInfoContainer = styled.div``;

export const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const PlayerName = styled.div`
  font-size: 2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.blue60};
`;

export const VIPInfo = styled.div`
  display: flex;
  gap: 10px;
`;

export const RefreshContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ProcessBarWrapper = styled.div`
  width: 280px;
  ${media.sm} {
    width: 320px;
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
    top: 35%;
    width: 32px;
    height: 32px;
    z-index: 100;
  }
`;

export const ProcessBar = styled.div`
  position: absolute;
  width: 100%;
  height: 12px;
  background: url(${processBG});
`;

export const TotalBar = styled.div`
  width: 100%;
  height: 12px;
  background: #eaeaea;
  border-radius: 20px;
`;

export const DepositBar = styled.div<{ $width: number }>`
  position: absolute;
  height: 12px;
  background-image: url(${depositBarImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  max-width: 100%;
  width: ${({ $width }) => `${($width * 100).toFixed(2)}%`};
`;

export const TurnoverBar = styled(DepositBar)<{ $width: number }>`
  background-image: url(${turnoverBarImg});
`;

export const VIPText = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: 0em;
  color: ${({ theme }) => theme.blueBtn};
`;

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const WalletsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.mainBackground};
  padding: 20px;
  ${media.sm} {
    width: 300px;
    padding: 0;
  }
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
  color: ${({ theme }) => theme.text};
  white-space: nowrap;
`;

export const AmountContainer = styled.div<{ theme: DefaultTheme }>`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.blue60};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 9px;

  & *:first-child {
    flex-grow: 1;
  }
`;

type RefreshButtonProps = {
  $isLoading: boolean;
};

export const RefreshButton = styled(Icon)<RefreshButtonProps>`
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
  const { getAccountInfo } = useAccountStore();

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
        <VIPInfo>
          <ProcessBarWrapper>
            <ProcessBarContainer>
              <VIPText>{`${i18n.t("vip.totalDeposit")}: ${info.accumdeposit}/${
                info.levelupaccumulatedeposit
              }`}</VIPText>
              <img src={depositIcon} alt="deposit" />
              <Wrapper>
                <ProcessBar>
                  <DepositBar $width={info.accumdeposit / info.levelupaccumulatedeposit} />
                </ProcessBar>
                <TotalBar />
              </Wrapper>
            </ProcessBarContainer>

            <ProcessBarContainer>
              <VIPText>{`${i18n.t("vip.totalVaildBet")}: ${info.accumturnover}/${
                info.levelupaccumulatebetamount
              }`}</VIPText>
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
              width={"44px"}
              height={"44px"}
              iconUrl={refreshIcon}
              onClick={getAccountInfo}
              $isLoading={isMainWalletLoading}
            />
          </RefreshContainer>
        </VIPInfo>
      </PlayerInfoContainer>
      <WalletsWrapper>
        <MainWalletContainer>
          <MainAccountLabel>{i18n.t("web.account.header.mainWallet")}</MainAccountLabel>
          <AmountContainer>
            {isMainWalletLoading ? (
              <span>-</span>
            ) : (
              <DynamicFont
                content={mainSymbol + Common.formatCurrency(mainWalletBalance)}
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
                  Common.formatCurrency((mainWalletBalance + transferWalletBalance))
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
