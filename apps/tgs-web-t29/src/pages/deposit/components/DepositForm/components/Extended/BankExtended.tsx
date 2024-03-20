import { BankExtended as BankExtendedProps } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { DepositSelectBankName } from "../DepositSelectBankName";
import { InfoContainer, ItemContainer, LabelContainer} from "@/components/styled-component/ProfileForms";
import { QRCodeImg, TransferLabel } from "@/components/styled-component/Deposit";
import CopyIcon from "@/pages/deposit/components/CopyIcon";

type Key = 'name' | 'bankAccount' | 'eMoneyName' | 'phone'

type Props = {
  banktype?: string
} & BankExtendedProps;

export const BankExtended = ({
  bankAccount,
  eMoneyName,
  logo,
  phone,
  name,
  banktype
}: Props) => {
  const props = {name, bankAccount, eMoneyName, phone};

  const renderLayout = Object.keys(props).map((key) => {
    if (props[key as Key]) {
      return (
        <InfoContainer key={key}>
          <TransferLabel>{i18n.t(`extended.${key}`)}:</TransferLabel>
            {props[key as Key]}
          <CopyIcon copyContent={props[key as Key]} />
        </InfoContainer>
      )
    }

    return null;
  })

  return (
    <>
      <ItemContainer>
        <LabelContainer>{i18n.t("deposit.transferAccount")}</LabelContainer>
        {logo && <QRCodeImg src={logo} alt={logo} style={{ marginBottom: "10px" }} />}
        {renderLayout}
      </ItemContainer>
      
      <DepositSelectBankName banktype={banktype} />
    </>
  );
};