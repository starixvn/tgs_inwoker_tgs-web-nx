import { Checkbox as MuiCheckbox, styled as muiStyled } from "@mui/material";

const Checkbox = muiStyled(MuiCheckbox)(({ theme }) => ({
  color: theme.palette.white,
  "&.MuiCheckbox-root": {
    padding: " 0 9px 0 0",
  },
  " &.Mui-checked": {
    color: theme.palette.yellow,
  },
}));

export default Checkbox;
