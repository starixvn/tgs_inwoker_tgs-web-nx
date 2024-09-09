import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";
import { SignInButton, SignUpButton } from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";
import { useAuth } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import React, { useCallback } from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  height: 100%;
  padding-left: 1rem;
`;

type Props = {
  buttonWidth?: string;
};

const AnonymousHeaderContent = ({ buttonWidth }: Props) => {
  const { isDesktopSize, isMobileSize } = useRwd();
  const { goToLogin, goToRegister } = useAuth();

  return (
    <ButtonContainer>
      <SignInButton
        onClick={goToLogin}
        style={{
          color: theme.white,
        }}
      >
        Sign in
      </SignInButton>

      <SignUpButton
        color={"primary"}
        onClick={goToRegister}
        style={{
          color: theme.white,
          background: theme.signUpButtonBackground,
        }}
      >
        Sign up
      </SignUpButton>
      <HeaderLanguageSwitch />
    </ButtonContainer>
  );
};

export default AnonymousHeaderContent;
