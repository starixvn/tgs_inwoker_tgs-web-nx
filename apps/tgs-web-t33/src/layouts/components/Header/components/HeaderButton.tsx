import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const HeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.gray30,
  padding: "10px",
  whiteSpace: "nowrap",
  fontSize: "0.937rem",
  lineHeight: "0.937rem",
  fontWeight: 400,
  borderRadius: "50px",
}));
