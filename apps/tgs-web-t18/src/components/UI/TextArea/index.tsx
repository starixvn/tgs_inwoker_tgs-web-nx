import React from "react";
import { styled as muiStyled, TextField as MuiTextField, TextFieldProps } from "@mui/material";

const StyledTextArea = muiStyled(MuiTextField)(({ theme }) => ({
  overflow: "visible",
  textarea: {
    padding: "10px 20px",
    color: theme.palette.text.primary,
    background: {
      xs: theme.palette.primaryDark,
      sm: theme.palette.primaryLight,
    },
    border: `1px solid ${theme.palette.tertiary.main}`,
    borderRadius: "6px",
    fontSize: "0.875rem",
    fontWeight: 400,
    height: "100% !important",
    minHeight: "100px",

    "&:-webkit-autofill": {
      WebkitTextFillColor: `${theme.palette.text.primary} !important`,
    },
  },
  "& .MuiInputBase-root": {
    padding: 0,
  },
  label: {
    color: "rgba(255,255,255,0.3)",
    alignItems: "center",
    fontSize: "0.875rem",
    fontWeight: 400,
  },

  "& textarea::placeholder": {
    color: theme.palette.white,
    opacity: 0.3,
    fontSize: "0.937rem",
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
