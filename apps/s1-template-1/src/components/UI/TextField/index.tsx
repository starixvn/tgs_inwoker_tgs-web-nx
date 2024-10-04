import { styled as muiStyled, TextField as MuiTextField, TextFieldProps } from "@mui/material";

const StyledTextField = muiStyled(MuiTextField)(({ theme }) => ({
  background: theme.palette.form.backgroundColor,
 
  "& .MuiInputBase-root": {
    fontFamily: "inherit",
    borderRadius: "1rem",
  },
  input: {
    padding: "0 1.2rem !important",
    fontSize: "1.4rem",
    height: "4.8rem",
    lineHeight: "4.8rem",
    fontWeight: "700",
    color: theme.palette.form.textColor,
    border: `1px solid ${theme.palette.form.borderColor}`,
    borderRadius: "1rem",

    "&:-webkit-autofill": {
      WebkitTextFillColor: `${theme.palette.form.textColor} !important`,
    },
  },
  label: {
    color: "rgba(255,255,255,0.3)",
    alignItems: "center",
  },

  "& input::placeholder": {
    color: `${theme.palette.form.placeHolderTextColor}`,
    opacity: 1,
    fontSize: "1.4rem",
    fontWeight: 700,
    
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
      border: `1px solid ${theme.palette.form.inputFocusColor}`,
    },
    "&.Mui-disabled": {
      input: {
        WebkitTextFillColor: `${theme.palette.form.textColor}`,
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
