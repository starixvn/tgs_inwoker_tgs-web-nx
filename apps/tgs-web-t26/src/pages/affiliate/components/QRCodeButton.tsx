import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const QRCodeButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.black,
  background: theme.palette.primary.main,
  fontsize: "20px",
  fontWeight: 400,
  lineHeight: "21px",
  letterSpacing: "0em",
})) as typeof MuiButton;
