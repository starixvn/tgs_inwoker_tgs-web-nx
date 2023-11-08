import React from "react";
import { TextField } from "@/components/UI/TextField";
import { FormikFormInput } from "@/components/project/FormikForm";
import { getFormInputType } from "@/components/project/FormikForm/utils/getFormInputType";
import { GrayInputWrapper } from "@/components/styled-component/auth/GrayInputWrapper";

type Props = {
  formInput: FormikFormInput;
  formik: any;
  showErrorOn?: "bottom" | "input";
};

const FormText = ({ formInput, formik, showErrorOn }: Props) => {
  const { label, name, type } = formInput;

  return (
    <GrayInputWrapper key={name} style={{ marginBottom: "21px" }}>
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
