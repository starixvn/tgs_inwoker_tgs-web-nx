import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import SuccessPNG from "@/assets/t32/images/withdraw/icon-check.svg";
import { Button as CustomButton } from "@/components/UI/Button";
import {
  Container,
  ImgSuccess,
  SameLine,
  SuccessMessage,
} from "@/components/styled-component/WithdrawV2/Success";
import { theme } from "@/theme";

const Success = ({ verified, handleConfirmClick, handleVerifyName }) => {
  return (
    <Container>
      <ImgSuccess src={SuccessPNG} />
      <SuccessMessage>{i18n.t("withdrawal.msgSuccess")}</SuccessMessage>
      <SameLine>
        <CustomButton
          fullWidth
          onClick={handleConfirmClick}
          style={{
            background: theme.primary,
          }}
        >
          {i18n.t("common.confirm")}
        </CustomButton>
        {!verified && (
          <CustomButton
            fullWidth
            onClick={handleVerifyName}
            style={{
              background: theme.btnPri,
            }}
          >
            {i18n.t("verified.goVerify")}
          </CustomButton>
        )}
      </SameLine>
    </Container>
  );
};

export default Success;
