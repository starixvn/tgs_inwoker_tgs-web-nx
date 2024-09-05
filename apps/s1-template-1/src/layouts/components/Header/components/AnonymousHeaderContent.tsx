import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";
import { RoundHeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";
import { useAuth } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import React, { useCallback } from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LoginButton = styled.div(({ theme }) => ({
  height: "28px",
  paddingLeft: "12px",
  paddingRight: "12px",
  fontSize: "13px",
  lineHeight: "28px",
  flexShrink: 0,
  cursor: "pointer",
}));

type Props = {
  buttonWidth?: string;
};

const AnonymousHeaderContent = ({ buttonWidth }: Props) => {
  const { isDesktopSize, isMobileSize } = useRwd();
  const { goToLogin, goToRegister } = useAuth();

  return (
    <ButtonContainer>
      <LoginButton
        onClick={goToLogin}
        style={{
          color: theme.white,
        }}
      >
        Sign in
      </LoginButton>

      <RoundHeaderButton
        color={"primary"}
        onClick={goToRegister}
        style={{
          color: theme.white,
          background: theme.signUpButtonBackground,
        }}
      >
        Sign up
      </RoundHeaderButton>
      <HeaderLanguageSwitch />
    </ButtonContainer>
  );
};

export default AnonymousHeaderContent;
