import { theme } from "@/theme";
import { SelectProps } from "@mui/material";

import { StyledSelect } from "../Select";

export const SelectUnlitmitHeight = (props: SelectProps) => {
  return (
    <StyledSelect
      {...props}
      displayEmpty={true}
      MenuProps={{
        PaperProps: {
          sx: {
            width: 214,
            background: theme.dropDownBackground,
            padding: "0.8rem",
            borderRadius: "1rem",
            ".MuiList-root": {
              padding: "0",
            },
            "& .MuiMenuItem-root": {
              padding: "1rem 1.2rem",
              color: theme.dropDownColor,
              borderRadius: "1rem",
              fontSize: "1.3rem",
              fontWeight: "bold",
              fontFamily: "var(--main-font-family)",
              "&:hover": {
                background: `${theme.dropDownItemSelectedBackground}`,
                color: theme.dropDownItemSelectedTextColor,
              },

              "@media (min-width: 1200px)": {
                fontSize: "1.4rem",
              },
            },
            "& .Mui-selected": {
              background: `${theme.dropDownItemSelectedBackground} !important`,
              color: theme.dropDownItemSelectedTextColor,
            },
          },
        },
        marginThreshold: 0,
      }}
    />
  );
};
