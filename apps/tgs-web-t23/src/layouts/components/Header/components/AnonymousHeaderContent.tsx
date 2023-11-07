import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useRwd } from "@/core/hooks/tools/useRwd";
import i18n from "@/utils/i18n";
import { HeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { useHeader } from "@/core/feature/useHeader";
import { useAuthDialog } from "@/core/feature/useAuthDialog";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
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
  }, []);

  const toggleRegisterDialog = useCallback(() => {
    if (!isDesktopSize) {
      handleToggleMenu(false);
    }

    if (isDesktopSize) {
      handleToggleRegisterDialog(true);
      return;
    }
    history.push("/register");
  }, []);

  return (
    <ButtonContainer>
      <HeaderButton
        onClick={toggleLoginDialog}
        style={{
          background: "linear-gradient(90deg, #7135F3 50.07%, #5E20CF 50.54%)",
          width: buttonWidth ?? "92px",
        }}
      >
        <>{i18n.t("common.login")}</>
      </HeaderButton>

      <HeaderButton
        color={"primary"}
        onClick={toggleRegisterDialog}
        style={{
          background: "linear-gradient(90deg, #FACE27 53.32%, #F3AF16 53.95%)",
          width: buttonWidth ?? "92px",
        }}
      >
        <>{i18n.t("common.register")}</>
      </HeaderButton>
    </ButtonContainer>
  );
};

export default AnonymousHeaderContent;
