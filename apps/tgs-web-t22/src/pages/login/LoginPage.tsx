import { useLoginPage, useRwd } from "@tgs-web-nx/core/hooks";
import LoginForm from "@/components/project/auth/LoginForm";
import { FormContainerWithBG, FormWrapper } from "@/components/styled-component/AuthFormContainer";
import BrandLogo from "@/components/project/BrandLogo";
import LanguageSwitch from "@/components/project/LanguageSwitch";

const LoginPage = () => {
  useLoginPage();

  const { isDesktopSize, isMobileSize } = useRwd();

  if (isDesktopSize) {
    return null;
  }

  return (
    <FormContainerWithBG>
      <BrandLogo style={{ marginTop: "94px", maxWidth: "300px" }} />
      <FormWrapper>
        <LoginForm />
      </FormWrapper>
    </FormContainerWithBG>
  );
};

export default LoginPage;
