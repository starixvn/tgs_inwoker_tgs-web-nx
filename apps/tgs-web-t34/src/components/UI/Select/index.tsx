import { Select as MuiSelect, SelectProps, styled as muiStyled } from "@mui/material";
import React from "react";

export const StyledSelect = muiStyled(MuiSelect)(({ theme }) => ({
  color: theme.palette.black,
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
    color: theme.palette.black,
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
    color: theme.palette.black,
  },

  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

export const Select = (props: SelectProps) => {
  return <StyledSelect {...props} />;
};
