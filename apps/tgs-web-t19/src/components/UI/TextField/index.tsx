import React from "react";
import { styled as muiStyled, TextField as MuiTextField, TextFieldProps } from "@mui/material";
import { useRwd } from "@tgs-web-nx/core/hooks";

const StyledTextField = muiStyled(MuiTextField)(({ theme }) => ({
  overflow: "visible",
  input: {
    padding: "12px 20px",
    color: theme.palette.gray,
    fontSize: "0.875rem",
    fontWeight: 400,
    border: "none",

    "&:-webkit-autofill": {
      WebkitTextFillColor: `${theme.palette.text.primary} !important`,
    },
  },
  label: {
    color: "rgba(255,255,255,0.3)",
    alignItems: "center",
    fontSize: "0.875rem",
    fontWeight: 400,
  },
  placeholder: {
    // color: "red",
  },

  "& input::placeholder": {
    color: "#828282",
    opacity: 1,
    fontSize: "0.875rem",
    fontWeight: 400,
  },
  [theme.breakpoints.up("sm")]: {
    input: {
      fontSize: "0.875rem",
    },
    label: {
      fontSize: "0.875rem",
    },
    "& input::placeholder": {
      fontSize: "0.875rem",
    },
  },

  "& .MuiInput-underline:after": {
    borderBottom: "none",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
}));

export const TextField = (props: TextFieldProps) => {

  return (
    <StyledTextField
      {...props}
      fullWidth={typeof props.fullWidth !== "undefined" ? props.fullWidth : true}
    />
  );
};

export default MuiTextField;
