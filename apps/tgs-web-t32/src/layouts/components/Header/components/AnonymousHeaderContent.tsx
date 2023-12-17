import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuth, useAuthContext, useAuthDialog, useHeader } from "@tgs-web-nx/core/features";
import { RoundHeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";
import iconLogin from "@/assets/t32/images/header/icon-login.svg";
import Icon from "@/components/project/Icon";
import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

type Props = {
  buttonWidth?: string;
};

const AnonymousHeaderContent = ({ buttonWidth }: Props) => {
  const { isDesktopSize } = useRwd();
  const { goToLogin, goToRegister } = useAuth();

  return (
    <ButtonContainer>
      {isDesktopSize && <HeaderLanguageSwitch />}
      <RoundHeaderButton
        onClick={goToLogin}
        style={{
          background: theme.primary,
          border: `1px solid ${theme.white}`,
        }}
      >
        {i18n.t("common.login")}
      </RoundHeaderButton>

      <RoundHeaderButton
        color={"primary"}
        onClick={goToRegister}
        style={{
          color: theme.white,
          background: theme.btnPri,
          border: `1px solid ${theme.btnPri}`,
        }}
      >
        {i18n.t("common.register")}
      </RoundHeaderButton>
    </ButtonContainer>
  );
};

export default AnonymousHeaderContent;
