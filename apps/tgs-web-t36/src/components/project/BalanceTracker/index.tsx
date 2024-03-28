import React, { useCallback } from "react";
import styled from "styled-components";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useWalletStore } from "@tgs-web-nx/core";
import { useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import RefreshButton from "@/components/project/BalanceTracker/components/RefreshButton";
import { theme } from "@/theme";

type BalanceTrackerContainerProps = {
  $size?: "normal" | "small" | undefined;
  theme: typeof theme;
};
const BalanceTrackerContainer = styled.div<BalanceTrackerContainerProps>`
  position: relative;
  color: ${({ theme }) => theme.text};
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: space-between;
  font-size: 1.25rem;
  font-weight: 700;
`;

const BalanceContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
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
  const { mainSymbol, mainWalletBalance, transferWalletBalance } = useUserWalletInfoContext();

  const currentBalance =
    mainSymbol + Common.formatNumberWithThousand(mainWalletBalance + transferWalletBalance);

  const handleRefreshBalance = useCallback(async () => {
    await getBalanceList();
  }, [getBalanceList]);

  // const isShow = size !== "small";
  return (
    //@ts-ignore
    <BalanceTrackerContainer $size={size} {...others}>
      <div>
        <div>{i18n.t("wap.main.account.totalFund")}</div>
        <BalanceContainer>
          <span>${currentBalance}</span>
        </BalanceContainer>
      </div>
      <div>
        <RefreshButton handleClick={() => handleRefreshBalance()} />
      </div>
    </BalanceTrackerContainer>
  );
};

export default React.memo(BalanceTracker);
