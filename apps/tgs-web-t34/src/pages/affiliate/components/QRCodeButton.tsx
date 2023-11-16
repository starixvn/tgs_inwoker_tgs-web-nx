import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const QRCodeButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.white,
  background: theme.palette.secondary.main,
  border: `1px solid transparent`,
  padding: "10px",
  height: "fit-content",

  "&:hover": {
    background: "none",
    color: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.secondary.main}`,
  },
})) as typeof MuiButton;
