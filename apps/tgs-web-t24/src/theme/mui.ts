import { breakpoints } from "@/theme/breakpoints";
import { fontFamily } from "@/theme/fontFamily";
import { theme } from "@/theme/index";
import i18n from "@/utils/i18n";
import { createTheme, ThemeOptions } from "@mui/material";

//@ts-ignore
theme.lang = i18n.language;

declare module "@mui/material/styles" {
  interface Palette {
    white: string;
    yellow: string;
    mainBackground: string;
    gray10: string;
    gray40: string;
    gray90: string;
    gray95: string;
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
