import React from "react";
import { Select as MuiSelect, SelectProps, styled as muiStyled } from "@mui/material";

const StyledSelect = muiStyled(MuiSelect)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "0.937rem",
  fontWeight: 400,
  border: `1px solid ${theme.palette.inputBGC}`,
  "&:focus": {
    background: "none",
  },
  "&:active": {
    background: "none",
  },
  select: {
    color: theme.palette.text.primary,
    background: theme.palette.inputBGC,
    border: `1px solid ${theme.palette.inputBGC}`,
    padding: "10px",
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
    color: theme.palette.text.primary,
  },

  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  ".MuiOutlinedInput-input": {
    WebkitTextFillColor: `${theme.palette.text.primary}`,
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
