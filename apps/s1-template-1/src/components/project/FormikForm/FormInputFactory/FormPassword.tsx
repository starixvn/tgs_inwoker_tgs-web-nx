import { theme } from "@/theme";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import React, { useState } from "react";

import { CustomTextField } from "./style";
import { Props } from "./type";

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

  const errorClass = formik.errors[formInput.name] ? "error" : "";

  return (
    <CustomTextField
      type={inputType}
      placeholder={label}
      variant={"outlined"}
      fullWidth
      name={name}
      className={`${name} ${errorClass}`}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      helperText={showErrorOn === "input" && formik.touched[name] && formik.errors[name]}
      error={showErrorOn === "input" && !!formik.touched[name] && !!formik.errors[name]}
      InputProps={{
        autoComplete: "new-password",
        endAdornment: (
          <InputAdornment position="end" style={{ height: "2rem" }}>
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
