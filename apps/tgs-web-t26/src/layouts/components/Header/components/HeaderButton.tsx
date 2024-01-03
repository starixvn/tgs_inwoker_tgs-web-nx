import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const RoundHeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.gray30,
  padding: "4px 12px 4px 6px",
  width: "auto",
  minWidth: "104px",
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
