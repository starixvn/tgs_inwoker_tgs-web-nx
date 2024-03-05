import React from "react";
import styled from "styled-components";
import { MenuItem } from "@mui/material";
import { i18n } from "@tgs-web-nx/utils";
import { FormikFormInput, InvitationType } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { TextField } from "@/components/UI/TextField";
import { getFormInputType } from "@/components/project/FormikForm/utils/getFormInputType";
import { Select } from "@/components/UI/Select";
import { GrayInputWrapper } from "@/components/styled-component/auth/GrayInputWrapper";
import { theme } from "@/theme";

const DropdownContainer = styled.div`
  min-width: 104px;
  border: none;
  position: absolute;
  right: 0;

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
  const { label, name, type, isReadOnly } = formInput;
  const { isDesktopSize } = useRwd();

  return (
    <>
      {isDesktopSize && label}
      <GrayInputWrapper key={name} style={{ border: isDesktopSize ? "1px solid #8C8998" : "none", borderRadius: isDesktopSize ? "6px" : "12px" }}>
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
          disabled={isReadOnly}
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
            style={{ color: theme.white }}
            disabled={isReadOnly}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: theme.mainBackground,
                  "& .MuiMenuItem-root": {
                    color: theme.white,
                    "&:hover": {
                      backgroundColor: theme.primary,
                      color: theme.mainBackground,
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value={InvitationType.AGENT}>
              <>{i18n.t("usertype.agent")}</>
            </MenuItem>
            <MenuItem value={InvitationType.PLAYER}>
              <>{i18n.t("usertype.player")}</>
            </MenuItem>
          </Select>
        </DropdownContainer>
      </GrayInputWrapper>
    </>
  );
};

export default FormPromotionCode;
