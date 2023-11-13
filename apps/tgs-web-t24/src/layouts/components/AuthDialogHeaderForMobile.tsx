import React, { useCallback } from "react";
import styled from "styled-components";
import { Close as CloseIcon } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { theme } from "@/theme";
import AuthTabs from "@/layouts/components/AuthTabs";

const AuthDialogHeaderContainer = styled.div`
  width: 100%;
  height: 70px;
`;

const CloseIconContainer = styled.div`
  position: fixed;
  top: 22px;
  right: 22px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const AuthDialogHeaderForMobile = () => {
  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname;

  const handleCloseDialog = useCallback(() => {
    const profileRegex = /\/profile\//;
    if (profileRegex.test(pathname)) {
      return history.push("/profile");
    }

    if (pathname === "/profile") {
      return history.push("/account");
    }

    history.push("/");
  }, [pathname]);

  const isInForgotPasswordPage = pathname.includes("forgot-password");

  return (
    <AuthDialogHeaderContainer
      style={{
        border: isInForgotPasswordPage ? "none" : ` border-bottom: 1px solid ${theme.gray70}`,
      }}
    >
      {!isInForgotPasswordPage && <AuthTabs />}

      <CloseIconContainer onClick={handleCloseDialog}>
        <CloseIcon
          style={{
            color: "white",
            transform: "scale(1.6)",
          }}
        />
      </CloseIconContainer>
    </AuthDialogHeaderContainer>
  );
};

export default AuthDialogHeaderForMobile;
