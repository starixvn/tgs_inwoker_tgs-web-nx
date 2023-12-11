import React from "react";
import { useForgotPasswordPage, useRwd } from "@tgs-web-nx/core/hooks";
import { FormContainer } from "@/components/styled-component/AuthFormContainer";
import ForgotPasswordForm from "@/components/project/auth/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  useForgotPasswordPage();

  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return null;
  }

  return (
    <FormContainer>
      <ForgotPasswordForm />
    </FormContainer>
  );
};

export default ForgotPasswordPage;
