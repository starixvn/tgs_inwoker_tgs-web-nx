import { BankExtended as Props } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { LabelContainer } from "../../components";
import {
  FormControl,
  InfoContainer,
  ItemContainer,
  LabelContainer as ProfileLabelContainer,
  Remark,
  SubmitButton,
  UploadFileButton,
  UploadFileTag,
} from "@/components/styled-component/ProfileForms";
import {
  AmountHint,
  ExchangeRateContainer,
  FeeSpot,
  HintText,
  LimitAmount,
  LimitLabel,
  QRCodeImg,
  TransferLabel,
} from "@/components/styled-component/Deposit";
import CopyIcon from "@/pages/deposit/components/CopyIcon";
import { TextField } from "@/components/UI/TextField";

type Key = 'name' | 'bankAccount' | 'eMoneyName' | 'phone'

export const BankExtended = ({
  bankAccount,
  eMoneyName,
  logo,
  phone,
  name,
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
      <LabelContainer>{i18n.t("deposit.transferAccount")}</LabelContainer>

      {logo && <QRCodeImg src={logo} alt={logo} style={{ marginBottom: "10px" }} />}
      {renderLayout}
      
      {/*请输入银行名称*/}
      <ItemContainer>
        <LabelContainer>{i18n.t("common.pleaseEnterAccountName")}</LabelContainer>
        <FormControl variant="outlined">
          <TextField
            fullWidth
            value=""
            onChange={() => {}}
            type="text"
            placeholder=""
          />
        </FormControl>
      </ItemContainer>
    </>
  );
};