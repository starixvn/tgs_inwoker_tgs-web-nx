import React from "react";
import { styled as muiStyled, TextField as MuiTextField, TextFieldProps } from "@mui/material";
import { FormikFormInput } from "@tgs-web-nx/core/features";
import { TextField } from "@/components/UI/TextField";
import { getFormInputType } from "@/components/project/FormikForm/utils/getFormInputType";
import { GrayInputWrapper } from "@/components/styled-component/auth/GrayInputWrapper";

type Props = {
  formInput: FormikFormInput;
  formik: any;
  showErrorOn?: "bottom" | "input";
};

export const StyledTextField = muiStyled(MuiTextField)(({ theme }) => ({
  overflow: "visible",
  background: theme.palette.inputBackground,
  border: `1px solid ${theme.palette.white30}`,
  input: {
    padding: "12px 20px",
    color: theme.palette.text.primary,
    fontSize: "0.875rem",
    fontWeight: 400,
    border: "none",

    "&:-webkit-autofill": {
      WebkitTextFillColor: `${theme.palette.white} !important`,
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
    background: theme.palette.white,
    input: {
      color: theme.palette.black,
      fontSize: "0.875rem",
      "&:-webkit-autofill": {
        WebkitTextFillColor: `${theme.palette.black} !important`,
      },
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

const FormText = ({ formInput, formik, showErrorOn }: Props) => {
  const { label, name, type } = formInput;

  return (
    <GrayInputWrapper key={name}>
      <StyledTextField
        type={getFormInputType(type)}
        placeholder={label}
        variant={"outlined"}
        fullWidth
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={showErrorOn === "input" && formik.touched[name] && formik.errors[name]}
        error={showErrorOn === "input" && !!formik.touched[name] && !!formik.errors[name]}
        inputProps={{
          autoComplete: "off",
        }}
      />
    </GrayInputWrapper>
  );
};

export default FormText;
