import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth } from "@tgs-web-nx/core/features";
import { theme } from "@/theme";

const AuthButtonGroupContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AuthButton = styled.div`
  flex: 1;
  padding: 15.6px;
  text-align: center;
  background: gold;
  font-size: 14.5px;
  text-transform: uppercase;
  cursor: pointer;
`;

const AuthButtonGroup = () => {
  const { goToLogin, goToRegister, isLogin } = useAuth();

  if (isLogin) return null;

  return (
    <AuthButtonGroupContainer>
      <AuthButton style={{ background: theme.primary }} onClick={goToLogin}>
        {i18n.t("common.login")}
      </AuthButton>

      <AuthButton style={{ background: theme.secondary }} onClick={goToRegister}>
        {i18n.t("common.register")}
      </AuthButton>
    </AuthButtonGroupContainer>
  );
};

export default AuthButtonGroup;
