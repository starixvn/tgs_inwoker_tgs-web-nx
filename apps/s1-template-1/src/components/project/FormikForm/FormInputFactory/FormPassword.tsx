import React, { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormikFormInput } from "@tgs-web-nx/core/features";
import { TextField } from "@/components/UI/TextField";
import { GrayInputWrapper } from "@/components/styled-component/auth/GrayInputWrapper";
import { theme } from "@/theme";

type Props = {
  formInput: FormikFormInput;
  formik: any;
  showErrorOn?: "bottom" | "input";
};

const FormPassword = ({ formInput, formik, showErrorOn }: Props) => {
  const { label, name } = formInput;
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setIsShowPassword((prevState) => !prevState);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const inputType = isShowPassword ? "text" : "password";

  return (
    <TextField
      type={inputType}
      placeholder={label}
      variant={"outlined"}
      fullWidth
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      helperText={showErrorOn === "input" && formik.touched[name] && formik.errors[name]}
      error={showErrorOn === "input" && !!formik.touched[name] && !!formik.errors[name]}
      InputProps={{
        autoComplete: "new-password",
        endAdornment: (
          <InputAdornment position="end" style={{ height: "20px" }}>
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              style={{ color: theme.text }}
            >
              {isShowPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default FormPassword;
