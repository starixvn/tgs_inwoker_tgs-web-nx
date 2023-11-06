import { breakpoints } from "@/theme/breakpoints";
import { fontFamily } from "@/theme/fontFamily";
import { theme } from "@/theme/index";
import i18n from "@/utils/i18n";
import { createTheme, ThemeOptions } from "@mui/material";

//@ts-ignore
theme.lang = i18n.language;

declare module "@mui/material/styles" {
  interface Palette {
    white: Palette["primary"];
    yellow: Palette["primary"];
    mainBackground: Palette["primary"];
  }

  interface PaletteOptions {
    white?: PaletteOptions["primary"];
    yellow?: PaletteOptions["primary"];
    mainBackground?: PaletteOptions["primary"];
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
    white: {
      main: theme.white,
    },
    yellow: {
      main: theme.yellow,
    },

    text: {
      primary: theme.white,
      secondary: theme.gray5,
    },
    mainBackground: {
      main: theme.mainBackground,
    },
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
