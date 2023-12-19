import React, { useCallback } from "react";
import styled from "styled-components";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useWalletStore } from "@tgs-web-nx/core";
import RefreshButton from "@/components/project/BalanceTracker/components/RefreshButton";
import { theme } from "@/theme";

type BalanceTrackerContainerProps = {
  $size?: "normal" | "small" | undefined;
  theme: typeof theme;
};
const BalanceTrackerContainer = styled.div<BalanceTrackerContainerProps>`
  position: relative;
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.812rem;
  gap: 4px;
`;

const BalanceContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.yellow};

  & span {
    white-space: nowrap;
  }
`;

type Props = {
  size?: "normal" | "small";
};
const BalanceTracker = ({ size, ...others }: Props) => {
  const { wallet, getBalanceList } = useWalletStore();

  const currentBalance = `${Common.formatNumberWithThousand(wallet.mainBalance)}`;

  const handleRefreshBalance = useCallback(async () => {
    await getBalanceList();
  }, [getBalanceList]);

  const isShow = size !== "small";
  return (
    //@ts-ignore
    <BalanceTrackerContainer $size={size} {...others}>
      {isShow && <span>{i18n.t("wap.main.home.profile.mainAccount")}:</span>}

      <BalanceContainer>
        <span>${currentBalance}</span>
      </BalanceContainer>

      <RefreshButton handleClick={() => handleRefreshBalance()} />
    </BalanceTrackerContainer>
  );
};

export default React.memo(BalanceTracker);
