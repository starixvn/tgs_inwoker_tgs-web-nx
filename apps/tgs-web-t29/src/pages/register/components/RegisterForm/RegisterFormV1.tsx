import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useRegisterForm } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { Checkbox } from "@/components/UI/Checkbox";
import RedirectToLoginHint from "@/pages/register/components/RegisterForm/RedirectToLoginHint";
import FormikForm from "@/components/project/FormikForm";
import { AuthFormContainer } from "@/components/styled-component/AuthFormContainer";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import BrandLogo from "@/components/project/BrandLogo";

const VerifyAgeContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  margin: 24px 0 0;
  display: flex;
  align-items: start;
`;

const LoginTitle = styled.div`
  font-size: 48px;
  font-weight: 700;
  line-height: 55px;
  letter-spacing: 0em;
  text-align: center;
  margin-bottom: 50px;
  color: ${({ theme }) => theme.primary};
`;

const RegisterFormV1 = () => {
  const {
    formInputConfigList,
    formik,
    isLoading,
    registerError,
    isConfirmedAdult,
    handleClickConfirmAdult,
  } = useRegisterForm();
  const { isMobileSize } = useRwd();

  return (
    <AuthFormContainer>
      {isMobileSize ? (
        <BrandLogo style={{ marginBottom: "64px" }} />
      ) : (
        <LoginTitle>{i18n.t("common.register").toUpperCase()}</LoginTitle>
      )}

      <FormikForm
        formInputList={formInputConfigList}
        formik={formik}
        isLoading={isLoading}
        error={registerError}
        buttonText={i18n.t("createaccount")}
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

export default React.memo(RegisterFormV1);
