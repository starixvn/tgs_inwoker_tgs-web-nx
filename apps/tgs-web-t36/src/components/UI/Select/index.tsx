import React from "react";
import { Select as MuiSelect, SelectProps, styled as muiStyled } from "@mui/material";

const StyledSelect = muiStyled(MuiSelect)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "0.937rem",
  fontWeight: 400,
  border: "none",
  "&:focus": {
    background: "none",
  },
  "&:active": {
    background: "none",
  },
  "& > .Mui-disabled": {
    WebkitTextFillColor: `${theme.palette.text.disabled} !important`,
  },
  select: {
    color: theme.palette.text.primary,
    padding: "14px",
    "&:focus": {
      background: "none",
    },
    "&:active": {
      background: "none",
    },
    "&:disabled": {
      color: "#828282",
    },
  },
  option: {
    background: "#1D1D1D !important",
    color: "#fff",
    "&:hover": {
      background: "#828282 !important",
    },
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none !important",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
    "&.Mui-disabled": {
      input: {
        WebkitTextFillColor: `${theme.palette.text.primary}`,
      },
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .css-xrq6d6-MuiSvgIcon-root-MuiNativeSelect-icon": {
    color: "black !important",
  },
}));

export const Select = (props: SelectProps) => {
  return (
    <StyledSelect
      {...props}
      // IconComponent={() => (
      //   <Icon iconUrl={iconDown} width={"16px"} height={"16px"} style={{ marginRight: "10px" }} />
      // )}
    />
  );
};
