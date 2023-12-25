import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const QRCodeButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.white,
  background: theme.palette.secondary.main,
  borderRadius: 0,
  fontSize: "1rem",
  fontWeight: 700,
})) as typeof MuiButton;
