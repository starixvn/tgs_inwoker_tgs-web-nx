import React from "react";
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import { SubmitButton } from "@/components/styled-component/ProfileForms";
import {
  ButtonContainer,
  Container,
  SubTitle,
  SubTitleDesc,
} from "@/components/styled-component/WithdrawV2/AddCardSuccess";
import { theme } from "@/theme";

const AddCardSuccess = ({
  isDeposit,
  bankCardList,
  onhandleBindCardClick,
  onhandleGoWithdrawClick,
  onhandleGoDepositClick,
  onhandleCSClick,
}) => {
  return (
    <Container>
      <SubTitle>{i18n.t("card.success.title")}</SubTitle>
      {!(
        config.features.ChangesNotAllowed ||
        config.features.AddCard_NotAllowedEditDelete ||
        bankCardList.length >= config.features.AddCard_MaximumCardAllowed
      ) ? (
        <SubTitleDesc>
          {i18n.t("card.success.successDesc")}
          <br></br>
          {i18n.t("card.success.bindDesc")}
        </SubTitleDesc>
      ) : (
        <SubTitleDesc>{i18n.t("card.success.noMoreAddCard")}</SubTitleDesc>
      )}

      <ButtonContainer>
        {!(
          config.features.ChangesNotAllowed ||
          config.features.AddCard_NotAllowedEditDelete ||
          bankCardList.length >= config.features.AddCard_MaximumCardAllowed
        ) && (
          <SubmitButton fullWidth onClick={onhandleBindCardClick}>
            {i18n.t("card.success.bindBankCard")}
          </SubmitButton>
        )}
        <SubmitButton
          fullWidth
          onClick={isDeposit ? onhandleGoDepositClick : onhandleGoWithdrawClick}
          style={{
            background: theme.blue30,
          }}
        >
          {isDeposit ? i18n.t("card.success.goDeposit") : i18n.t("card.success.goWithdrawal")}
        </SubmitButton>
      </ButtonContainer>
    </Container>
  );
};

export default AddCardSuccess;
