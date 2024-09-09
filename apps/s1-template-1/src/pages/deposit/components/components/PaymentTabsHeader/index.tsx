import Badge from "@/pages/deposit/components/components/PaymentTabsHeader/Badge";
import { media } from "@/theme/breakpoints";
import { useWalletStore } from "@tgs-web-nx/core";
import { i18n } from "@tgs-web-nx/utils";
import React, { useMemo } from "react";
import styled from "styled-components";

const BadgeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1.2rem;
  margin-bottom: 2.4rem;

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
  );
};

export default React.memo(PaymentTabsHeader);
