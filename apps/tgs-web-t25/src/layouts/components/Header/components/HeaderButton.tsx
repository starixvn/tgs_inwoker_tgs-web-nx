import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const RoundHeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  padding: "10px 12px",
  width: "auto",
  whiteSpace: "nowrap",
  fontSize: "0.875rem",
  lineHeight: "1.312rem",
  fontWeight: 600,
  borderRadius: "6px",
}));

export const HeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.black,
  padding: "0 18px",
  width: "auto",
  whiteSpace: "nowrap",
  fontSize: "1rem",
  fontWeight: 600,
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
