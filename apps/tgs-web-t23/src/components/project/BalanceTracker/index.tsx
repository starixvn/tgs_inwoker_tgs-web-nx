import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useWalletStore } from "@tgs-web-nx/core";
import { useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import RefreshButton from "@/components/project/BalanceTracker/components/RefreshButton";
import iconMoney from "@/assets/t23/images/balanceTracker/icon_money.svg";
import Icon from "@/components/project/Icon";
import { theme } from "@/theme";

type BalanceTrackerContainerProps = {
  $size?: "normal" | "small" | undefined;
  theme: typeof theme;
};
const BalanceTrackerContainer = styled.div<BalanceTrackerContainerProps>`
  height: 36px;
  background: ${({ theme }: BalanceTrackerContainerProps) => theme.mainLightBackground};
  border: ${({ $size, theme }: BalanceTrackerContainerProps) =>
    $size !== "small" ? `1px solid ${theme.gray}` : "none"};
  color: ${({ theme }) => theme.white};
  border-radius: 50px;
  padding: 8px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.318rem;
`;

const BalanceContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  color: ${({ theme }) => theme.primary};
  gap: 10px;

  & span {
    white-space: nowrap;
  }
`;

type Props = {
  size?: "normal" | "small";
};
const BalanceTracker = ({ size, ...others }: Props) => {
  const { wallet, getBalanceList } = useWalletStore();
  const history = useHistory();
  const { mainSymbol, mainWalletBalance, transferWalletBalance } = useUserWalletInfoContext();

  const currentBalance =
    mainSymbol + Common.formatNumberWithThousand(mainWalletBalance + transferWalletBalance);

  const handleClick = useCallback(() => {
    history.push("/deposit");
  }, [history]);

  const handleRefreshBalance = useCallback(async () => {
    await getBalanceList();
  }, [getBalanceList]);

  const isShow = size !== "small";
  return (
    //@ts-ignore
    <BalanceTrackerContainer $size={size} {...others}>
      {isShow && <span>{i18n.t("wap.main.account.totalFund")}</span>}

      <BalanceContainer>
        <Icon iconUrl={iconMoney} width={"20px"} height={"20px"} />
        <span onClick={handleClick}>{currentBalance}</span>
        <RefreshButton handleClick={handleRefreshBalance} />
      </BalanceContainer>
    </BalanceTrackerContainer>
  );
};

export default React.memo(BalanceTracker);
