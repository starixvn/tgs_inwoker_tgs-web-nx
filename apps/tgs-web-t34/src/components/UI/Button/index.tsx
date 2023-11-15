import React from "react";
import { Button as MuiButton, ButtonProps, styled as muiStyled } from "@mui/material";

export const StyledButton = muiStyled(MuiButton)(({ theme }) => ({
  whiteSpace: "nowrap",
  borderRadius: "2px",
  padding: "10px",
  fontSize: "0.875rem",
  fontWeight: 700,
  color: theme.palette.white,
  background: theme.palette.secondary.main,
  border: `1px solid transparent`,

  "&:disabled": {
    background: theme.palette.action.disabledBackground,
    color: "black",
  },

  "&:hover": {
    color: theme.palette.secondary.main,
    background: "none",
    border: `1px solid ${theme.palette.secondary.main}`,
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
