import { useCallback, memo } from "react";
import styled from "styled-components";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useWalletStore } from "@tgs-web-nx/core";
import { useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import config, { BrandName, brandConfig } from "@tgs-web-nx/config";
import RefreshButton from "@/components/project/BalanceTracker/components/RefreshButton";
import { theme } from "@/theme";

type BalanceTrackerContainerProps = {
  $size?: "normal" | "small" | undefined;
  theme: typeof theme;
};
const BalanceTrackerContainer = styled.div<BalanceTrackerContainerProps>`
  position: relative;
  background: rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.black};
  display: flex;
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
  const { getBalanceList } = useWalletStore();
  const { mainSymbol, mainWalletBalance, transferWalletBalance } = useUserWalletInfoContext();

  const currentBalance =
    mainSymbol +
    Common.formatCurrency(
      mainWalletBalance + transferWalletBalance,
      brandConfig[config.brandName as BrandName]?.countryCode,
    );

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

      <RefreshButton handleClick={() => handleRefreshBalance()} />
    </BalanceTrackerContainer>
  );
};

export default memo(BalanceTracker);
