import React from "react";
import { FormikFormInput } from "@tgs-web-nx/core/features";
import { TextField, GrayInputWrapper } from "@/components/UI/TextField";
import { getFormInputType } from "@/components/project/FormikForm/utils/getFormInputType";

type Props = {
  formInput: FormikFormInput;
  formik: any;
  showErrorOn?: "bottom" | "input";
};

const FormText = ({ formInput, formik, showErrorOn }: Props) => {
  const { label, name, type } = formInput;

  return (
    <GrayInputWrapper key={name}>
      <TextField
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
