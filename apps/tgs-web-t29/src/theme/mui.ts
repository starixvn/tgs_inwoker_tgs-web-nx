import { createTheme, ThemeOptions } from "@mui/material";
import { i18n } from "@tgs-web-nx/utils";
import { breakpoints } from "@/theme/breakpoints";
import { fontFamily } from "@/theme/fontFamily";
import { theme } from "@/theme";

//@ts-ignore
theme.lang = i18n.language;

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    white: string;
    black: string;
    mainBackground: string;
    red: string;
    green: string;
    gradient: string;
    blue10: string;
    blue20: string;
    blue30: string;
    blue40: string;
    blue50: string;
    gray10: string;
    gray20: string;
    gray30: string;
    gray40: string;
    gray50: string;
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
      disabledBackground: theme.gray20,
      disabled: theme.white,
    },
    white: theme.white,
    black: theme.black,
    mainBackground: theme.mainBackground,
    red: theme.red,
    green: theme.green,
    gradient: theme.gradient,
    blue10: theme.blue10,
    blue20: theme.blue20,
    blue30: theme.blue30,
    blue40: theme.blue40,
    blue50: theme.blue50,
    gray10: theme.gray10,
    gray20: theme.gray20,
    gray30: theme.gray30,
    gray40: theme.gray40,
    gray50: theme.gray50,
    text: {
      primary: theme.white,
      secondary: theme.gray20,
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
  },
} as ThemeOptions);

export { muiTheme };
