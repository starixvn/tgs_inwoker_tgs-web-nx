import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { GetMinWithdrawLimitResDto } from "@tgs-web-nx/types";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useWalletStore, WalletService } from "@tgs-web-nx/core";
import { ManageBankCardButtonContainer } from "@/components/styled-component/WithdrawV2/Main";
import ManageBankCardButton from "@/pages/withdrawal/components/ManageBankCardButton";

const CardContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.primary};
  padding: 24px 20px;
  border-radius: 5px;
  font-size: 0.875rem;
  line-height: 1.098rem;
  align-self: flex-start;
  margin-bottom: 20px;
`;

const RowContainer = styled.div`
  border-left: 6px solid ${({ theme }) => theme.maskWhite50};
  padding-left: 10px;

  &:first-child {
    margin-bottom: 28px;
  }
`;

const Label = styled.div`
  color: ${({ theme }) => theme.white};
`;
const Value = styled.div`
  color: ${({ theme }) => theme.white};
`;

type Props = {
  onhandleManageCardClick: any;
};

const WithdrawInfoCard = ({ onhandleManageCardClick }: Props) => {
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

      <ManageBankCardButtonContainer>
        <ManageBankCardButton handleManageCardClick={onhandleManageCardClick} />
      </ManageBankCardButtonContainer>
    </CardContainer>
  );
};

export default WithdrawInfoCard;
