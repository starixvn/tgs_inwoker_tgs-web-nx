import { BadgeContainer, ItemContainer, LabelLargeContainer } from "@/components/styled-component/ProfileForms";
import Badge from "@/pages/deposit/components/components/PaymentTabsHeader/Badge";
import { useWalletStore } from "@tgs-web-nx/core";
import { i18n } from "@tgs-web-nx/utils";
import React, { useMemo } from "react";



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
      <LabelLargeContainer>Payment Service Provider</LabelLargeContainer>    
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
