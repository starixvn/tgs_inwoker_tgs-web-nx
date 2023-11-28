import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useRegisterForm } from "@tgs-web-nx/core/features";
import Checkbox from "@/components/UI/Checkbox";
import RedirectToLoginHint from "@/pages/register/components/RegisterForm/RedirectToLoginHint";
import FormikForm from "@/components/project/FormikForm";
import { AuthFormContainer } from "@/components/styled-component/AuthFormContainer";
import BrandLogo from "@/components/project/BrandLogo";
import LanguageSwitch from "@/components/project/LanguageSwitch";

const VerifyAgeContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.gray50};
  font-size: 0.875rem;
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
      <BrandLogo style={{ marginBottom: "62px" }} />

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

      <RedirectToLoginHint style={{ marginBottom: "20px" }} />
      <LanguageSwitch style={{ width: "129px", margin: "auto auto 0" }} />
    </AuthFormContainer>
  );
};

export default React.memo(RegisterForm);
