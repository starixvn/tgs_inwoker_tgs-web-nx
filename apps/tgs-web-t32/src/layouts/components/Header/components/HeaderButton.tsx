import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const RoundHeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.white,
  padding: "5px 12px",
  width: "auto",
  whiteSpace: "nowrap",
  fontSize: "0.875rem",
  lineHeight: "1.058rem",
  fontWeight: 600,
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const HeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.white,
  padding: "0 18px",
  width: "auto",
  whiteSpace: "nowrap",
  fontSize: "0.812rem",
  lineHeight: "1.25rem",
  fontWeight: 400,
  borderRadius: "3px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
