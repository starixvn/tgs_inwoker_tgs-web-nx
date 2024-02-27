import { useForgotPasswordPage, useRwd } from "@tgs-web-nx/core/hooks";
import ForgotPasswordForm from "@/components/project/auth/ForgotPasswordForm";
import { FormContainerWithBG, FormWrapper } from "@/components/styled-component/AuthFormContainer";
import BrandLogo from "@/components/project/BrandLogo";

const ForgotPasswordPage = () => {
  useForgotPasswordPage();

  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return null;
  }

  return (
    <FormContainerWithBG>
      <BrandLogo style={{ marginTop: "94px", maxWidth: "300px" }} />
      <FormWrapper>
        <ForgotPasswordForm />
      </FormWrapper>
    </FormContainerWithBG>
  );
};

export default ForgotPasswordPage;
