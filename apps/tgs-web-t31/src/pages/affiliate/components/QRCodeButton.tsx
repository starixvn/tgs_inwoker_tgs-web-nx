import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const QRCodeButton = muiStyled(MuiButton)(({ theme }) => ({
  background:theme.palette.primaryGradient,
  color: theme.palette.white,
})) as typeof MuiButton;
