import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const RoundHeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  height: "28px",
  padding: "0 12px",
  borderRadius: "7px",
  fontSize: "13px",
  lineHeight: "28px",
  flexShrink: 0,
  background: "linear-gradient(180deg, #FDA120 0%, #D6820D 100%)",
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
