import React from "react";
import { useForgotPasswordPage, useRwd } from "@tgs-web-nx/core/hooks";
<<<<<<< develop
<<<<<<< develop
import ForgotPasswordForm from "@/components/project/auth/ForgotPasswordForm";
import { FormContainerWithBG } from "@/components/styled-component/AuthFormContainer";
=======
import { FormContainer } from "@/components/styled-component/AuthFormContainer";
=======
>>>>>>> feat: update auth style in t33
import ForgotPasswordForm from "@/components/project/auth/ForgotPasswordForm";
>>>>>>> refactor: update auth structure

const ForgotPasswordPage = () => {
  useForgotPasswordPage();

  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return null;
  }

<<<<<<< develop
<<<<<<< develop
  return <ForgotPasswordForm />;
=======
  return (
    <FormContainer>
      <ForgotPasswordForm />
    </FormContainer>
  );
>>>>>>> refactor: update auth structure
=======
  return <ForgotPasswordForm />;
>>>>>>> feat: update auth style in t33
};

export default ForgotPasswordPage;
