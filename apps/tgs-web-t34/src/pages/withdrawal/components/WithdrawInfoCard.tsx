import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { GetMinWithdrawLimitResDto } from "@tgs-web-nx/types";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useWalletStore, WalletService } from "@tgs-web-nx/core";
import ManageBankCardButton from "@/pages/withdrawal/components/ManageBankCardButton";

const CardContainer = styled.div`
  background: ${({ theme }) => theme.grey00};
  color: ${({ theme }) => theme.white};
  padding: 25px 37px;
  border-radius: 5px;
  font-size: 0.937rem;
  line-height: 1.098rem;
  align-self: flex-start;
  position: relative;
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
  margin-bottom: 8px;
`;
const Value = styled.div``;

export const ManageBankCardButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  align-self: flex-start;
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  right: 10px;
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
