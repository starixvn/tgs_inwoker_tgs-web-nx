import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuthDialog, useHeader } from "@tgs-web-nx/core/features";
import { RoundHeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";
import iconLogin from "@/assets/t29/images/header/icon-login.svg";
import Icon from "@/components/project/Icon";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

type Props = {
  buttonWidth?: string;
};

const AnonymousHeaderContent = ({ buttonWidth }: Props) => {
  const history = useHistory();
  const { isDesktopSize } = useRwd();
  const { handleToggleLoginDialog, handleToggleRegisterDialog } = useAuthDialog();
  const { handleToggleMenu } = useHeader();

  const toggleLoginDialog = useCallback(() => {
    if (!isDesktopSize) {
      handleToggleMenu(false);
    }

    if (isDesktopSize) {
      handleToggleLoginDialog(true);
      return;
    }

    history.push("/login");
  }, [handleToggleLoginDialog, handleToggleMenu, history, isDesktopSize]);

  const toggleRegisterDialog = useCallback(() => {
    if (!isDesktopSize) {
      handleToggleMenu(false);
    }

    if (isDesktopSize) {
      handleToggleRegisterDialog(true);
      return;
    }
    history.push("/register");
  }, [handleToggleMenu, handleToggleRegisterDialog, history, isDesktopSize]);

  return (
    <ButtonContainer>
      <RoundHeaderButton
        onClick={toggleLoginDialog}
        style={{
          color: theme.white,
          background: theme.primary,
        }}
      >
        <Icon iconUrl={iconLogin} width={"20px"} height={"20px"} />
        {i18n.t("common.login")}
      </RoundHeaderButton>

      <RoundHeaderButton
        color={"primary"}
        onClick={toggleRegisterDialog}
        style={{
          color: theme.white,
          background: theme.secondary,
        }}
      >
        <Icon iconUrl={iconLogin} width={"20px"} height={"20px"} />
        {i18n.t("common.register")}
      </RoundHeaderButton>
    </ButtonContainer>
  );
};

export default AnonymousHeaderContent;
