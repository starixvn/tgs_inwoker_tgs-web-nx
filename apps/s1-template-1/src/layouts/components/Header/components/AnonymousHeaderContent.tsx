import { useAuth } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import React, { useCallback } from "react";
import styled from "styled-components";
import { i18n, utility } from "@tgs-web-nx/utils";
import { theme } from "@/theme";
import { SignInButton, SignUpButton } from "@/layouts/components/Header/components/HeaderButton";
import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";

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
