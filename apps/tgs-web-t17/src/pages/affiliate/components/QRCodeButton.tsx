import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const QRCodeButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.black,
  background: theme.palette.primary.main,
  fontSize: "20px",
  fontWeight: 400,
  padding: "8px 24px",
  height: "40px !important",
})) as typeof MuiButton;
