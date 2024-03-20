import React from "react";
import { ClassNameMap, CombinedClassKey, SnackbarProvider } from "notistack";
import styled from "styled-components";
import { makeStyles } from "@mui/styles";
import SuccessPNG from "@/assets/t36/images/success.png";
import DangerPNG from "@/assets/t36/images/warning.png";
import InfoPNG from "@/assetsfo.png";

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
type Props = {
  children: React.ReactNode;
};

const notistackRef = React.createRef<any>();

const onClickDismiss = (key: string | number) => () => {
  notistackRef.current.closeSnackbar(key);
};

const useStyles = makeStyles((theme) => ({
  success: { backgroundColor: "#fff", color: "#000" },
  error: { backgroundColor: "#fff", color: "#000" },
  warning: { backgroundColor: "#fff", color: "#000" },
  info: { backgroundColor: "#fff", color: "#000" },
}));

const StyledSnakeBarProvider = ({ children }: Props) => {
  const classes = useStyles();

  return (
    <SnackbarProvider
      classes={
        {
          variantSuccess: classes.success,
          variantError: classes.error,
          variantWarning: classes.warning,
          variantInfo: classes.info,
        } as Partial<ClassNameMap<CombinedClassKey>>
      }
      iconVariant={{
        success: <Icon src={SuccessPNG}></Icon>,
        error: <Icon src={DangerPNG}></Icon>,
        warning: <Icon src={DangerPNG}></Icon>,
        info: <Icon src={InfoPNG}></Icon>,
      }}
      action={(key: string | number) => <Dismiss onClick={onClickDismiss(key)}>x</Dismiss>}
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      ref={notistackRef}
    >
      {children}
    </SnackbarProvider>
  );
};

export default StyledSnakeBarProvider;
