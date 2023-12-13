import React from "react";
import { Button as MuiButton, ButtonProps, styled as muiStyled } from "@mui/material";

export const StyledButton = muiStyled(MuiButton)(({ theme }) => ({
  // height: "53px",
  whiteSpace: "nowrap",
  padding: "15px",
  fontSize: "1rem",
  lineHeight: "1.172rem",
  fontWeight: 700,
  color: theme.palette.white,
  background: theme.palette.primary,
  borderRadius: 0,
  borderBottom: `4px solid ${theme.palette.greenBorder}`,
  boxShadow: "none !important",

  "&:disabled": {
    background: theme.palette.action.disabledBackground,
    borderBottom: `4px solid ${theme.palette.darkBlue}`,
    color: theme.palette.white,
  },

  "&:hover": {
    background: "none",
    color: theme.palette.primary.main,
    borderBottom: `4px solid transparent`,
  },
}));

export const Button = (props: ButtonProps) => {
  return <StyledButton variant={props.variant || "contained"} {...props} />;
};
