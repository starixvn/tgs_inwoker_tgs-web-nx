import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const HeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  color: "white",
  padding: "6",
  whiteSpace: "nowrap",
  fontSize: "0.875rem",
  fontWeight: 400,
}));
