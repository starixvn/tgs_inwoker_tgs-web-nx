import { Checkbox as MuiCheckbox, styled as muiStyled } from "@mui/material";

const Checkbox = muiStyled(MuiCheckbox)(({ theme }) => ({
  color: theme.palette.gray50,
  " &.Mui-checked": {
    color: theme.palette.primary,
  },
}));

export default Checkbox;
