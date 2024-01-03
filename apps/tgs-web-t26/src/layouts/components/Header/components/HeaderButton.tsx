import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const BasicHeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.white,
  width: "92px",
  height: "36px",
  padding: "10px 6px",
  borderRadius: "10px",
  gap: "10px",
  fontSize: "15px",
  fontWeight: "400",
  lineHeight: "15px",
  letterSpacing: "0em",
}));

export const PrimaryButton = muiStyled(BasicHeaderButton)(({ theme }) => ({
  background: "linear-gradient(270deg, #BD2D01 -1.87%, #F58200 100%)",
}));

export const SecondaryButton = muiStyled(BasicHeaderButton)(({ theme }) => ({
  background: "linear-gradient(270deg, #936F29 -1.87%, #F2BF5F 100%)",
}));

export const HeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.white,
  padding: "0 18px",
  width: "auto",
  whiteSpace: "nowrap",
  fontSize: "0.812rem",
  lineHeight: "1.25rem",
  fontWeight: 400,
  borderRadius: "3px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
