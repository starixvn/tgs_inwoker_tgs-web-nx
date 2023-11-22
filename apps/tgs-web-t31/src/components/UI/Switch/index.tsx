import { Switch as MuiSwitch } from "@mui/material";
import React from "react";
import { styled as muiStyled } from "@mui/material/styles";

export const Switch = muiStyled(MuiSwitch)(({ theme }) => ({
  width: 62,
  height: 28,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(18px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(32px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.yellow,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 24,
    height: 24,
    borderRadius: 24,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 28 / 2,
    opacity: 1,
    boxSizing: "border-box",
    backgroundColor: "#808080",
    transition: theme.transitions.create(["background-color", "border"]),
  },
}));
