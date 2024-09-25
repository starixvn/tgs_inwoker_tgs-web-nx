import { theme } from "@/theme";
import { Select as MuiSelect, SelectProps, styled as muiStyled } from "@mui/material";

const StyledSelect = muiStyled(MuiSelect)(({ theme }) => ({
  color: `#f00fff`,
  fontSize: `1.4rem`,
  fontWeight: 400,
  background: `${theme.palette.form.backgroundColor}`,
  border: `1px solid ${theme.palette.form.borderColor}`,
  borderRadius: "1rem",
  height: "4.8rem",
  lineHeight: "4.8rem",
  fontFamily: "inherit",
  "&:focus": {
    background: "none",
  },
  "&:active": {
    background: "none",
  },
  "& > .Mui-disabled": {
    WebkitTextFillColor: `${theme.palette.text.disabled} !important`,
  },

  "& .MuiOutlinedInput-input": {
    WebkitTextFillColor: "unset !important",
  },

  "& .MuiSvgIcon-root.MuiSelect-icon": {
    fontSize: "2.2rem",
    color: `${theme.palette.form.textColor}`,
  },

  "& .MuiInputBase-input": {
    color: `${theme.palette.form.textColor}`,
    fontWeight: "bold",
    height: "100%",
    display: "flex",
    alignItems: "center",

    "&:focus": {
      background: "none",
    },
    "&:active": {
      background: "none",
    },
    "&:disabled": {
      color: "#828282",
    },
  },

  "& .MuiSvgIcon-root": {
    color: theme.palette.text.primary,
  },

  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  ".MuiOutlinedInput-input": {
    WebkitTextFillColor: `${theme.palette.text.primary}`,
  },
}));

export const Select = (props: SelectProps) => {
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
              color: theme.gray,
              borderRadius: "1rem",
              fontSize: "1.3rem",
              fontWeight: "bold",
              fontFamily: "var(--main-font-family)",

              "@media (min-width: 1200px)": {
                fontSize: "1.4rem",
              },
            },
            "& .Mui-selected": {
              background: `${theme.dropDownItemSelectedBackground} !important`,
              color: theme.text,
              "&:hover": {
                background: `${theme.dropDownItemSelectedBackground} !important`,
              },
            },
          },
        },
      }}
      // IconComponent={() => (
      //   <Icon iconUrl={iconDown} width={"16px"} height={"16px"} style={{ marginRight: "10px" }} />
      // )}
    />
  );
};
