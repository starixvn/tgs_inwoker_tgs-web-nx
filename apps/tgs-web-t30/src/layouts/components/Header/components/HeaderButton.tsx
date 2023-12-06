import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const HeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.white,
  padding: "6px 5px",
  whiteSpace: "nowrap",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: 400,
  borderRadius: "3px",
}));
