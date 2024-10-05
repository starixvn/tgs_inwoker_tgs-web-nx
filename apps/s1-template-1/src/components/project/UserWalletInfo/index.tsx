import Icon from "@/components/project/Icon";
import { AccountIcon, LabelHighlight } from "@/components/styled-component/ProfileForms";
import { media } from "@/theme/breakpoints";
import { useGameStore } from "@tgs-web-nx/core";
import { useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import { Common, i18n, utility } from "@tgs-web-nx/utils";
import styled, { DefaultTheme, keyframes } from "styled-components";

const rotateKeyFrame = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
`;

const Container = styled.div``;

const PlayerInfoContainer = styled.div`
  width: 100%;
  background:  ${({ theme }) => theme.accountInfoBackgroundColor};
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.2rem;
  ${media.sm} {
    padding: 2.4rem;
  }
`;

export const VIPLabel = styled.div<{ theme: DefaultTheme }>`
  color: ${({ theme }) => theme.secondary};
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
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  gap: 1.6rem;
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
  color: ${({ theme }) => theme.playerNameColor};
`;

export const WalletsWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  flex-wrap: wrap;
  ${media.sm} {
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
  color: ${({ theme }) => theme.white};
  white-space: nowrap;
  ${media.sm} {
    color: ${({ theme }) => theme.text};
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
    color: ${({ theme }) => theme.text};
  }
`;

const WalletInfo = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.walletInfoColor};
  font-weight: 700;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
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

  const avatarUrl = utility.getAvatarUrl(info.playercode);

  return (
    <Container>
      <PlayerInfoContainer>
        <PlayerInfo>
          <AccountIcon className="user-wallet">
            <img src={avatarUrl} alt="avatar" />
          </AccountIcon>
          <PlayerName>{info.member_username}</PlayerName>
        </PlayerInfo>
        <WalletsWrapper>
          <WalletInfo>
            <div>
              {i18n.t("common.accountBalance")}
              {":"}{" "}
            </div>            
            <LabelHighlight>
              {mainSymbol + Common.formatCurrency(mainWalletBalance + transferWalletBalance)}
            </LabelHighlight>
          </WalletInfo>
          {/* <WalletInfo>
            {i18n.t("common.totalDeposit")}
            {":"} <LabelHighlight>{info.accumdeposit}</LabelHighlight>
          </WalletInfo>
          <WalletInfo>
            {i18n.t("common.totalBetAmount")}
            {":"} <LabelHighlight>{info.accumturnover}</LabelHighlight>
          </WalletInfo> */}

          {/* {config.features.HaveVIPFeature && (
            <VIPLabel>
              <img
                width={"50px"}
                height={"50px"}
                src={utility.imagePathGenerator(`vip/level_${info.member_level_id}.png`)}
                alt={`level_${info.member_level_id}`}
              />
              VIP
              {info.member_level_id}
            </VIPLabel>
          )} */}
        </WalletsWrapper>
        {/* <VipProgressBar /> */}
      </PlayerInfoContainer>

      {/* <WalletsWrapper>
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
      </WalletsWrapper> */}
    </Container>
  );
};

export default UserWalletInfo;
