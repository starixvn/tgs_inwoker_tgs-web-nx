import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useAnonymousHeaderContent } from "@tgs-web-nx/core/hooks";
import { HeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

type Props = {
  buttonWidth?: string;
};

const AnonymousHeaderContent = ({ buttonWidth }: Props) => {
  const { toggleLoginDialog, toggleRegisterDialog } = useAnonymousHeaderContent();

  return (
    <ButtonContainer>
      <HeaderButton
        onClick={toggleLoginDialog}
        style={{
          // background: "linear-gradient(90deg, #7135F3 50.07%, #5E20CF 50.54%)",
          width: buttonWidth ?? "105px",
        }}
      >
        {i18n.t("common.login")}
      </HeaderButton>

      <HeaderButton
        color={"primary"}
        onClick={toggleRegisterDialog}
        style={{
          background: theme.primary,
          width: buttonWidth ?? "105px",
        }}
      >
        {i18n.t("common.register")}
      </HeaderButton>
    </ButtonContainer>
  );
};

export default AnonymousHeaderContent;
