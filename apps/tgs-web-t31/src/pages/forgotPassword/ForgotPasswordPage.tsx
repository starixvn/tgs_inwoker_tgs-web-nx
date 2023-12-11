import React from "react";
import { useForgotPasswordPage, useRwd } from "@tgs-web-nx/core/hooks";
<<<<<<< develop
import ForgotPasswordForm from "@/components/project/auth/ForgotPasswordForm";
import { FormContainerWithBG } from "@/components/styled-component/AuthFormContainer";
=======
import { FormContainer } from "@/components/styled-component/AuthFormContainer";
import ForgotPasswordForm from "@/components/project/auth/ForgotPasswordForm";
>>>>>>> refactor: update auth structure

const ForgotPasswordPage = () => {
  useForgotPasswordPage();

  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return null;
  }

<<<<<<< develop
  return <ForgotPasswordForm />;
=======
  return (
    <FormContainer>
      <ForgotPasswordForm />
    </FormContainer>
  );
>>>>>>> refactor: update auth structure
};

export default ForgotPasswordPage;
