import { styled as muiStyled } from "@mui/material/styles";
import { FormControl as MuiFormControl } from "@mui/material";

export const FormControl = muiStyled(MuiFormControl)(({ theme }) => ({
  borderRadius: "5px",
  border: `1px solid ${theme.palette.tertiary.main}`,
  background: theme.palette.primaryLight,
  width: "100%",
  "& fieldset": {
    border: "none",
  },
  "& input": {
    fontSize: "0.937rem !important",
  },
  "& input:placeholder": {
    fontSize: "0.937rem !important",
  },
})) as typeof MuiFormControl;
