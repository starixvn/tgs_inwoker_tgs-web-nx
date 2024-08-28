import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const RoundHeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  height: "44px",
  padding: "10px 12px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "590",
  lineHeight: "17px",
  flexShrink: 0,
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
