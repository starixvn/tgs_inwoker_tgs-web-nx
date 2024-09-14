import { ButtonProps, Button as MuiButton, styled as muiStyled } from "@mui/material";

export const StyledButton = muiStyled(MuiButton)(({ theme }) => ({
  borderRadius: "0",
  whiteSpace: "nowrap",
  padding: "10px",
  fontSize: "1rem",
  fontWeight: 700,
  color: theme.palette.white,
  boxShadow: "none !important",

  "&:disabled": {
    background: theme.palette.action.disabledBackground,
    color: "black",
  },

  "&:hover": {
    background: theme.palette.gray50,
    color: theme.palette.white,

    border: "none",
  },
}));

export const Button = (props: ButtonProps) => {
  return <StyledButton variant={props.variant || "contained"} {...props} />;
}; 


const ButtonDefault = muiStyled(MuiButton)(({ theme }) => ({
  height: "3.6rem",
  padding: "0 1rem",
  borderRadius: "0.8rem",
  fontSize: "1.3rem",
  fontWeight: 700,
  lineHeight: "3.6rem",
  minWidth: "7.8rem",
  borderBottomWidth: "0.2rem",
  borderStyle: "solid",
  transition: "all 0.1s ease-in-out",

  "&:hover": {
    borderBottomWidth: "0.4rem",
    transition: "all 0.2s ease-in-out",
    textShadow: "0 0 0.4rem rgba(255, 255, 255, 0.50)",
  },
  "&.Mui-disabled": {
    background: "#ccc",
    
  }
}));

export const SignUpButton = muiStyled(ButtonDefault)(({ theme }) => ({
  background: theme.palette.header.signUp.background,
  borderBottomColor: theme.palette.header.signUp.bottomBorderColor,
  color: theme.palette.header.signUp.color,
  "&:hover": {
    boxShadow: theme.palette.header.signUp.activeShadow,
  },
}));

export const SignInButton = muiStyled(ButtonDefault)(({ theme }) => ({
  background: theme.palette.header.signIn.background,
  borderBottomColor: theme.palette.header.signIn.bottomBorderColor,
  color: theme.palette.header.signIn.color,
  "&:hover": {
    boxShadow: theme.palette.header.signIn.activeShadow,
  },
}));

export const GreenGradientButton = muiStyled(SignInButton)(({ theme }) => ({
  width: "100%",
  height: "4.8rem",
}));

export const OrangeGradientButton = muiStyled(SignUpButton)(({ theme }) => ({
  width: "100%",
  height: "4.8rem",
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

