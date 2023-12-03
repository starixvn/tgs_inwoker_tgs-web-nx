import React from "react";
import { Common, i18n } from "@tgs-web-nx/utils";
import DynamicFont from "react-dynamic-font";
import styled, { keyframes } from "styled-components";
import { useGameStore, useWalletStore } from "@tgs-web-nx/core";
import config from "@tgs-web-nx/config";
import TransferMWalletPNG from "@/assets/t29/images/transfer/transfer-mwallet.png";
import TransferTWalletPNG from "@/assets/t29/images/transfer/transfer-twallet.png";
import TransferTotalPNG from "@/assets/t29/images/transfer/transfer-total.png";
import IconRefreshPNG from "@/assets/t29/images/transfer/icon-refresh.png";
import ArrowRightPNG from "@/assets/t29/images/transfer/arrow-right.png";

const UserWalletInfoContainer = styled.div``;

export const rotateKeyFrame = keyframes`
  0% {
    transform:rotate(0deg)
  }
  100% {
    transform:rotate(-359deg)
  }
`;

const WalletFrame = styled.div`
  width: 297px;
  height: 133px;
  float: left;
  position: relative;
`;

const MainWallet = styled(WalletFrame)`
  background: ${({ theme }) => {
    return `url(${TransferMWalletPNG}) no-repeat center`;
  }};
`;
const TransferWallet = styled(WalletFrame)`
  background: ${({ theme }) => {
    return `url(${TransferTWalletPNG}) no-repeat center`;
  }};
`;
const TotalWallet = styled(WalletFrame)`
  background: ${({ theme }) => {
    return `url(${TransferTotalPNG}) no-repeat center`;
  }};
`;
const WalletTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 14px 0 0 14px;
  color: ${({ theme }) => theme.secondary};
  float: left;
`;
const RefreshButton = styled.div`
  width: 28px;
  height: 29px;
  border-radius: 4.7px;

  float: right;
  margin: 13px 17px 0 15px;
  ${({ theme }) => {
    return config.features.UseAccentColor
      ? `background: ${theme.accent};`
      : ` background-image: linear-gradient(
      to top,
      ${theme.primaryGradient},
      ${theme.primary}
    )`;
  }};
  &:hover {
    cursor: pointer;
  }
`;
const RefreshButtonIcon = styled.div`
  width: 28px;
  height: 29px;
  mask: url(${IconRefreshPNG}) no-repeat center;
  background: ${({ theme }) => {
    return theme.useBackgroundColor ? theme.useBackgroundColor : "#fff";
  }};
  &:hover {
    animation: ${rotateKeyFrame} 1s linear 0s infinite;
  }
`;
const WalletAmount = styled.div`
  font-family: Arial;
  font-size: 30px;
  font-weight: bold;
  color: ${({ theme }) => theme.secondary};
  float: right;
  margin: 45px 10px 0 0;
  width: 230px;
  text-align: right;
  overflow: hidden;
`;

type Props = {
  getAllGameBalance: () => Promise<void>;
  getBalanceList: () => Promise<void>;
};
const UserWalletInfo = ({ getAllGameBalance, getBalanceList }: Props) => {
  console.log(getAllGameBalance);
  console.log(getBalanceList);
  const { game } = useGameStore();
  const { wallet } = useWalletStore();

  return (
    <UserWalletInfoContainer>
      <MainWallet>
        <WalletTitle>{i18n.t("transfer.mainAccount")}</WalletTitle>
        <RefreshButton
          onClick={() => {
            getAllGameBalance();
            getBalanceList();
          }}
        >
          <RefreshButtonIcon />
        </RefreshButton>
        <div className="clear" />

        <WalletAmount style={{ margin: "39px 10px 0 0" }}>
          <DynamicFont content={Common.formatNumberWithThousand(wallet.mainBalance)} />
        </WalletAmount>
      </MainWallet>
      {game.containTransferWallet && (
        <TransferWallet>
          <WalletTitle>{i18n.t("transfer.transferWallet")}</WalletTitle>

          <WalletAmount>
            <DynamicFont
              content={Common.formatNumberWithThousand(
                game.providerList.reduce(
                  (total, provider) =>
                    provider.transferwallet ? (total += provider.balance) : (total += 0),
                  0,
                ),
              )}
            />
          </WalletAmount>
        </TransferWallet>
      )}
      <TotalWallet>
        <WalletTitle>{i18n.t("transfer.totalFund")}</WalletTitle>

        <WalletAmount>
          <DynamicFont
            content={Common.formatNumberWithThousand(
              game.providerList.reduce(
                (total, item) =>
                  item.transferwallet === true ? (total += item.balance) : (total += 0),
                0,
              ) + wallet.mainBalance,
            )}
          />
        </WalletAmount>
      </TotalWallet>
    </UserWalletInfoContainer>
  );
};

export default UserWalletInfo;
