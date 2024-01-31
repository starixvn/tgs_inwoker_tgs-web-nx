import React from "react";
import styled from "styled-components";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { theme } from "@/theme";

const AuthSwitchButtonsContainer = styled.div`
  display: flex;
  margin: 40px 30px 0;
`;

type SwitchButtonProps = {
  $isActive: boolean;
  theme: typeof theme;
};
const SwitchButton = styled.div<SwitchButtonProps>`
  background: ${({ $isActive, theme }: SwitchButtonProps) => ($isActive ? theme.primary : "none")};
  color: ${({ $isActive, theme }: SwitchButtonProps) => ($isActive ? theme.white : theme.tertiary)};
  padding: 5px;
  width: 139px;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.465rem;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
`;

type Props = {
  activeAuthStep: "login" | "register";
};
const AuthSwitchButtons = ({ activeAuthStep }: Props) => {
  const { handleToggleLoginDialog, handleToggleRegisterDialog } = useAuthDialog();

  const handleLogin = () => {
    if (activeAuthStep === "login") return;

    handleToggleRegisterDialog(false);
    handleToggleLoginDialog(true);
  };

  const handleRegister = () => {
    if (activeAuthStep === "register") return;

    handleToggleLoginDialog(false);
    handleToggleRegisterDialog(true);
  };

  return (
    <AuthSwitchButtonsContainer>
      <SwitchButton onClick={handleLogin} $isActive={activeAuthStep === "login"}>
        {i18n.t("common.login")}
      </SwitchButton>
      <SwitchButton onClick={handleRegister} $isActive={activeAuthStep === "register"}>
        {i18n.t("common.register")}
      </SwitchButton>
    </AuthSwitchButtonsContainer>
  );
};

export default AuthSwitchButtons;
