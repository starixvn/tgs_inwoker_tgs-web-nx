import { styled as muiStyled } from "@mui/system";
import { Button as MuiButton } from "@mui/material";

export const QRCodeButton = muiStyled(MuiButton)(({ theme }) => ({
  color: "white",
})) as typeof MuiButton;
