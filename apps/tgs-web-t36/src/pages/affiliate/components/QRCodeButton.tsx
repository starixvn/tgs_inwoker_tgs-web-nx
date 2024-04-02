import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const QRCodeButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.white,
  background: theme.palette.subNavSec,
  fontSize: "1rem",
  fontWeight: 400,
  borderRadius: "3px",
  padding: "4px"
})) as typeof MuiButton;
