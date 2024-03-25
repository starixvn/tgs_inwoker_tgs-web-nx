import { Extended } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { DepositSelectBankName } from "../DepositSelectBankName";
import { InfoContainer, ItemContainer, LabelContainer} from "@/components/styled-component/ProfileForms";
import { QRCodeImg, TransferLabel } from "@/components/styled-component/Deposit";
import CopyIcon from "@/pages/deposit/components/CopyIcon";
import {DepositBankType} from '@/pages/deposit/components/DepositForm/types';

type Key = 'name' | 'bankAccount' | 'eMoneyName' | 'phone' | 'email' | 'fpsId' | 'address'
type ImageKey = 'logo' | 'qrCode'

type Props = {
  isShowDepositSelectBankName?: boolean
  banktype: DepositBankType | null
} & Extended


export const ExtendedLayout = ({
  bankAccount,
  eMoneyName,
  logo,
  phone,
  name,
  qrCode,
  email,
  fpsId,
  address,
  isShowDepositSelectBankName = true,
  banktype,
}: Props) => {
  const props: Record<Key, string | undefined> = {name, bankAccount, eMoneyName, phone, email, fpsId, address};
  const imageProps: Record<ImageKey, string | undefined> = {logo, qrCode};

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

  const renderQrCode = Object.keys(imageProps).map((key) => {
    if (imageProps[key as ImageKey]) {
      return (
        <QRCodeImg src={imageProps[key as ImageKey]} alt={key} key={key} style={{ marginBottom: "10px" }} />
      )
    }

    return null;
  })

  const getIsVisible = (object: typeof props | typeof imageProps) => {
    return !Object.values(object).every(value => value === undefined || value === '')
  }

  const isVisible = getIsVisible(props) || getIsVisible(imageProps);

  return (
    <>
      {isVisible && (
        <ItemContainer>
          <LabelContainer>{i18n.t('deposit.transferAccount')}</LabelContainer>
          {renderQrCode}
          {renderLayout}
        </ItemContainer>
      )}

      {isShowDepositSelectBankName && <DepositSelectBankName banktype={banktype}/>}
    </>
  );
};
