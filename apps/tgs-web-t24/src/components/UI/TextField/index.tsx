import React from "react";
import { styled as muiStyled, TextField as MuiTextField, TextFieldProps } from "@mui/material";

const StyledTextField = muiStyled(MuiTextField)(({ theme }) => ({
  color: theme.palette.common.white,
  overflow: "visible",
  input: {
    padding: "16px 10px",
    color: theme.palette.common.white,
    fontSize: "0.875rem",
    fontWeight: 400,
    border: "none",

    "&:-webkit-autofill": {
      WebkitTextFillColor: `${theme.palette.common.white} !important`,
    },
  },
  label: {
    color: "rgba(255,255,255,0.3)",
    alignItems: "center",
    fontSize: "0.875rem",
    fontWeight: 400,
  },

  "& input::placeholder": {
    color: theme.palette.gray10,
    opacity: 1,
    fontSize: "0.875rem",
    fontWeight: 400,
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
    //@ts-ignore
    <StyledTextField
      {...props}
      fullWidth={typeof props.fullWidth !== "undefined" ? props.fullWidth : true}
    />
  );
};

export default MuiTextField;
