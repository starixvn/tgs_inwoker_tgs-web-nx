import React from "react";
import styled from "styled-components";
import { MenuItem, Select, styled as muiStyled } from "@mui/material";
import { i18n } from "@tgs-web-nx/utils";
import { UserTypeEnum } from "@tgs-web-nx/core/features";
import { StyledTextField } from "./FormText";
import { FormikFormInput } from "@/components/project/FormikForm";
import { getFormInputType } from "@/components/project/FormikForm/utils/getFormInputType";
// import { Select } from "@/components/UI/Select";
import { GrayInputWrapper } from "@/components/styled-component/auth/GrayInputWrapper";
import { theme } from "@/theme";
 
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

const StyledSelect = muiStyled(Select)(({ theme }) => ({
  color: `${theme.palette.text.primary} !important`,
  minWidth: "100px",
  ".MuiSelect-icon": {
    color: theme.palette.white,
  },
  [theme.breakpoints.up("sm")]: {
    color: `${theme.palette.black} !important`,
    ".MuiSelect-icon": {
      color: theme.palette.black,
    },
  },
}));

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

        <DropdownContainer>
          <StyledSelect
            type={"string"}
            label={formik.values["userType"]}
            variant={"outlined"}
            fullWidth
            name={"userType"}
            value={formik.values["userType"]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ color: theme.black }}
            MenuProps={{
              PaperProps: {
                sx: {
                  background: theme.inputBackground,
                  "& .MuiMenuItem-root": {
                    color: theme.text,
                  },
                },
              },
            }}
          >
            <MenuItem value={UserTypeEnum.AGENT}>
              <>{i18n.t("usertype.agent")}</>
            </MenuItem>
            <MenuItem value={UserTypeEnum.PLAYER}>
              <>{i18n.t("usertype.player")}</>
            </MenuItem>
          </StyledSelect>
        </DropdownContainer>
      </GrayInputWrapper>
    </FormPromotionCodeContainer>
  );
};

export default FormPromotionCode;
