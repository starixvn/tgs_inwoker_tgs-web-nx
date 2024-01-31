import React from "react";
import { Button as MuiButton, ButtonProps, styled as muiStyled } from "@mui/material";

export const StyledButton = muiStyled(MuiButton)(({ theme }) => ({
  borderRadius: "5px",
  whiteSpace: "nowrap",
  padding: "12px 20px !important",
  fontSize: "25px",
  fontWeight: 400,
  color: "#101213",
  background: "#484C54",
  boxShadow: "none !important",
  lineHeight: "unset",

  "&:disabled": {
    background: theme.palette.action.disabledBackground,
    color: "black",
  },

  "&:hover": {
    background: theme.palette.primaryGradient,
    color: theme.palette.black,

    border: "none",
  },
}));

export const Button = (props: ButtonProps) => {
  return <StyledButton variant={props.variant || "contained"} {...props} />;
};
