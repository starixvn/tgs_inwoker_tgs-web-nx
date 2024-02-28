import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth } from "@tgs-web-nx/core/features";
import { HeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

type Props = {
  buttonWidth?: string;
};

const AnonymousHeaderContent = ({ buttonWidth }: Props) => {
  const { goToLogin, goToRegister } = useAuth();

  return (
    <ButtonContainer>
      <HeaderButton
        color={"primary"}
        onClick={goToRegister}
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
      <HeaderButton
        onClick={goToLogin}
        sx={{
          width: buttonWidth ?? "59px",
          background: {
            sm: "#0A79B0",
          },
          color: {
            xs: theme.secondary,
            sm: theme.white,
          },
        }}
      >
        {i18n.t("common.login")}
      </HeaderButton>
    </ButtonContainer>
  );
};

export default AnonymousHeaderContent;
