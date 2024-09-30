import { styled as muiStyled, TextField as MuiTextField, TextFieldProps } from "@mui/material";

const StyledTextArea = muiStyled(MuiTextField)(({ theme }) => ({
  background: theme.palette.form.backgroundColor,
  borderRadius: "1rem",
  border: `1px solid ${theme.palette.form.borderColor}`,
  textarea: {
    padding: "10px",
    color: theme.palette.text.primary,
    border: "none",
    height: "100% !important",
    minHeight: "100px",

    "&:-webkit-autofill": {
      WebkitTextFillColor: `${theme.palette.text.primary} !important`,
    },
  },
  "& .MuiInputBase-root": {
    padding: 0,
    fontFamily: "inherit",
    fontSize: "1.4rem",
  },
  label: {
    color: theme.palette.text.primary,
    alignItems: "center",
    fontWeight: 400,
    fontSize: "1.4rem",
  },

  "& textarea::placeholder": {
    color: `${theme.palette.form.textColor}`,
    opacity: 1,
    fontWeight: 700,
    fontSize: "1.4rem",
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
