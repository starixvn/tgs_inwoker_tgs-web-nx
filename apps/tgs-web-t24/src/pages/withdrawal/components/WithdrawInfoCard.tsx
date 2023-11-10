import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { GetMinWithdrawLimitResDto } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { Common } from "@tgs-web-nx/utils";
import { useWalletStore } from "@/core/stores/useWalletStore";
import { WalletService } from "@/api-services/services/WalletService";

const CardContainer = styled.div`
  color: ${({ theme }) => theme.white};
  padding: 25px 37px;
  border-radius: 5px;
  font-size: 0.937rem;
  line-height: 1.098rem;
  align-self: flex-start;
`;
const RowContainer = styled.div`
  border-left: 6px solid ${({ theme }) => theme.primary};
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
