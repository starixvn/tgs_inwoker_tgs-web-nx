import { Button as MuiButton, styled as muiStyled } from "@mui/material";

export const RoundHeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.white,
  padding: "8px",
  minWidth: "110px",
  whiteSpace: "nowrap",
  fontSize: "0.8rem",
  fontWeight: 400,
  background: `${theme.palette.primaryBtn} no-repeat center center`,
  backgroundSize: "contain",
  transition: "background-image .4s",
  
  "&:hover": {
    backgroundImage: `${theme.palette.secondaryBtn}`,
  },
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
