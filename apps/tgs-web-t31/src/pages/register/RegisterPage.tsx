import React from "react";
import { useRegisterPage, useRwd } from "@tgs-web-nx/core/hooks";
import RegisterForm from "@/components/project/auth/RegisterForm";
<<<<<<< develop
<<<<<<< develop
import { FormContainerWithBG } from "@/components/styled-component/AuthFormContainer";
=======
import { FormContainer } from "@/components/styled-component/AuthFormContainer";
>>>>>>> refactor: update auth structure
=======
>>>>>>> feat: update auth style in t33

const RegisterPage = () => {
  useRegisterPage();

  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return null;
  }

  return <RegisterForm />;
};

export default RegisterPage;
