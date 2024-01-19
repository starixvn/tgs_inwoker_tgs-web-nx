import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import SuccessPNG from "@/assets/t25/images/withdraw/icon-check.svg";
import { Button as CustomButton } from "@/components/UI/Button";
import {
  Container,
  ImgSuccess,
  SameLine,
  SuccessMessage,
} from "@/components/styled-component/WithdrawV2/Success";
import { Card, TitleContainer } from "@/components/styled-component/WithdrawV2/AddCardSuccess";

const Success = ({ verified, handleConfirmClick, handleVerifyName }) => {
  return (
    <Container>
      <Card>
        <TitleContainer>
          <ImgSuccess src={SuccessPNG} />
          <SuccessMessage>{i18n.t("withdrawal.msgSuccess")}</SuccessMessage>
        </TitleContainer>
        <SameLine>
          <CustomButton fullWidth onClick={handleConfirmClick}>
            {i18n.t("common.confirm")}
          </CustomButton>
          {!verified && (
            <CustomButton fullWidth onClick={handleVerifyName}>
              {i18n.t("verified.goVerify")}
            </CustomButton>
          )}
        </SameLine>
      </Card>
    </Container>
  );
};

export default Success;
