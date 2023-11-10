import React from "react";
import styled from "styled-components";
import Checkbox from "@/components/UI/Checkbox";
import i18n from "@/utils/i18n";
import RedirectToLoginHint from "@/pages/register/components/RegisterForm/RedirectToLoginHint";
import { useRegisterForm } from "@/core/feature/useAuthForm/useRegisterForm";
import FormikForm from "@/components/project/FormikForm";
import BrandLogo from "@/components/BrandLogo";
import { AuthFormContainer } from "@/components/styled-component/AuthFormContainer";

const VerifyAgeContainer = styled.div`
  width: 100%;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
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
    <AuthFormContainer>
      <BrandLogo />

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
    </AuthFormContainer>
  );
};

export default React.memo(RegisterForm);
