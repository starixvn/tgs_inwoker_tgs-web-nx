import { i18n } from "@tgs-web-nx/utils";
import { Extended } from "@tgs-web-nx/types";
import { InfoContainer} from "@/components/styled-component/ProfileForms";
import { TransferLabel } from "@/components/styled-component/Deposit";
import CopyIcon from "@/pages/deposit/components/CopyIcon";
import { QRCodeImg } from "@/components/styled-component/Deposit";

type Props = {
  title?: keyof Extended;
  content?: string;
  qrcode?: string;
}

export const DepositExtended = ({
  title,
  content,
  qrcode,
}: Props) => {
  
  if(qrcode) {
    return (
      <QRCodeImg src={qrcode} alt="qr code" style={{ marginBottom: "10px" }} />
    );
  }

  if(content && title) {
    return (
      <InfoContainer>
        <TransferLabel>{i18n.t(`extended.${title}`)}:</TransferLabel>
          {content}
        <CopyIcon copyContent={content} />
      </InfoContainer>
    )
  }

  return null;
}