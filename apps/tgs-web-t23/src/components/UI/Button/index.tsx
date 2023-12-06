import React from "react";
import { Button as MuiButton, ButtonProps, styled as muiStyled } from "@mui/material";

export const StyledButton = muiStyled(MuiButton)(({ theme }) => ({
  whiteSpace: "nowrap",
  borderRadius: "20px",
  padding: "10px 6px",
  fontSize: "0.637rem",
  fontWeight: 700,
  color: theme.palette.white,
  background: "linear-gradient(90deg, #FACE27 53.76%, #F3AF16 54.17%)",

  "&:disabled": {
    background: theme.palette.action.disabledBackground,
    color: "black",
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
