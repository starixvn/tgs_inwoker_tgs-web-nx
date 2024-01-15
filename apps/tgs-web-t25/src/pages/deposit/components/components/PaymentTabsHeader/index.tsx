import React, { useMemo } from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useWalletStore } from "@tgs-web-nx/core";
import Badge from "@/pages/deposit/components/components/PaymentTabsHeader/Badge";
import { media } from "@/theme/breakpoints";
import { ItemContainer, LabelContainer } from "@/components/styled-component/ProfileForms";

const BadgeContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;

  ${media.sm} {
    margin-bottom: 40px;
  }
`;

type Props = {
  selectedPaymentIndex: number;
  handlePaymentChange: (e: Object, value: any) => void;
};
const PaymentTabsHeader = ({ selectedPaymentIndex, handlePaymentChange }: Props) => {
  const { wallet } = useWalletStore();
  const transferChannels = wallet.depositList;

  const depositTypes = useMemo(() => {
    return wallet.depositTypeList.sort(function (a, b) {
      return a.displayorder - b.displayorder;
    });
  }, [wallet.depositTypeList]);

  if (!transferChannels?.length) return null;

  return (
    <ItemContainer>
      <LabelContainer>{i18n.t("deposit.uploadReceipt")}</LabelContainer>

      <BadgeContainer>
        {depositTypes.map((depositType, index) => {
          const { paymentcode, paymentid } = depositType;
          return (
            <Badge
              key={`${paymentid}-${index}`}
              text={i18n.t(paymentcode)}
              isActive={index === selectedPaymentIndex}
              handleClick={() => handlePaymentChange({}, index)}
            />
          );
        })}
      </BadgeContainer>
    </ItemContainer>
  );
};

export default React.memo(PaymentTabsHeader);
