import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import SuccessPNG from "@/assets/t31/images/withdraw/icon-check.svg";
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
      <SameLine>
        <CustomButton onClick={handleConfirmClick}>{i18n.t("common.confirm")}</CustomButton>
        {!verified && (
          <CustomButton onClick={handleVerifyName}>{i18n.t("verified.goVerify")}</CustomButton>
        )}
      </SameLine>
    </Container>
  );
};

export default Success;
