import React from "react";
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import { useShowAddCardButton } from "@tgs-web-nx/core/features";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { SubmitButton } from "@/components/styled-component/ProfileForms";
import {
  Card,
  ButtonContainer,
  Container,
  SubTitle,
  SubTitleDesc,
  TitleContainer,
} from "@/components/styled-component/WithdrawV2/AddCardSuccess";
import { theme } from "@/theme";
import { ImgSuccess } from "@/components/styled-component/WithdrawV2/Success";
import SuccessPNG from "@/assets/t25/images/withdraw/icon-check.svg";

const AddCardSuccess = ({
  isDeposit,
  bankCardList,
  onhandleBindCardClick,
  onhandleGoWithdrawClick,
  onhandleGoDepositClick,
  onhandleCSClick,
}) => {
  const { isShowAddCardButton } = useShowAddCardButton(bankCardList);

  return (
    <Container>
      <Card>
        <TitleContainer>
          <ImgSuccess src={SuccessPNG} />
          <SubTitle>{i18n.t("card.success.title")}</SubTitle>
        </TitleContainer>

        {isShowAddCardButton && (
          <SubTitleDesc>
            {i18n.t("card.success.successDesc")}
            <br></br>
            {i18n.t("card.success.bindDesc")}
          </SubTitleDesc>
        )}
        {!isShowAddCardButton && (
          <SubTitleDesc>{i18n.t("card.success.noMoreAddCard")}</SubTitleDesc>
        )}
      </Card>

      <ButtonContainer>
        {
          !(
            config.features.ChangesNotAllowed ||
            config.features.AddCard_NotAllowedEditDelete ||
            bankCardList.length >= config.features.AddCard_MaximumCardAllowed
          ) && (
            <SubmitButton
              fullWidth
              onClick={onhandleBindCardClick}
              style={{
                background: theme.grey06,
                color: theme.white,
              }}
            >
              {i18n.t("card.success.bindBankCard")}
            </SubmitButton>
          )}

        <SubmitButton
          fullWidth
          onClick={isDeposit ? onhandleGoDepositClick : onhandleGoWithdrawClick}
          style={{
            color: theme.black,
          }}
        >
          {isDeposit ? i18n.t("card.success.goDeposit") : i18n.t("card.success.goWithdrawal")}
        </SubmitButton>
      </ButtonContainer>
    </Container>
  );
};

export default AddCardSuccess;
