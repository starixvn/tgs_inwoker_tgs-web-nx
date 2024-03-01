import React from "react";
import { Select as MuiSelect, SelectProps, styled as muiStyled } from "@mui/material";
import { borderRadius } from "@mui/system";

const StyledSelect = muiStyled(MuiSelect)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "0.937rem",
  fontWeight: 400,
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
    padding: "10px",
    borderRadius: "6px",
    "&:focus": {
      background: "none",
    },
    "&:active": {
      background: "none",
    },
    "&:disabled": {
      color: "#fff",
    },
  },
  option: {
    background: "#8C8998 !important",
    color: '#fff',
    "&:hover": {
      background: "#fff !important",
    },
    "&:active": {
      background: "#fff !important",
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
