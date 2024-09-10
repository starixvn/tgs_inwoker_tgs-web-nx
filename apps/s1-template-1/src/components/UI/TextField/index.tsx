import { styled as muiStyled, TextField as MuiTextField, TextFieldProps } from "@mui/material";

const StyledTextField = muiStyled(MuiTextField)(({ theme }) => ({
  background: theme.palette.form.backgroundColor,
  borderRadius: "1rem",
  border: `1px solid ${theme.palette.form.borderColor}`,
  input: {
    padding: "0 1.2rem",
    color: theme.palette.text.primary,
    fontSize: "1.4rem",
    height: "4.8rem",
    lineHeight: "4.8rem",

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

  "& input::placeholder": {
    color: `${theme.palette.form.textColor}`,
    opacity: 1,
    fontSize: "1.4rem",
    fontWeight: 700,
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
    "&.Mui-disabled": {
      input: {
        WebkitTextFillColor: `${theme.palette.text.primary}`,
      },
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
