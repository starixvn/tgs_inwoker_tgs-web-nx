import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const RoundHeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.g8,
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
  padding: "11.21px 6.54px 11.7px 6.73px",
  width: "auto",
  whiteSpace: "nowrap",
  fontSize: "0.85rem",
  lineHeight: "0.85rem",
  fontWeight: 700,
  borderRadius: "5px;",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
