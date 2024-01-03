import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuth, useAuthContext, useAuthDialog, useHeader } from "@tgs-web-nx/core/features";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/layouts/components/Header/components/HeaderButton";
// import Icon from "@/components/project/Icon";
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
      <PrimaryButton onClick={goToLogin}>{i18n.t("common.login")}</PrimaryButton>
      <SecondaryButton onClick={goToRegister}>{i18n.t("common.register")}</SecondaryButton>
      {isDesktopSize && <HeaderLanguageSwitch />}
    </ButtonContainer>
  );
};

export default AnonymousHeaderContent;
