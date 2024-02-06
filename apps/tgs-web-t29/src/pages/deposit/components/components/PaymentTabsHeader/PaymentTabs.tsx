import {memo, useMemo } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useWalletStore } from "@tgs-web-nx/core";
import { BadgeContainer } from "./components/BadgeContainer";
import Badge from "./components/Badge";
import {LabelContainer} from "./components/LabelContainer";
import { formatDepositTypeList } from "@/components/account/DepositPrev/utils";
import {ItemContainer,} from "@/components/styled-component/ProfileForms";



type Props = {
  activeMethod: string
  activePayment: string
  handlePaymentChange: (value: string) => void;
};
const PaymentTabs = ({ 
  activeMethod,
  activePayment,
  handlePaymentChange
}: Props) => {
  const { wallet } = useWalletStore();

  //ts-ignore
  const paymontTypes = formatDepositTypeList(wallet.depositTypeList)?.find(row => row.methodcode === activeMethod)?.paymentList;

  const depositTypes = useMemo(() => {
    return paymontTypes?.sort(function (a, b) {
      return a.displayorder - b.displayorder;
    });
  }, [paymontTypes]);


  return (
    <ItemContainer>
        <LabelContainer>{i18n.t("depositAndWithdrawalStatus.channel")}</LabelContainer>
        <BadgeContainer>
          {depositTypes?.map((depositType, index) => {
            const { paymentcode } = depositType;
            
            return (
              <Badge
                key={index}
                text={i18n.t(paymentcode)}
                isActive={paymentcode === activePayment}
                handleClick={() => handlePaymentChange(paymentcode)}
              />
            );
          })}
        </BadgeContainer>
      </ItemContainer>
    
  );
};

export default memo(PaymentTabs);
