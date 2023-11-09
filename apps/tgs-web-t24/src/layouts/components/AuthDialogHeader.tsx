import React, { useCallback } from "react";
import styled from "styled-components";
import { Close as CloseIcon } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { useRwd } from "@/core/hooks/tools/useRwd";

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

type Props = {};
const AuthDialogHeader = (props: Props) => {
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

  return (
    <AuthDialogHeaderContainer>
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

export default AuthDialogHeader;
