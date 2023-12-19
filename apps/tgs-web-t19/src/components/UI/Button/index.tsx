import React from "react";
import { Button as MuiButton, ButtonProps, styled as muiStyled } from "@mui/material";

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
    background: theme.palette.gray,
    color: theme.palette.white,

    border: "none",
  },
}));

export const Button = (props: ButtonProps) => {
  return <StyledButton variant={props.variant || "contained"} {...props} />;
};
