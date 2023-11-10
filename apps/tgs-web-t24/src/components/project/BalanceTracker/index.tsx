import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useWalletStore } from "@/core/stores/useWalletStore";
import Common from "@/core/utils/Common";
import i18n from "@/core/utils/i18n";
import iconMoney from "@/assets/t24/images/balanceTracker/icon_money.svg";
import Icon from "@/components/project/Icon";
import { theme } from "@/theme";

type BalanceTrackerContainerProps = {
  $size?: "normal" | "small" | undefined;
  theme: typeof theme;
};
const BalanceTrackerContainer = styled.div<BalanceTrackerContainerProps>`
  height: 36px;
  background: ${({ theme }: BalanceTrackerContainerProps) => theme.mainBackground};
  border: ${({ $size, theme }: BalanceTrackerContainerProps) =>
    $size !== "small" ? `1px solid ${theme.gray80}` : "none"};
  color: white;
  border-radius: 4px;
  padding: 8px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.058rem;
`;

const BalanceContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  color: ${({ theme }) => theme.white};
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

  const currentBalance = `${Common.formatNumberWithThousand(wallet.mainBalance)}`;

  const handleClick = useCallback(() => {
    history.push("/deposit");
  }, []);

  const isShow = size !== "small";
  return (
    <BalanceTrackerContainer $size={size} {...others}>
      {isShow && (
        <span>
          {i18n.t("wap.main.account.totalFund")}
        </span>
      )}

      <BalanceContainer>
        <span onClick={handleClick}>{`${wallet.mainSymbol}$ ${currentBalance}`}</span>
        <Icon iconUrl={iconMoney} width={"20px"} height={"20px"} />
      </BalanceContainer>
    </BalanceTrackerContainer>
  );
};

export default React.memo(BalanceTracker);
