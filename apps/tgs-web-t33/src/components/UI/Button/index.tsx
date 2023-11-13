import React from "react";
import { Button as MuiButton, ButtonProps, styled as muiStyled } from "@mui/material";

export const StyledButton = muiStyled(MuiButton)(({ theme }) => ({
  whiteSpace: "nowrap",
  borderRadius: "50px",
  padding: "10px",
  fontSize: "0.637rem",
  fontWeight: 400,
  color: theme.palette.black,
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
