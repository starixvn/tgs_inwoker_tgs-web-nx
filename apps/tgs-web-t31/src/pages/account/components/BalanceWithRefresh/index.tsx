import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useWalletStore } from "@tgs-web-nx/core";
import RefreshButton from "./components/RefreshButton";
import iconMoney from "@/assets/t31/images/account/Money.png";
import Icon from "@/components/project/Icon";

const BalanceTrackerContainer = styled.div`
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BalanceContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  flex-direction: column;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  text-align: left;

  & span {
    white-space: nowrap;
  }
`;

const BalanceAmount = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.yellow};
  gap: 6px;
`;

const BalanceWithRefresh = () => {
  const { wallet, getBalanceList } = useWalletStore();
  const history = useHistory();

  const currentBalance = `${Common.formatNumberWithThousand(wallet.mainBalance)}`;

  const handleClick = useCallback(() => {
    history.push("/deposit");
  }, [history]);

  const handleRefreshBalance = useCallback(async () => {
    await getBalanceList();
  }, [getBalanceList]);

  return (
    //@ts-ignore
    <BalanceTrackerContainer>
      <BalanceContainer>
        <div>{i18n.t("wap.main.account.totalFund")}</div>
        <BalanceAmount>
          <Icon iconUrl={iconMoney} width={"8.84px"} height={"14px"} />
          <span onClick={handleClick}>{currentBalance}</span>
        </BalanceAmount>
      </BalanceContainer>
      <RefreshButton handleClick={handleRefreshBalance} />
    </BalanceTrackerContainer>
  );
};

export default React.memo(BalanceWithRefresh);
