import React from "react";
import { styled as muiStyled, TextField as MuiTextField, TextFieldProps } from "@mui/material";

const StyledTextArea = muiStyled(MuiTextField)(({ theme }) => ({
  overflow: "visible",
  textarea: {
    padding: "10px",
    color: theme.palette.text.primary,
    fontSize: "0.875rem",
    fontWeight: 400,
    border: "none",
    height: "100% !important",
    minHeight: "100px",

    "&:-webkit-autofill": {
      WebkitTextFillColor: `${theme.palette.text.primary} !important`,
    },
  },
  "& .MuiInputBase-root": {
    padding: 0,
    border: `1px solid ${theme.palette.inputBGC}`,
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

  "& textarea::placeholder": {
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

export const TextArea = (props: TextFieldProps) => {
  return (
    <StyledTextArea
      {...props}
      multiline
      fullWidth={typeof props.fullWidth !== "undefined" ? props.fullWidth : true}
    />
  );
};
