import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";

const CenteredLayout = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 6.5rem - 1.6rem - 1.5rem - 27rem);
  text-align: center;
  color: #fff;
  font-size: 1.4rem;
  > h1 {
    font-size: 1.8rem;
   }
`

const DepositStatusIframe = () => {

  return<CenteredLayout>
    <p>{i18n.t("deposit.msgDepositCompleted")}</p>
  </CenteredLayout>

}

export default DepositStatusIframe;
