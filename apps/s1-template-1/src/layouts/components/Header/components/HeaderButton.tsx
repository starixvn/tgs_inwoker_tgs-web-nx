import { Button as MuiButton, styled as muiStyled } from "@mui/material";

const Button = muiStyled(MuiButton)(({ theme }) => ({
  height: "3.6rem",
  padding: "0 1rem",
  borderRadius: "0.8rem",
  fontSize: "1.3rem",
  lineHeight: "3.6rem",
  minWidth: "7.8rem",
  borderBottomWidth: "0.2rem",
  borderStyle: "solid",
}));

export const SignUpButton = muiStyled(Button)(({ theme }) => ({
  background: theme.palette.header.signUp.background,
  borderBottomColor: theme.palette.header.signUp.shadow,
  color: theme.palette.header.signUp.color,
}));

export const SignInButton = muiStyled(Button)(({ theme }) => ({
  background: theme.palette.header.signIn.background,
  borderBottomColor: theme.palette.header.signIn.shadow,
  color: theme.palette.header.signIn.color,
}));

export const HeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.white,
  padding: "0 18px",
  width: "auto",
  whiteSpace: "nowrap",
  fontSize: "0.812rem",
  lineHeight: "1.25rem",
  fontWeight: 400,
  borderRadius: "3px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
