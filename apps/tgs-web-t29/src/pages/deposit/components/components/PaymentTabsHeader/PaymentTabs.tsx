import React, { useMemo } from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useWalletStore } from "@tgs-web-nx/core";
import { BadgeContainer } from "./BadgeContainer";
import Badge from "@/pages/deposit/components/components/PaymentTabsHeader/Badge";
import { formatDepositTypeList } from "@/components/account/DepositPrev/utils";
import {
  LabelContainer as ProfileLabelContainer,
  ItemContainer,
} from "@/components/styled-component/ProfileForms";

const LabelContainer = styled(ProfileLabelContainer)`
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
`;

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
        <LabelContainer>{i18n.t("deposit.msgPlsSelectPayment")}</LabelContainer>
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

export default React.memo(PaymentTabs);
