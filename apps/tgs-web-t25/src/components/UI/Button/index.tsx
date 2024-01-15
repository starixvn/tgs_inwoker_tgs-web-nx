import React from "react";
import { Button as MuiButton, ButtonProps, styled as muiStyled } from "@mui/material";

export const StyledButton = muiStyled(MuiButton)(({ theme }) => ({
  borderRadius: "5px",
  whiteSpace: "nowrap",
  padding: "10px",
  fontSize: "1rem",
  fontWeight: 700,
  color: theme.palette.black,
  // background: "linear-gradient(90deg, #FACE27 53.76%, #F3AF16 54.17%)",
  boxShadow: "none !important",

  "&:disabled": {
    background: theme.palette.action.disabledBackground,
    color: "black",
  },

  "&:hover": {
    // background: theme.palette.gray50,
    color: theme.palette.black,

    border: "none",
  },
}));

export const Button = (props: ButtonProps) => {
  return <StyledButton variant={props.variant || "contained"} {...props} />;
};
