import React from "react";
import { Select as MuiSelect, SelectProps, styled as muiStyled } from "@mui/material";

const StyledSelect = muiStyled(MuiSelect)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "0.937rem",
  fontWeight: 400,
  border: `none`,
  "&:focus": {
    background: "none",
  },
  "&:active": {
    background: "none",
  },
  "& > .Mui-disabled": {
    WebkitTextFillColor: theme.palette.text.disabled,
  },
  select: {
    color: theme.palette.text.primary,
    background: theme.palette.darkGray,
    padding: "11px",
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
      WebkitTextFillColor: `${theme.palette.text.primary}`,
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

  // "& .MuiOutlinedInput-notchedOutline": {
  //   border: "none",
  // },
  [theme.breakpoints.up("sm")]: {
    border: `1px solid  ${theme.palette.white}`,
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
