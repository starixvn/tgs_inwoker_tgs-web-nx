import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const HeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.gray30,
  padding: "4px 8px 4px",
  width: "auto",
  whiteSpace: "nowrap",
  fontSize: "0.715rem",
  lineHeight: "0.715rem",
  fontWeight: 400,
  borderRadius: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "10px",
}));
