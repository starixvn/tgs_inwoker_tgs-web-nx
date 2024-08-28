import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuth, useAuthContext, useAuthDialog, useHeader } from "@tgs-web-nx/core/features";
import { RoundHeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";
import iconLogin from "@/assets/t29/images/header/icon-login.svg";
import Icon from "@/components/project/Icon";
import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

type Props = {
  buttonWidth?: string;
};

const AnonymousHeaderContent = ({ buttonWidth }: Props) => {
  const { isDesktopSize, isMobileSize } = useRwd();
  const { goToLogin, goToRegister } = useAuth();

  return (
    <ButtonContainer>
      <RoundHeaderButton
        onClick={goToLogin}
        style={{
          color: theme.lightPurple,
          background: theme.memberSection,
          border: `1px solid ${theme.lightPurple}`,
        }}
      >
        {i18n.t("common.login").toLocaleUpperCase()}
      </RoundHeaderButton>

      <RoundHeaderButton
        color={"primary"}
        onClick={goToRegister}
        style={{
          color: theme.white,
          background: theme.primary,
        }}
      >
        {i18n.t("common.register").toLocaleUpperCase()}
      </RoundHeaderButton>
      {isMobileSize && <HeaderLanguageSwitch />}
    </ButtonContainer>
  );
};

export default AnonymousHeaderContent;
