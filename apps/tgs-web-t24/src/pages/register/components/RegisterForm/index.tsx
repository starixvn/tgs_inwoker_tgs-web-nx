import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useRegisterForm } from "@tgs-web-nx/core/features";
import Checkbox from "@/components/UI/Checkbox";
import RedirectToLoginHint from "@/pages/register/components/RegisterForm/RedirectToLoginHint";
import FormikForm from "@/components/project/FormikForm";
import BrandLogo from "@/components/project/BrandLogo";
import { AuthFormContainer } from "@/components/styled-component/AuthFormContainer";
import { media } from "@/theme/breakpoints";

const VerifyAgeContainer = styled.div`
  width: 100%;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  margin: 24px 0 0;
  display: flex;
  align-items: start;
`;

const BrandLogoContainer = styled.div`
  margin-bottom: 50px;

  ${media.sm} {
    margin-bottom: 30px;
  }
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
      <BrandLogoContainer>
        <BrandLogo />
      </BrandLogoContainer>

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
