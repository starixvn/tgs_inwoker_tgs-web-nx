import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Common } from "@tgs-web-nx/utils";
import { useWalletStore } from "@tgs-web-nx/core";
import { theme } from "@/theme";

type BalanceTrackerContainerProps = {
  $size?: "normal" | "small" | undefined;
  theme: typeof theme;
};
const BalanceTrackerContainer = styled.div<BalanceTrackerContainerProps>`
  height: 36px;
  color: white;
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
  cursor: pointer;
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
  balanceTrackerSize: string;
} & React.HTMLProps<HTMLDivElement>;

const BalanceTracker = ({ balanceTrackerSize, ...others }: Props) => {
  const { wallet, getBalanceList } = useWalletStore();
  const history = useHistory();

  const currentBalance = `$ ${Common.formatNumberWithThousand(wallet.mainBalance)}`;

  const handleClick = useCallback(() => {
    history.push("/deposit");
  }, [history]);

  return (
    //@ts-ignore
    <BalanceTrackerContainer $size={balanceTrackerSize || "normal"} {...others}>
      <BalanceContainer>
        <span onClick={handleClick}>{currentBalance}</span>
      </BalanceContainer>
    </BalanceTrackerContainer>
  );
};

export default React.memo(BalanceTracker);
