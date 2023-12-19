import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const RoundHeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.gray,
  padding: "4px 12px 4px 6px",
  width: "auto",
  whiteSpace: "nowrap",
  fontSize: "0.715rem",
  lineHeight: "0.715rem",
  fontWeight: 400,
  borderRadius: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "10px",
}));

export const HeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.white,
  padding: "10px 6px",
  width: "auto",
  whiteSpace: "nowrap",
  fontSize: "0.875rem",
  lineHeight: "0.875rem",
  fontWeight: 1000,
  borderRadius: "100px;",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
