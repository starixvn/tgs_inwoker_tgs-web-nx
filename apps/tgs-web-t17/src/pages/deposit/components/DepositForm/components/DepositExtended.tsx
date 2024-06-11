import { i18n } from "@tgs-web-nx/utils";
import { Extended } from "@tgs-web-nx/types";
import styled from "styled-components";
import { InfoContainer} from "@/components/styled-component/ProfileForms";
import { TransferLabel } from "@/components/styled-component/Deposit";
import CopyIcon from "@/pages/deposit/components/CopyIcon";
import { QRCodeImg } from "@/components/styled-component/Deposit";

type Props = {
  title?: keyof Extended;
  content?: string;
  qrcode?: string;
}

const Content = styled.p`
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #fff;
`;

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
        <TransferLabel style={{flexShrink: "0"}}>{i18n.t(`extended.${title}`)}:</TransferLabel>
        <Content>{content}</Content>
        <CopyIcon copyContent={content} style={{flexShrink: "0"}}/>
      </InfoContainer>
    )
  }

  return null;
}