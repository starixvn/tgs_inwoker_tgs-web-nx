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
    WebkitTextFillColor: "#828282 !important",
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
  },
  option: {
    background: "#1D1D1D !important",
    color: "#fff",
    "&:hover": {
      background: "#828282 !important",
    },
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.text.primary,
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
