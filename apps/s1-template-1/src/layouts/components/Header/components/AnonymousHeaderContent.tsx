import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";
import { SignInButton, SignUpButton } from "@/components/UI/Button";
import { theme } from "@/theme";
import { useAuth } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  height: 100%;
  padding-left: 1rem;
`;

type Props = {
  buttonWidth?: string;
};

const AnonymousHeaderContent = ({ buttonWidth }: Props) => {
  const { goToLogin, goToRegister } = useAuth();

  return (
    <ButtonContainer>
      <SignInButton
        onClick={goToLogin}
        style={{
          color: theme.white,
        }}
      >
        {i18n.t("web.header.signin")}
      </SignInButton>

      <SignUpButton
        color={"primary"}
        onClick={goToRegister}
        style={{
          color: theme.white,
          background: theme.signUpButtonBackground,
        }}
      >
        {i18n.t("web.header.signup")}
      </SignUpButton>
      <HeaderLanguageSwitch />
    </ButtonContainer>
  );
};

export default AnonymousHeaderContent;
