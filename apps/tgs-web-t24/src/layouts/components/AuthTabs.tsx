import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import i18n from "@/core/utils/i18n";

const AuthTabsContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 65px;
`;

type AuthTabProps = {
  $isActive: boolean;
};
const AuthTab = styled.div<AuthTabProps>`
  cursor: pointer;
  color: ${({ $isActive, theme }) => ($isActive ? theme.white : theme.gray70)};
`;

const AuthTabs = () => {
  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname;

  const selectedAuthTab = pathname.includes("login") ? "login" : "register";

  const handleClickAuthTab = (authTabName: string) => {
    history.push(`/${authTabName}`);
  };

  return (
    <AuthTabsContainer>
      <AuthTab $isActive={selectedAuthTab === "login"} onClick={() => handleClickAuthTab("login")}>
        {i18n.t("common.login")}
      </AuthTab>
      <AuthTab
        $isActive={selectedAuthTab === "register"}
        onClick={() => handleClickAuthTab("register")}
      >
        {i18n.t("common.register")}
      </AuthTab>
    </AuthTabsContainer>
  );
};

export default AuthTabs;
