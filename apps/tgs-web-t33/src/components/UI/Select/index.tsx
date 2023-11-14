import React from "react";
import { Select as MuiSelect, SelectProps, styled as muiStyled } from "@mui/material";
import iconDown from "@/assets/t33/images/ui/icon-down.svg";
import Icon from "@/components/project/Icon";

const StyledSelect = muiStyled(MuiSelect)(({ theme }) => ({
  color: "white",
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
    color: "white",
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
    color: "white",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
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
