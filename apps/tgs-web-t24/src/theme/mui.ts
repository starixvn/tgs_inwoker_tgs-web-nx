import { createTheme, ThemeOptions } from "@mui/material";
import { breakpoints } from "@/theme/breakpoints";
import { fontFamily } from "@/theme/fontFamily";
import { theme } from "@/theme";
import i18n from "@/core/utils/i18n";

//@ts-ignore
theme.lang = i18n.language;

declare module "@mui/material/styles" {
  interface Palette {
    white: Palette["primary"];
    yellow: Palette["primary"];
    mainBackground: Palette["primary"];
    gray5: Palette["primary"];
    gray10: Palette["primary"];
    gray40: Palette["primary"];
    gray70: Palette["primary"];
    gray90: Palette["primary"];
    gray95: Palette["primary"];
  }

  interface PaletteOptions {
    white?: PaletteOptions["primary"];
    yellow?: PaletteOptions["primary"];
    mainBackground?: PaletteOptions["primary"];
    gray5?: PaletteOptions["primary"];
    gray10?: PaletteOptions["primary"];
    gray40?: PaletteOptions["primary"];
    gray70?: PaletteOptions["primary"];
    gray90?: PaletteOptions["primary"];
    gray95?: PaletteOptions["primary"];
  }
}

const muiTheme = createTheme({
  breakpoints: {
    values: {
      xs: breakpoints.xs,
      sm: breakpoints.sm,
      md: breakpoints.md,
      lg: breakpoints.lg,
      xl: breakpoints.xl,
    },
  },
  palette: {
    primary: {
      main: theme.primary,
    },
    secondary: {
      main: theme.secondary,
    },
    action: {
      disabledBackground: theme.gray5,
      disabled: theme.white,
    },
    text: {
      primary: theme.white,
      secondary: theme.gray5,
    },
    white: theme.white,
    yellow: theme.yellow,
    mainBackground: theme.mainBackground,
    gray5: theme.gray5,
    gray10: theme.gray10,
    gray40: theme.gray40,
    gray70: theme.gray70,
    gray90: theme.gray90,
    gray95: theme.gray95,
  },
  typography: {
    fontFamily: fontFamily,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiTablePagination: {
      styleOverrides: {
        actions: {
          "& .MuiButtonBase-root": {
            color: "#707070",
            "&:hover": {
              // backgroundColor: "#your_hover_color_here", // 设置鼠标悬停时的背景颜色
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: theme.white,
        },
      },
    },
  },
} as ThemeOptions);

export { muiTheme };
