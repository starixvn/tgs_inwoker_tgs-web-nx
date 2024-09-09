import { theme } from "@/theme";
import { Select as MuiSelect, SelectProps, styled as muiStyled } from "@mui/material";

const StyledSelect = muiStyled(MuiSelect)(({ theme }) => ({
  color: `#f00fff`,
  fontSize: `1.4rem`,
  fontWeight: 400,
  background: `${theme.palette.select.backgroundColor}`,
  border: `1px solid ${theme.palette.select.borderColor}`,   
  borderRadius: "1rem",
  "&:focus": {
    background: "none",
  },
  "&:active": {
    background: "none",
  },
  "& > .Mui-disabled": {
    WebkitTextFillColor: `${theme.palette.text.disabled} !important`,
  },

  "& .MuiOutlinedInput-input" : {
    WebkitTextFillColor: "unset !important",
  },

  "& .MuiSvgIcon-root.MuiSelect-icon" : {
    fontSize: "2.2rem",
    color: `${theme.palette.select.textColor}`
  },

  select: {
    color: `${theme.palette.select.textColor}`,
    background: `${theme.palette.select.backgroundColor}`,
    
    padding: "1rem",
    borderRadius: "1rem",
    fontSize: `1.4rem`,
    fontWeight: "bold",
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

  "& .MuiInputBase-input": {
    color: `${theme.palette.select.textColor}`,
    background: `${theme.palette.select.backgroundColor}`,
    
    padding: "1rem",
    borderRadius: "1rem",
    fontSize: `1.4rem`,
    fontWeight: "bold",
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
  option: {
    background: `${theme.palette.select.backgroundColor}`,
    color: `${theme.palette.select.textColor}`,
    "&:hover": {
      background: `${theme.palette.select.optionHoverBgColor}`,
      color: `${theme.palette.white}`,
      height: "4.4rem",
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
            maxHeight: 232,
            width: 214,
            background: theme.dropDownBackground,
            padding: "0.8rem",
            borderRadius: "1rem",
            ".MuiList-root": {
              padding: "0",
            },
            "& .MuiMenuItem-root": {
              padding: "1rem 1.2rem",
              color: theme.text,
              borderRadius: "1rem",
              fontSize: "1.2rem",
            },
            "& .Mui-selected": {
              background: `${theme.dropDownItemSelectedBackground} !important`,
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
