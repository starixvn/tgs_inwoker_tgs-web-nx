import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const HeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.black,
  width: "140px",
  height: "30px",
  padding: "6px, 12px, 6px, 12px",
  borderRadius: "4px",
  gap: "4px",
  fontFamily: "Roboto",
  fontSize: "14px",
  fontWeight: "700",
  lineHeight: "16px",
  letterSpacing: "0em",
  textAlign: "center",
}));
