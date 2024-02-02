import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import SuccessPNG from "@/assets/t21/images/withdraw/icon-check.png";
import { Button as CustomButton } from "@/components/UI/Button";
import {
  Container,
  ImgSuccess,
  SameLine,
  SuccessMessage,
} from "@/components/styled-component/WithdrawV2/Success";

const Success = ({ verified, handleConfirmClick, handleVerifyName }) => {
  return (
    <Container>
      <ImgSuccess src={SuccessPNG} />
      <SuccessMessage>{i18n.t("withdrawal.msgSuccess")}</SuccessMessage>
      <CustomButton onClick={handleConfirmClick} fullWidth={true}>
        {i18n.t("common.close")}
      </CustomButton>
      {!verified && (
        <CustomButton onClick={handleVerifyName}>{i18n.t("verified.goVerify")}</CustomButton>
      )}
    </Container>
  );
};

export default Success;
