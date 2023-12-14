import React from "react";
import { Button as MuiButton, ButtonProps, styled as muiStyled } from "@mui/material";

export const StyledButton = muiStyled(MuiButton)(({ theme }) => ({
  whiteSpace: "nowrap",
  borderRadius: "5px",
  padding: "10px 6px",
  fontSize: "1.25rem",
  fontWeight: 400,
  color: theme.palette.white,
  background: theme.palette.primary.main,
  boxShadow: "none !important",

  "&:disabled": {
    background: theme.palette.action.disabledBackground,
    color: theme.palette.white,
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
