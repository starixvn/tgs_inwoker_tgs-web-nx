import { Select as MuiSelect, SelectProps, styled as muiStyled } from "@mui/material";
import React from "react";

export const StyledSelect = muiStyled(MuiSelect)(({ theme }) => ({
  color: "#828282",
  fontSize: "0.937rem",
  fontWeight: 400,
  border: "none",
  "&:focus": {
    background: "none",
  },
  "&:active": {
    background: "none",
  },
  select: {
    color: "#828282",
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
  "& .MuiSvgIcon-root": {
    color: "#828282",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

export const Select = (props: SelectProps) => {
  return <StyledSelect {...props} />;
};
