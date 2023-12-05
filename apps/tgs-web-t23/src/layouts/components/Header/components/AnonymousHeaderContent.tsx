import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { HeaderButton } from "@/layouts/components/Header/components/HeaderButton";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

type Props = {
  buttonWidth?: string;
};

const AnonymousHeaderContent = ({ buttonWidth }: Props) => {
  return (
    <ButtonContainer>
      <HeaderButton
        onClick={goToLogin}
        style={{
          background: "linear-gradient(90deg, #7135F3 50.07%, #5E20CF 50.54%)",
          width: buttonWidth ?? "92px",
        }}
      >
        {i18n.t("common.login")}
      </HeaderButton>

      <HeaderButton
        color={"primary"}
        onClick={toggleRegisterDialog}
        style={{
          background: "linear-gradient(90deg, #FACE27 53.32%, #F3AF16 53.95%)",
          width: buttonWidth ?? "92px",
        }}
      >
        {i18n.t("common.register")}
      </HeaderButton>
    </ButtonContainer>
  );
};

export default AnonymousHeaderContent;
