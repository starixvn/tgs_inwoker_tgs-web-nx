import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useAnonymousHeaderContent } from "@tgs-web-nx/core/hooks";
import { HeaderButton } from "@/layouts/components/Header/components/HeaderButton";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
          width: buttonWidth ?? "92px",
          background: "linear-gradient(180deg, #91C538 0%, #648626 100%)",
        }}
      >
        {i18n.t("common.login")}
      </HeaderButton>

      <HeaderButton
        color={"primary"}
        onClick={toggleRegisterDialog}
        style={{
          width: buttonWidth ?? "92px",
          background: "linear-gradient(180deg, #57A0D8 0%, #417AA6 100%)",
        }}
      >
        {i18n.t("common.register")}
      </HeaderButton>
    </ButtonContainer>
  );
};

export default AnonymousHeaderContent;
