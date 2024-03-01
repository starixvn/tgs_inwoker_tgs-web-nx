import { Select as MuiSelect, SelectProps } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import React from "react";

export const StyledSelect = muiStyled(MuiSelect)(({ theme }) => ({
  color: theme.palette.tertiary.main,
  // background: theme.palette.primaryLight,
  fontSize: "0.937rem",
  fontWeight: 400,
  "&:focus": {
    background: "none",
  },
  "&:active": {
    background: "none",
  },
  "& > .Mui-disabled": {
    WebkitTextFillColor: theme.palette.tertiary.main,
  },

  select: {
    color: theme.palette.white,
    padding: "14px",
    "&:focus": {
      background: "none",
    },
    "&:active": {
      background: "none",
    },
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.tertiary.main,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  option: {
    background: "#181F2B !important",
    color: "#fff",
  },
}));

export const Select = (props: SelectProps) => {
  return <StyledSelect {...props} />;
};
