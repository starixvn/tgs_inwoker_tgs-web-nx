import React from "react";
import styled from "styled-components";
import { MenuItem } from "@mui/material";
import config from "@tgs-web-nx/config";
import { TextField } from "@/components/UI/TextField";
import { FormikFormInput } from "@/components/project/FormikForm";
import { Select } from "@/components/UI/Select";
import { GrayInputWrapper } from "@/components/styled-component/auth/GrayInputWrapper";

const PhoneContainer = styled.div`
  display: flex;
  overflow: visible;
  gap: 14px;
`;

type Props = {
  formInput: FormikFormInput;
  formik: any;
  showErrorOn?: "bottom" | "input";
};

const FormPhone = ({ formInput, formik, showErrorOn }: Props) => {
  const { label, name, type } = formInput;

  return (
    <PhoneContainer>
      <GrayInputWrapper key={"areaCode"} style={{ marginRight: "10px", width: "100px" }}>
        <Select
          type={"string"}
          fullWidth
          placeholder={formik.values["areaCode"]}
          variant={"outlined"}
          name={"areaCode"}
          value={formik.values["areaCode"]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <MenuItem value={config.features.PhonePrefix}>{config.features.PhonePrefix}</MenuItem>
        </Select>
      </GrayInputWrapper>

      <GrayInputWrapper key={name} style={{ flex: 1 }}>
        <TextField
          type={"text"}
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
    </PhoneContainer>
  );
};

export default FormPhone;
