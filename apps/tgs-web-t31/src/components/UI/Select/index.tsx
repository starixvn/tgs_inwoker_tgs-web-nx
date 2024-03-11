import React from "react";
import { Select as MuiSelect, SelectProps, styled as muiStyled } from "@mui/material";

const StyledSelect = muiStyled(MuiSelect)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "0.937rem",
  fontWeight: 400,
  border: `1px solid ${theme.palette.white30}`,
  "&:focus": {
    background: "none",
  },
  "&:active": {
    background: "none",
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
    "&.Mui-disabled": {
      WebkitTextFillColor: "#828282",
    },
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.text.primary,
  },

  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  option: {
    background: "#8C8998 !important",
    color: `${theme.palette.white}`,
    "&:hover": {
      background: `${theme.palette.white} !important`,
    },
    "&:active": {
      background: `${theme.palette.white} !important`,
    },
    "&.Mui-disabled": {
      WebkitTextFillColor: `${theme.palette.white}`,
    },
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
