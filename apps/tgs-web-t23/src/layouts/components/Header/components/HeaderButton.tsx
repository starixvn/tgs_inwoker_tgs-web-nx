import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const HeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  color: "white",
  padding: "10px 9px",
  whiteSpace: "nowrap",
  fontSize: "0.937rem",
  lineHeight: "0.937rem",
  fontWeight: 700,
  borderRadius: "20px",
}));
