import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";
import { RoundHeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";
import { useAuth } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
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
        {i18n.t("common.login").toLocaleUpperCase()}
      </LoginButton>

      <RoundHeaderButton
        color={"primary"}
        onClick={goToRegister}
        style={{
          color: theme.white,
          background: theme.signUp,
        }}
      >
        {i18n.t("common.register").toLocaleUpperCase()}
      </RoundHeaderButton>
      <HeaderLanguageSwitch />
    </ButtonContainer>
  );
};

export default AnonymousHeaderContent;
