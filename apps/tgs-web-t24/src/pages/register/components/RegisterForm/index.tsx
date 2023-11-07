import React from "react";
import styled from "styled-components";
import Checkbox from "@/components/UI/Checkbox";
import i18n from "@/utils/i18n";
import RedirectToLoginHint from "@/pages/register/components/RegisterForm/RedirectToLoginHint";
import { useRegisterForm } from "@/core/feature/useAuthForm/useRegisterForm";
import FormikForm from "@/components/project/FormikForm";
import { media } from "@/theme/breakpoints";

const RegisterFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 7.343vh 24px;

  ${media.sm} {
    padding: 42px 42px;
  }
`;

const TitleContainer = styled.div`
  font-size: 3rem;
  line-height: 3.478rem;
  font-weight: 700;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;

  ${media.sm} {
    display: none;
  }
`;

const VerifyAgeContainer = styled.div`
  width: 100%;
  color: white;
  font-size: 0.937rem;
  margin: 24px 0 0;
  display: flex;
  align-items: start;
`;

const RegisterForm = () => {
  const {
    formInputConfigList,
    formik,
    isLoading,
    registerError,
    isConfirmedAdult,
    handleClickConfirmAdult,
  } = useRegisterForm();

  return (
    <RegisterFormContainer>
      <TitleContainer>{i18n.t("common.register")}</TitleContainer>

      <FormikForm
        formInputList={formInputConfigList}
        formik={formik}
        isLoading={isLoading}
        error={registerError}
        buttonText={i18n.t("common.register")}
      >
        <VerifyAgeContainer>
          <Checkbox value={isConfirmedAdult} onClick={handleClickConfirmAdult} />
          {i18n.t("web.register.contract")}
        </VerifyAgeContainer>
      </FormikForm>

      <RedirectToLoginHint />
    </RegisterFormContainer>
  );
};

export default React.memo(RegisterForm);
