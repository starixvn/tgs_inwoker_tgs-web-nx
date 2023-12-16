import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const HeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.white,
  padding: "6",
  whiteSpace: "nowrap",
  fontSize: "0.875rem",
  fontWeight: 400,
  borderRadius: "2px",
  minWidth: "106px",
}));
