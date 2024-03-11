import React from "react";
import styled from "styled-components";
import { Common } from "@tgs-web-nx/utils";
import { useWalletStore } from "@tgs-web-nx/core";
import { useHistory } from "react-router-dom";
import { useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import { media } from "@/theme/breakpoints";

const BalanceButtonContainer = styled.div`
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.grey06};
  padding: 11.5px 12px;
  border-radius: 6px;
  cursor: pointer;

  ${media.sm} {
    padding: 11.5px 20px;
  }

  & span {
    color: ${({ theme }) => theme.primary};
    margin-right: 5px;
  }
`;

const BalanceButton = () => {
  const { wallet } = useWalletStore();
  const { mainSymbol, mainWalletBalance, transferWalletBalance } = useUserWalletInfoContext();
  const currentBalance =
    mainSymbol + Common.formatNumberWithThousand(mainWalletBalance + transferWalletBalance);
  const history = useHistory();

  return (
    <BalanceButtonContainer onClick={() => history.push("/deposit")}>
      <span>$</span>
      {currentBalance}
    </BalanceButtonContainer>
  );
};

export default BalanceButton;
