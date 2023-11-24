import React from "react";
import { Button as MuiButton, ButtonProps, styled as muiStyled } from "@mui/material";

export const StyledButton = muiStyled(MuiButton)(({ theme }) => ({
  whiteSpace: "nowrap",
  borderRadius: "50px",
  padding: "10px",
  fontSize: "1rem",
  fontWeight: 700,
  color: theme.palette.white,
  background: theme.palette.primaryGradient,
  boxShadow: "none",

  "&:disabled": {
    background: theme.palette.action.disabledBackground,
    color: theme.palette.white60,
  },
}));

export const Button = (props: ButtonProps) => {
  return (
    <StyledButton
      variant={props.variant || "contained"}
      // color={props.color || "primary"}
      {...props}
    />
  );
};
