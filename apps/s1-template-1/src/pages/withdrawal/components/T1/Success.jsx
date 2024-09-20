import Icon from "@/components/project/Icon";
import {
  Container,
} from "@/components/styled-component/WithdrawV2/Success";
import { i18n } from "@tgs-web-nx/utils";

import { GreenGradientButton, LightBlueGradientButton } from "@/components/UI/Button";

import {
  ButtonContainer,
  SubTitle, SuccessImg
} from "@/components/styled-component/WithdrawV2/AddCardSuccess";

const Success = ({ verified, handleConfirmClick, handleVerifyName }) => {
  return (
    <Container>
      <SuccessImg>
        <Icon iconUrl="/assets/images/transfer/icon-successful.svg" width={"138px"} height={"138px"} />
      </SuccessImg>
      <SubTitle>{i18n.t("withdrawal.msgSuccess")}</SubTitle>
      <ButtonContainer>
        <LightBlueGradientButton fullWidth onClick={handleConfirmClick}>{i18n.t("common.confirm")}</LightBlueGradientButton>
        {!verified && (
          <GreenGradientButton fullWidth onClick={handleVerifyName}>{i18n.t("verified.goVerify")}</GreenGradientButton>
        )}
      </ButtonContainer>
    </Container>
  );
};

export default Success;
