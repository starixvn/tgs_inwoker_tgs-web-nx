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
  height: 35px;
  background: rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.gray30};
  border-radius: 50px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.318rem;
  cursor: pointer;
`;

const BalanceContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  color: ${({ theme }) => theme.gray30};
  gap: 10px;

  & span {
    white-space: nowrap;
  }
`;

const RefreshButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(160, 203, 97, 1);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s linear;

  &:hover {
    opacity: 1;
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

  const isShow = size !== "small";
  return (
    //@ts-ignore
    <BalanceTrackerContainer $size={size} {...others}>
      {isShow && <span>{i18n.t("wap.main.account.totalFund")}</span>}

      <BalanceContainer>
        <span>${currentBalance}</span>
      </BalanceContainer>

      <RefreshButtonWrapper onClick={() => handleRefreshBalance()}>
        <RefreshButton handleClick={() => Promise.resolve()} />
      </RefreshButtonWrapper>
    </BalanceTrackerContainer>
  );
};

export default React.memo(BalanceTracker);
