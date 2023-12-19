import { Checkbox as MuiCheckbox, styled as muiStyled } from "@mui/material";

export const Checkbox = muiStyled(MuiCheckbox)(({ theme }) => ({
  color: theme.palette.white,
  " &.Mui-checked": {
    color: theme.palette.priBTNOutline,
  },
}));
