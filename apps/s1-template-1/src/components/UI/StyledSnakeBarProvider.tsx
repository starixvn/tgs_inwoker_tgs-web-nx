import InfoPNG from "@/assets/t18/images/info.png";
import { theme } from "@/theme";
import { SnackbarProvider } from "notistack";
import React from "react";
import styled from "styled-components";
import { ErrorIcon, SuccessIcon, WarningIcon } from "./CustomizeIcon";

const Dismiss = styled.a`
  margin-right: 12px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const Icon = styled.img`
  width: 24px;
  margin-right: 12px;
`;

const CustomizedSnackbarProvider = styled(SnackbarProvider)`
  &.notistack-MuiContent {
    border-radius: 1.2rem;
    background-color: ${({ theme }) => theme.toastBackgroundColor};
  }
  &.notistack-MuiContent-error {
    border: 2px solid #F90B44;    
    
  }
  #notistack-snackbar {
    font-size: ${({ theme }) => theme.toastFontzise};
    font-weight: 500;
    gap: .8rem;
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
        success: <SuccessIcon sx={{color: theme.toastSuccessBorderColor, fontSize: "2.8rem"}} viewBox="0 0 18 18"></SuccessIcon>,
        error: <ErrorIcon sx={{color: theme.toastErrorBorderColor, fontSize: "2.8rem"}} viewBox="0 0 18 18"></ErrorIcon>,
        warning: <WarningIcon sx={{color: theme.toastWarningBorderColor, fontSize: "2.8rem"}} viewBox="0 0 18 18"></WarningIcon>,
        info: <Icon src={InfoPNG}></Icon>,
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
