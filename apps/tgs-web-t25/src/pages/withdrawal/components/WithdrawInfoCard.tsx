import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { GetMinWithdrawLimitResDto } from "@tgs-web-nx/types";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useWalletStore, WalletService } from "@tgs-web-nx/core";
import ManageBankCardButton from "@/pages/withdrawal/components/ManageBankCardButton";

const CardContainer = styled.div`
  background: ${({ theme }) => theme.black02};
  padding: 14px 10px;
  border-radius: 6px;
  font-size: 0.875rem;
  line-height: 1.098rem;
  display: flex;
  margin-bottom: 16px;
`;

const ColContainer = styled.div``;

const RowContainer = styled.div`
  border-left: 6px solid ${({ theme }) => theme.grey03};
  padding-left: 10px;

  &:first-child {
    margin-bottom: 28px;
  }
`;

const Label = styled.div`
  color: ${({ theme }) => theme.white};
`;
const Value = styled.div`
  color: ${({ theme }) => theme.grey02};
`;

type Props = {
  handleManageCardClick: any;
};

const WithdrawInfoCard = ({ handleManageCardClick }: Props) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { wallet } = useWalletStore();
  return (
    <CardContainer>
      <ColContainer
        style={{
          padding: "10px",
        }}
      >
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
      </ColContainer>

      <ColContainer
        style={{
          marginLeft: "auto",
          alignSelf: "flex-end",
        }}
      >
        <ManageBankCardButton handleManageCardClick={handleManageCardClick} />
      </ColContainer>
    </CardContainer>
  );
};

export default WithdrawInfoCard;
