import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { GetMinWithdrawLimitResDto } from "@tgs-web-nx/types";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useWalletStore } from "@tgs-web-nx/core";
import { WalletService } from "@/api-services/services/WalletService";

const CardContainer = styled.div`
  background: ${({ theme }) => theme.primaryLight};
  color: ${({ theme }) => theme.white};
  padding: 25px 37px;
  border-radius: 5px;
  font-size: 0.937rem;
  line-height: 1.098rem;
  max-width: 450px;
  align-self: flex-start;
`;
const RowContainer = styled.div`
  border-left: 6px solid ${({ theme }) => theme.tertiary};
  padding-left: 10px;

  &:first-child {
    margin-bottom: 28px;
  }
`;

const Label = styled.div`
  margin-bottom: 8px;
`;
const Value = styled.div``;

const WithdrawInfoCard = () => {
  const [minWithdrawLimit, setMinWithdrawLimit] = useState(0);

  const getMinWithdrawLimit = useCallback(async () => {
    const result =
      (await WalletService.GetMinWithdrawLimit()) as unknown as GetMinWithdrawLimitResDto;
    if (!result.IsSuccess) {
      return;
    }

    setMinWithdrawLimit(result.data);
  }, []);

  useEffect(() => {
    getMinWithdrawLimit().then();
  }, []);

  const { wallet } = useWalletStore();
  return (
    <CardContainer>
      {/*您可提款餘額為*/}
      <RowContainer>
        <Label>{i18n.t("withdrawal.msgCanWithdrawal")}</Label>
        <Value>
          {wallet.mainSymbol}
          {Common.formatNumberWithThousand(wallet.mainBalance)}
        </Value>
      </RowContainer>

      <RowContainer>
        {/*流水需求*/}
        <Label>{i18n.t("withdrawal.turnover")}</Label>
        <Value>
          {wallet.mainSymbol}
          {Common.formatNumberWithThousand(minWithdrawLimit)}
        </Value>
      </RowContainer>
    </CardContainer>
  );
};

export default WithdrawInfoCard;
