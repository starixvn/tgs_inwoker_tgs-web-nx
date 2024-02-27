import { useRegisterPage, useRwd } from "@tgs-web-nx/core/hooks";
import RegisterForm from "@/components/project/auth/RegisterForm";
import { FormContainerWithBG, FormWrapper } from "@/components/styled-component/AuthFormContainer";
import BrandLogo from "@/components/project/BrandLogo";

const RegisterPage = () => {
  useRegisterPage();

  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return null;
  }

  return (
    <FormContainerWithBG>
      <BrandLogo style={{ marginTop: "94px", maxWidth: "300px" }} />
      <FormWrapper>
        <RegisterForm />
      </FormWrapper>
    </FormContainerWithBG>
  );
};

export default RegisterPage;
