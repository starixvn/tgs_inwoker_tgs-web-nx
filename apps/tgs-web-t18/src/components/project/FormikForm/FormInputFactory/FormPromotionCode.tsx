import React from "react";
import styled from "styled-components";
import { MenuItem } from "@mui/material";
import { FormikFormInput, UserTypeEnum } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { GrayInputWrapper, TextField } from "@/components/UI/TextField";
import { Select } from "@/components/UI/Select";
import { getFormInputType } from "@/components/project/FormikForm/utils/getFormInputType";

const FormPromotionCodeContainer = styled.div`
  position: relative;
  overflow: visible;
`;
const DropdownContainer = styled.div`
  width: 90px;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  border: none;
  .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }
`;

type Props = {
  formInput: FormikFormInput;
  formik: any;
  showErrorOn?: "bottom" | "input";
};

const FormPromotionCode = ({ formInput, formik, showErrorOn }: Props) => {
  const { label, name, type } = formInput;

  return (
    <FormPromotionCodeContainer>
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
          disabled={true}
        />

        <DropdownContainer>
          <Select
            type={"string"}
            label={formik.values["userType"]}
            variant={"outlined"}
            fullWidth
            name={"userType"}
            value={formik.values["userType"]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={true}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: (theme) => {
                    return theme.palette.tertiary.dark;
                  },

                  "& .MuiMenuItem-root": {
                    padding: 2,
                  },
                },
              },
            }}
          >
            <MenuItem value={UserTypeEnum.AGENT}>{i18n.t("usertype.agent")}</MenuItem>
            <MenuItem value={UserTypeEnum.PLAYER}>{i18n.t("usertype.player")}</MenuItem>
          </Select>
        </DropdownContainer>
      </GrayInputWrapper>
    </FormPromotionCodeContainer>
  );
};

export default FormPromotionCode;
