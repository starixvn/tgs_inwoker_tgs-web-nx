import { theme } from "@/theme";
import { SnackbarProvider } from "notistack";
import React from "react";
import styled from "styled-components";

import { ErrorIcon, SuccessIcon, WarningIcon } from "./CustomizeIcon";

const Icon = styled.img`
  width: 24px;
  margin-right: 12px;
`;

const CustomizedSnackbarProvider = styled(SnackbarProvider)`
  &.notistack-MuiContent {
    border-radius: 1.2rem;
    
  }
  &.notistack-MuiContent-error {
    border: 2px solid ${({ theme }) => theme.toastErrorBorderColor};
    background-color: ${({ theme }) => theme.toastErrorBackgroundColor};
  }
  &.notistack-MuiContent-success {
    border: 2px solid ${({ theme }) => theme.toastSuccessBorderColor};
    background-color: ${({ theme }) => theme.toastSuccessBackgroundColor};
  }
  &.notistack-MuiContent-warning {
    border: 2px solid ${({ theme }) => theme.toastWarningBorderColor};
    background-color: ${({ theme }) => theme.toastWarningBackgroundColor};
  }

  #notistack-snackbar {
    font-size: ${({ theme }) => theme.toastFontzise};
    font-weight: 500;
    gap: 0.8rem;
    color: ${({ theme }) => theme.toastTextColor};
  }
`;

type Props = {
  children: React.ReactNode;
};

const notistackRef = React.createRef<any>();

const onClickDismiss = (key: string | number) => () => {
  notistackRef.current.closeSnackbar(key);
};

const StyledSnakeBarProvider = ({ children }: Props) => {
  return (
    <CustomizedSnackbarProvider
      iconVariant={{
        success: (
          <SuccessIcon
            sx={{ color: theme.toastSuccessBorderColor, fontSize: "2.2rem" }}
            viewBox="0 0 14 14"
          ></SuccessIcon>
        ),
        error: (
          <ErrorIcon
            sx={{ color: theme.toastErrorBorderColor, fontSize: "2.2rem" }}
            viewBox="0 0 14 14"
          ></ErrorIcon>
        ),
        warning: (
          <WarningIcon
            sx={{ color: theme.toastWarningBorderColor, fontSize: "2.2rem" }}
            viewBox="0 0 16 16"
          ></WarningIcon>
        ),
        info: <Icon src={""}></Icon>,
      }}
      action={""}
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      ref={notistackRef}
    >
      {children}
    </CustomizedSnackbarProvider>
  );
};

export default StyledSnakeBarProvider;
