import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuthDialog, useHeader } from "@tgs-web-nx/core/features";
import { HeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
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
      <HeaderButton
        onClick={toggleLoginDialog}
        sx={{
          width: buttonWidth ?? "77px",
          background: {
            sm: "#0A79B0",
          },
        }}
      >
        {i18n.t("common.login")}
      </HeaderButton>

      <HeaderButton
        color={"primary"}
        onClick={toggleRegisterDialog}
        sx={{
          width: buttonWidth ?? "77px",
          color: {
            xs: theme.secondary,
            sm: theme.white,
          },
          background: {
            sm: "#01B402",
          },
        }}
      >
        {i18n.t("common.register")}
      </HeaderButton>
    </ButtonContainer>
  );
};

export default AnonymousHeaderContent;
