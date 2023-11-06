import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const HeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  color: "white",
  padding: "10px 30px",
  whiteSpace: "nowrap",
  fontSize: "0.715rem",
  lineHeight: "0.997rem",
  fontWeight: 600,
  borderRadius: "4px",
}));
